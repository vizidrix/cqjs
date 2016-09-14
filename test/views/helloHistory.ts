/**
  * cqjs/test/views/helloHistory/1.0.0
  */

'use strict'

import { IAction1, IFunc, View } from '../../src'

import * as Hello from '../domains/hello'

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

//const VIEW = new View<IContext>(URI, new Context(),
const VIEW = new View(URI, new Context(),

  Hello.TITLE_CHANGED.handler<IContext>((context, event, meta) => {
    context.appendTitle(event.current)
  })

)

export default VIEW
