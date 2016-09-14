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

const VIEW = new View<Array<ITodo>>('TODO_LIST', [],

  DOMAINDEF.ADDED.handler((c, e) => {
    //c.
  })
  
)
