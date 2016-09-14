/**
* cqjs/test/domains/hello/1.0.0
*
* Provides a sample domain implementation used to test and validate the cqjs library modules
*/

'use strict'

import { Domain, Singleton } from '../../src'

export const URI = 'https://github.com/vizidrix/cqjs/test/domains/hello'

export const INITIAL_STATE = {
  title: 'default'
}

export type ITITLE_CHANGED = {
  current: string, /// the new value of the aggregate's title
  previous: string, /// the prior value that was the aggregate's title
}

export type ISET_TITLE_DECLINED = {
  reason: string,
  value: string,
}

export type ISET_TITLE = {
  newTitle: string /// the value the caller would like to set on the aggregate
}

export const DOMAIN = Domain(URI, INITIAL_STATE, {}, $ => ({

  TITLE_CHANGED: $<ITITLE_CHANGED>('TITLE_CHANGED', (a, e) => {
    a.title = e.current
    return a
  }),

  SET_TITLE_DECLINED: $<ISET_TITLE_DECLINED>('SET_TITLE_DECLINED', a => a),

}), ($, __) => ({

  SET_TITLE: $<ISET_TITLE, ITITLE_CHANGED | ISET_TITLE_DECLINED>('SET_TITLE', (a, c) => {
    if (c.newTitle === a.title) {
      return __.SET_TITLE_DECLINED.new({
        reason: 'title was already set to the desired value',
        value: c.newTitle
      })
    }
    return __.TITLE_CHANGED.new({
      current: c.newTitle,
      previous: a.title
    })
  })

}))

export default DOMAIN
