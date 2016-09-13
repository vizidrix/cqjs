
import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './components/Counter'

import { System, View } from 'cqjs'
import * as DOMAINDEF from './domains/Counter'

const VIEW = new View('VIEW',
  { value: DOMAINDEF.DOMAIN.initial_state },

  DOMAINDEF.VALUE_UPDATED.handler((c, e) => {
    c.value = e
  })
)

const SYSTEM = new System(DOMAINDEF.DOMAIN, VIEW)

const rootEl = document.getElementById('root')

function render() {
  ReactDOM.render(
    <Counter
      value={ VIEW.getContext().value }
      onIncrement={() => { SYSTEM.dispatch(DOMAINDEF.INCREMENT.new()) }}
      onDecrement={() => { SYSTEM.dispatch(DOMAINDEF.DECREMENT.new()) }}
      onIncrementIfOdd={() => { SYSTEM.dispatch(DOMAINDEF.INCREMENT_IF_ODD.new()) }}
    />,
    rootEl
  )
}

render()
SYSTEM.subscribe(() => render())
