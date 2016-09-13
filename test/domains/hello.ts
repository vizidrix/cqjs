/**
* cqjs/test/domains/hello/1.0.0
*
* Provides a sample domain implementation used to test and validate the cqjs library modules
*/

'use strict'

import { Domain, Singleton } from '../../src'

export const URI = 'https://github.com/vizidrix/cqjs/test/domains/hello'

export type ISTATE = {
  title: string,
}

export const INITIAL_STATE = {
  title: 'default'
}

export const DOMAIN = new Domain(URI, INITIAL_STATE)//, { keyFunc: Singleton })

export type ITITLE_CHANGED = {
  current: string, /// the new value of the aggregate's title
  previous: string, /// the prior value that was the aggregate's title
}

export const TITLE_CHANGED = DOMAIN.event<ITITLE_CHANGED>('TITLE_CHANGED', (a, e) => {
  a.title = e.current
  return a
})

export type ISET_TITLE_DECLINED = {
  reason: string,
  value: string,
}

export const SET_TITLE_DECLINED = DOMAIN.event<ISET_TITLE_DECLINED>('TITLE_DECLINED', (a, e) => {
  return a
})

export type ISET_TITLE = {
  newTitle: string /// the value the caller would like to set on the aggregate
}

export const SET_TITLE = DOMAIN.command<ISET_TITLE, ITITLE_CHANGED | ISET_TITLE_DECLINED>('SET_TITLE', (a, c) => {
  return c.newTitle === a.title ?
    SET_TITLE_DECLINED.new({
      reason: 'title was already set to the desired value',
      value: c.newTitle
    }) :
    TITLE_CHANGED.new({
      current: c.newTitle,
      previous: a.title
    })
})

export default DOMAIN
