/**
* github.com/vizidrix/cqjs/test/domains/error/1.0.0
*
* Provides an example of a general utility domain which can be used by processes / views
* to record and track failures
*
* As state machine abstractions, domains should be impervious to generalized 'error' cases
*/

'use strict'

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

export const DOMAIN = Domain(URI, INITIAL_STATE, { keyFunc: UUIDKeyGen }, $ => ({

  ERROR_RAISED: $<IError>('ERROR_RAISED', (a, e) => Error(e.message)),

  EXCEPTION_RAISED: $<IException>('EXCEPTION_RAISED', (a, e) => Exception(e.message, e.details)),

}), ($, __) => ({

  RAISE_ERROR: $<IError, IError>('RAISE_ERROR', (a, c) => __.ERROR_RAISED.new(c)),

  RAISE_EXCEPTION: $<IException, IException>('RAISE_EXCEPTION', (a, c) => __.EXCEPTION_RAISED.new(c)),

}))

export default DOMAIN
