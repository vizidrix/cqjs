/**
 * cqjs/examples/counter/components/Counter.test.js
 *
 * @flow
 */

import { test } from 'blue-tape'

import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import Counter from './Counter'

function setup(value = 0) {
  const actions = {
    onIncrement: expect.createSpy(),
    onDecrement: expect.createSpy(),
    onIncrementIfOdd: expect.createSpy()
  }
  const component = shallow(
    <Counter value={value} {...actions} />
  )

  return {
    component: component,
    actions: actions,
    buttons: component.find('button'),
    p: component.find('p')
  }
}

test('Counter component should display count', assert => {
  const { p } = setup()
  assert.equal(p.text().indexOf('Clicked: 0 times'), 0)

  assert.end()
})

test('Counter component should call onIncrement for first button click', assert => {
  const { buttons, actions } = setup()
  buttons.at(0).simulate('click')
  expect(actions.onIncrement).toHaveBeenCalled()

  assert.end()
})

test('Counter component should call onDecrement for second button click', assert => {
  const { buttons, actions } = setup()
  buttons.at(1).simulate('click')
  expect(actions.onDecrement).toHaveBeenCalled()

  assert.end()
})

test('Counter component should call onIncrementIfOdd for second button click', assert => {
  const { buttons, actions } = setup(42)
  buttons.at(2).simulate('click')
  expect(actions.onIncrementIfOdd).toHaveBeenCalled()

  assert.end()
})

test('Counter component should call onIncrement after a delay', assert => {
  const { buttons, actions } = setup()
  buttons.at(3).simulate('click')
  setTimeout(() => {
    expect(actions.onIncrement).toHaveBeenCalled()
    assert.end()
  }, 1500)
})
