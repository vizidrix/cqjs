/**
 * cqjs/src/view.js
 */

'use strict'

import { IEvent, IEventHandlerDef } from './event'
import { ISubscription } from './subscription'
import { ErrorFunc, IAction1 } from './utils'

// import { ERROR } from './cqjs'
import { Subscription } from './subscription'

export type IView<TContext> = {
  kind: 'VIEW',
  uri: string,
  getContext: () => TContext,
  getHandlerDefs: () => Array<IEventHandlerDef<TContext, any>>,
  getHandlers: () => Array<IAction1<IEvent<any>>>,
  getSubscriptions: () => Array<ISubscription>,
}

export function View<TContext>(
  uri: string,
  context: TContext,
  ...handlerDefs: Array<IEventHandlerDef<TContext, any>>): IView<TContext> {
  let handlers = []
  let subscriptions = []
  let i = -1
  const length = handlerDefs.length
  while (++i < length) {
    const handlerDef = handlerDefs[i]
    const handler = (e: IEvent<any>) => {
      handlerDef.handler(context, e.payload, e.meta)
    }
    handlers.push(handler)
    const handlerUri = handlerDef.meta.uri
    const type = handlerDef.meta.type
    const filter = (e: IEvent<any>): boolean => {
      return handlerUri === e.meta.uri && type === e.meta.type
    }
    const sub = new Subscription(handler, ErrorFunc, filter)
    subscriptions.push(sub)
  }
  return {
    getContext: () => context,
    getHandlerDefs: () => handlerDefs,
    getHandlers: () => handlers,
    getSubscriptions: () => subscriptions,
    kind: 'VIEW',
    uri,
  }
}
