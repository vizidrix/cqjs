/// <reference path="../typings/modules/blue-tape/index.d.ts" />
/**
 * cqjs/test/messages.text.js
 * @flow
 */

import { test } from 'blue-tape'

import * as Hello from './domains/hello'

test('should have undefined key if not provided', assert => {
  let command = Hello.SET_TITLE.new({ newTitle: '' })
  assert.notOk(command.key, 'no key was provided')

  assert.end()
})

test('should use provided key instead of undefined', assert => {
  let command = Hello.SET_TITLE.new({ newTitle: '' }, 'alt')
  assert.ok(command.key, 'valid key was provided')
  assert.equal(command.key, 'alt', 'should use provided key')

  assert.end()
})

test('should use provided version instead of undefined', assert => {
  let command = Hello.SET_TITLE.new({ newTitle: '' }, undefined, 10)
  assert.ok(command.version, 'valid version was provided')
  assert.equal(command.version, 10, 'should use provided version')

  assert.end()
})

/*
import { Promise } from 'es6-promise'
//import * as test from 'blue-tape'
import { test } from 'blue-tape'

import * as cqjs from '../src/cqjs'

import * as Hello from './domains/hello/domain'

test('messages - make new event from definition', assert => {
  type IAGGREGATE = {

  }
  type IEVENT = {
    value: string
  }
  let META = cqjs.DomainMeta('url', '0.0.1')
  let event: cqjs.IEventDef<IAGGREGATE, IEVENT> = cqjs.EventDef(META, 'event', '0.0.1')

  let actual = event.new({ value: 'event' })('key', 0)

  assert.equal(event.meta.domain.uri, actual.meta.domain.uri, 'should have captured domain')
  assert.equal('event', actual.payload.value, 'should have wrapped payload')

  assert.end()
})

test('messages - make new command from definition', assert => {
  type IAGGREGATE = {

  }
  type IEVENT = {
    value: string
  }
  let META = cqjs.DomainMeta('url', '0.0.1')
  let command: cqjs.ICommandDef<IAGGREGATE, IEVENT> = cqjs.CommandDef(META, 'command', '0.0.1')

  let actual = command.new({ value: 'command' })

  assert.equal(command.meta.domain.uri, actual.meta.domain.uri, 'should have captured domain')
  assert.equal('command', actual.payload.value, 'should have wrapped payload')

  assert.end()
})

test('messages - event handler executes', assert => new Promise(resolve => {

  assert.end()
}))
*/

/*
let called = false
let handlerDef = Hello.TITLE_CHANGED.do(e => {
  called = true
})
handlerDef.handler(Hello.TITLE_CHANGED.new({
  current: 'a',
  previous: 'b'
}))

assert.ok(called, 'trigger event callback on execute')
*/
