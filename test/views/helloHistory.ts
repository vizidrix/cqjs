/**
  * cqjs/test/views/helloHistory/1.0.0
  */

'use strict'

import { View } from '../../src'

import * as Hello from '../domains/hello'

export const URI = 'https://github.com/vizidrix/cqjs/test/views/helloHistory'

export type IContext = {
  titles: Array<string>,
  appendTitle: (title: string) => void,
}

export const Context = () => {
  const titles = []
  return {
    titles: titles,
    appendTitle: (title: string) => {
      titles.push(title)
    },
  }
}

const VIEW = View<IContext>(URI, Context(),

  Hello.TITLE_CHANGED.handler<IContext>((c, e, m) => {
    c.appendTitle(e.current)
  })

)

export default VIEW


// const VIEW = new View(URI, new Context(),

//   Hello.TITLE_CHANGED.handler((c: Context, e) => {
//     c.appendTitle(e.current)
//   })

// )

// export default VIEW
