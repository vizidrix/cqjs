/**
  * cqjs/test/views/helloState/1.0.0
  */

'use strict'

import { View } from '../../src'

import * as Hello from '../domains/hello'

export const URI: string = 'https://github.com/vizidrix/cqjs/test/views/helloState'

export type IContext = {
  title: string,
  setTitle: (value: string) => void
}

export const Context = (): IContext => {
  let title = 'Hello'
  return {
    title,
    setTitle: (value: string) => title = value,
  }
}

const VIEW = View<IContext>(URI, Context(),

  Hello.TITLE_CHANGED.handler<IContext>((c, e) => {
    c.setTitle(e.current)
  })

)

export default VIEW
