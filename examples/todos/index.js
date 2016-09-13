
import React from 'react'
import ReactDOM from 'react-dom'
import Todo from './components/Todo'

import { System, View } from 'cqjs'
import * as DOMAINDEF from './domains/Todo'

const SYSTEM = new System(DOMAINDEF.DOMAIN)

const rootEl = document.getElementById('root')

function render() {
  ReactDOM.render(
    <Todo />,
    rootEl
  )
}

render()
SYSTEM.subscribe(() => render())
