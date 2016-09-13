/**
 * cqjs/examples/counter/components/Counter.test.js
 *
 * @flow
 */

import { test } from 'blue-tape'

import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import * as Counter from './Counter'

import { System } from 'cqjs'

test('Counter domain should have correct initial state', assert => {
  assert.equal(Counter.DOMAIN.initial_state, 0)

  assert.end()
})

test('Counter should handle increment command', assert => {
  const sys = new System(Counter.DOMAIN)

  sys.dispatch(Counter.INCREMENT.new())

  const state = sys.load(Counter.DOMAIN, '')

  assert.equal(state, 2)

  assert.end()
})
