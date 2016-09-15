/**
  * cqjs/test/views/helloHistory/1.0.0
  */

'use strict'

import { IAction1, IFunc, View } from '../../src'

import Hello from '../domains/hello'

export const URI = 'https://github.com/vizidrix/cqjs/test/views/helloHistory'

export type IContext = {
  getTitles: IFunc<Array<string>>,
  appendTitle: IAction1<string>,
}

export class Context {
  private titles: Array<string>

  constructor() {
    this.titles = []
  }

  public getTitles(): Array<string> {
    return this.titles
  }
  
  public appendTitle(title: string) {
    this.titles.push(title)
  }
}

export default View(URI, new Context(), $ => [

  $(Hello.TITLE_CHANGED, (c, e, m) => {
    c.appendTitle(e.payload.current)
  })

])
