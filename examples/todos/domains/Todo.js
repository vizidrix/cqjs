/**
 * github.com/vizidrix/cqjs/examples/todos/domains/todo.js
 *
 * @flow
 */

'use strict'

import type { ICommandDef, IEventDef } from 'cqjs'
import { Domain } from 'cqjs'

export type ITodo = {
  title: string,
  completed: boolean,
}

export const DOMAIN = new Domain('TODOS', {
  completed: false,
})

export type IADDED = {
  id: string,
  title: string,
  active: boolean,
}

export const ADDED: IEventDef<ITodo, IADDED> = DOMAIN.Event('ADDED', (a, e) => {
  return a
})
/*
export const COMPLETED = DOMAIN.Event('COMPLETED')
export const REOPENED = DOMAIN.Event('REOPENED')
export const REOPEN_FAILED = DOMAIN.Event('REOPEN_FAILED')


export const ADD: ICommandDef<ITodo> = DOMAIN.Command('ADD',
  (a, c) => {

    ADDED.new(c.title)
  })
export const COMPLETE: ICommandDef<ITodo> = DOMAIN.Command('COMPLETE',
  (a, c) => COMPLETED.new(c.id))
export const REOPEN: ICommandDef<number> = DOMAIN.Command('REOPEN',
  (a, c) => REOPENED.new(c.id))
*/
export default DOMAIN
