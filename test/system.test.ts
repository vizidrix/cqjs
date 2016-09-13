/// <reference path="../typings/modules/blue-tape/index.d.ts" />
/**
 * cqjs/test/system.test.js
 */

import { test } from 'blue-tape'

import { EventStore, EventStream, System } from '../src'

import * as Hello from './domains/hello'

import HelloDomain from './domains/hello'
import HelloHistoryView from './views/helloHistory'
import HelloStateView from './views/helloState'

test('new system with store', assert => {
  const store = EventStore()
  const system = new System(HelloDomain).withStore(store)

  assert.deepEqual(store, system.getStore())

  assert.end()
})

test('publish event from system on sucessful dispatch', assert => {
  const system = new System(HelloDomain)

  let received = false
  const handle = system.subscribe(
    () => {
      received = true
    },
    err => {
      assert.fail('should not have raised error [', err, ']')
    }
  )

  system.dispatch(Hello.SET_TITLE.new({ newTitle: 'new' }))

  handle.dispose()

  assert.ok(received, 'command should have been dispatched')

  assert.end()
})

test('should fail to dispatch unregistered command to system', assert => {
  const system = new System()

  assert.throws(() => {
    system.dispatch(Hello.SET_TITLE.new({ newTitle: 'new' }))
  })

  assert.end()
})

test('should update view when command is accepted', assert => {
  const system = new System(HelloDomain, HelloStateView, HelloHistoryView)

  const ctx = system.getContext(HelloStateView)

  assert.equal(ctx.title, 'Hello', 'have valid starting view state')

  system.dispatch(Hello.SET_TITLE.new({ newTitle: 'new' }))

  assert.equal(ctx.title, 'new', 'have valid updated view state')

  assert.end()
})

test('should use data from provided store', assert => {
  const event1 = Hello.TITLE_CHANGED.new({ current: 'current', previous: 'provided' })
  const event2 = Hello.SET_TITLE.new({ newTitle: 'new' })
  const stream = new EventStream(HelloDomain, '',
    event1
  )
  const store = new EventStore(stream)
  const system = new System(HelloDomain).withStore(store)

  system.dispatch(event2)

  const stream2 = store.stream(HelloDomain, '')
  const events = stream2.getEvents()
  assert.equal(events[0], event1)
  assert.equal(events[1].payload.current, event2.payload.newTitle)

  assert.end()
})

test('should read events from store and build aggregate state on load', assert => {
  const stream = new EventStream(HelloDomain, '',
    Hello.TITLE_CHANGED.new({ current: 'currentload', previous: 'providedload' })
  )
  const store = new EventStore(stream)
  const system = new System(HelloDomain).withStore(store)
  const state = system.load(HelloDomain, '')
  assert.equal(state.title, 'currentload', 'have loaded the state from events in the store')

  assert.end()
})
