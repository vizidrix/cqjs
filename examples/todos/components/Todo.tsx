
import React, { PropTypes } from 'react'

import { Todo } from '../domains/Todo'

const Todo = (system: ISystem, todo: {
  id: number,
  title: string,
  completed: boolean,
}) => {
  <li
    onClick={() => { system.dispatch(Todo.COMPLETE(todo.id)) }}
    style={{
      textDecoration: todo.completed ? 'line-through' : 'none'
    }}>
    {todo.title}
  </li>
}

/*
const Todo = (onClick: () => void, completed: boolean, text: string) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
    {text}
  </li>
)
*/

export default Todo
