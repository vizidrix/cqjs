/**
 * github.com/vizidrix/cqjs/examples/todos/views/TodoList.js
 *
 * @flow
 */

'use strict'

import { System, View } from 'cqjs'
import * as DOMAINDEF from '../domains/Todo'

export type ITodo = {
  id: string,
  title: string,
  active: boolean,
}

let context: Array<ITodo> = []

const VIEW = new View('TODO_LIST', context,

  DOMAINDEF.ADDED.handler((c, e) => {
    //c.
  })
)
