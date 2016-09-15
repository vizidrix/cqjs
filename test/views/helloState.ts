/**
  * cqjs/test/views/helloState/1.0.0
  */

'use strict'

import { IAction1, IFunc, View } from '../../src'

import Hello from '../domains/hello'

export const URI: string = 'https://github.com/vizidrix/cqjs/test/views/helloState'

export type IContext = {
  getTitle: IFunc<string>,
  setTitle: IAction1<string>,
}

export class Context {
  public kind: 'VIEW_CONTEXT'

  private title: string

  constructor() {
    this.title = 'Hello'
  }

  public getTitle(): string {
    return this.title
  }

  public setTitle(title: string) {
    this.title = title
  }
}

export default View(URI, new Context(), $ => [

  $(Hello.TITLE_CHANGED, (c, e, m) => {
    c.setTitle(e.payload.current)
  }),

  $(Hello.TITLE_CHANGED, (c, e) => {
    c.setTitle(e.payload.current)
  }),

])
