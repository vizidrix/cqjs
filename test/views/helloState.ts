/**
  * cqjs/test/views/helloState/1.0.0
  */

'use strict'

import { IAction1, IFunc, View } from '../../src'

import * as Hello from '../domains/hello'

export const URI: string = 'https://github.com/vizidrix/cqjs/test/views/helloState'

export type IContext = {
  getTitle: IFunc<string>,
  setTitle: IAction1<string>,
}

export class Context {
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

const VIEW = View<IContext>(URI, new Context(),

  Hello.TITLE_CHANGED.handler<IContext>((c, e) => {
    c.setTitle(e.current)
  })

)

export default VIEW
