/**
* github.com/vizidrix/cqjs/test/domains/error/1.0.0
*
* Provides an example of a general utility domain which can be used by other domains
*
* @flow
*/

'use strict'

//import { ICommandDef, IEventDef } from '../../src'
import { Domain, UUIDKeyGen } from '../../src'

export const URI = 'https://github.com/vizidrix/cqjs/test/domains/error'

export type IEmpty = {
  type: 'EMPTY',
}

export type IError = {
  type: 'ERROR',
  message: string,
}

export function Error(message: string): IError {
  return {
    type: 'ERROR',
    message: message
  }
}

export type IException = {
  type: 'EXCEPTION',
  message: string,
  details: any,
}

export function Exception(message: string, details: any): IException {
  return {
    type: 'EXCEPTION',
    message: message,
    details: details
  }
}

export type ISTATE = IEmpty | IError | IException

export const INITIAL_STATE: ISTATE = { type: 'EMPTY' }

export const DOMAIN = Domain(URI, INITIAL_STATE, {}, $ => ({

  ERROR_RAISED: $<IError>('ERROR_RAISED', (a, e) => Error(e.message)),

  EXCEPTION_RAISED: $<IException>('EXCEPTION_RAISED', (a, e) => Exception(e.message, e.details)),

}), ($, __) => ({

  RAISE_ERROR: $<IError, IError>('RAISE_ERROR', (a, c) => ERROR_RAISED.new(c)),

  RAISE_EXCEPTION: $<IException, IException>('RAISE_EXCEPTION', (a, c) => EXCEPTION_RAISED.new(c)),
  
}))


// export const DOMAIN = new Domain(URI, INITIAL_STATE, { keyFunc: UUIDKeyGen })

// export const ERROR_RAISED = DOMAIN.event<IError>('ERROR_RAISED', (a, e) => Error(e.message))
// export const EXCEPTION_RAISED = DOMAIN.event<IException>('EXCEPTION_RAISED', (a, e) => Exception(e.message, e.details))

// export const RAISE_ERROR = DOMAIN.command<IError, IError>('RAISE_ERROR', (a, c) => ERROR_RAISED.new(c))
// export const RAISE_EXCEPTION = DOMAIN.command<IException, IException>('RAISE_EXCEPTION', (a, c) => EXCEPTION_RAISED.new(c))

export default DOMAIN
