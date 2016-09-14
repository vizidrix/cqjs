/**
 * github.com/vizidrix/cqjs/examples/counter/domains/counter.js
 *
 * @flow
 */

'use strict'

//import type { ICommandDef, IEventDef } from 'cqjs'
import { Domain, Singleton } from 'cqjs'

export const INITIAL_STATE = 0

export const DOMAIN = new Domain('COUNTER', INITIAL_STATE, { keyFunc: Singleton })

export const VALUE_UPDATED = DOMAIN.Event('VALUE_UPDATED', (_, e) => e)


//export const INCREMENT: ICommandDef<number, number> = DOMAIN.Command('INCREMENT',
export const INCREMENT = DOMAIN.command<number>('INCREMENT',
  (a) => {
    //a
    //let t: ICommandDef = {}
    return VALUE_UPDATED.new(a + 1)
  })

export const DECREMENT = DOMAIN.Command('DECREMENT',
  (a) => VALUE_UPDATED.new(a - 1))

export const INCREMENT_IF_ODD = DOMAIN.Command('INCREMENT_IF_ODD',
  (a) => VALUE_UPDATED.new(a % 2 == 0 ? a : a + 1))

export default DOMAIN
