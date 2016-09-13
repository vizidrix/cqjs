/// <reference path="../typings/modules/blue-tape/index.d.ts" />
/**
 * cqjs/test/eventstore.test.js
 */

import { test } from 'blue-tape'

// import { System, EventStore } from '../src/cqjs'
import { EventStore, EventStream } from '../src'

import * as Hello from './domains/hello'

test('load initial state from empty store', assert => {
  const store = EventStore()
  const stream = store.stream(Hello.DOMAIN, '')
  const actual = stream.load()
  assert.deepEqual(actual, Hello.INITIAL_STATE, 'should load initial state for empty stream')

  assert.end()
})

test('should default stream request key to empty string if not provided', assert => {
  const store = EventStore()
  const stream = store.stream(Hello.DOMAIN)
  const key = stream.getKey()
  assert.equal(key, '', 'should have defaulted undefined key to empty string')

  assert.end()
})

test('should correctly load aggregate state from stream with initiated data', assert => {
  const stream = EventStream(Hello.DOMAIN, '',
    Hello.TITLE_CHANGED.new({ current: 'current1', previous: '' }),
    Hello.TITLE_CHANGED.new({ current: 'current2', previous: 'current1' }))

  const actual = stream.load()
  assert.equal(actual.title, 'current2', 'should load state from stream events')

  assert.end()
})

test('should correctly load aggregate state from stream using append', assert => {
  const stream = EventStream(Hello.DOMAIN, '')
  stream.append(
    Hello.TITLE_CHANGED.new({ current: 'current1', previous: '' }),
    Hello.TITLE_CHANGED.new({ current: 'current2', previous: 'current1' })
  )
  const actual = stream.load()
  assert.equal(actual.title, 'current2', 'should load state from stream events')

  assert.end()
})
