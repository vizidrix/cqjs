/**
 * cqjs/src/view.js
 */

'use strict'

// import { IEvent, IEventHandlerDef } from './event'
import { IEventHandlerDef } from './event'
// import { ISubscription, Subscription } from './subscription'
// import { ErrorFunc, IAction1, IFunc } from './utils'
import { IFunc } from './utils'

// import { ERROR } from './cqjs'

export interface IView<TContext> {
  kind: 'VIEW'
  getUri: IFunc<string>
  getContext: IFunc<TContext>
  getHandlerDefs: IFunc<Array<IEventHandlerDef<TContext, any>>>
  // getHandlers: () => Array<IAction1<IEvent<any>>>,
  // getSubscriptions: () => Array<ISubscription>,
}

export function isView<TContext>(target: any): target is IView<TContext> {
  return (<IView<TContext>> target).kind === 'VIEW'
}

export class View<TContext> implements IView<TContext> {
  public kind: 'VIEW'
  private uri: string
  private context: TContext
  private handlerDefs: Array<IEventHandlerDef<TContext, any>>

  constructor (
    uri: string,
    context: TContext,
    ...handlerDefs: Array<IEventHandlerDef<TContext, any>>
  ) {
    this.uri = uri
    this.context = context
    this.handlerDefs = handlerDefs
  }

  public getUri() { return this.uri }
  public getContext() { return this.context }
  public getHandlerDefs() { return this.handlerDefs }
}

// export function View<TContext>(
//   uri: string,
//   context: TContext,
//   ...handlerDefs: Array<IEventHandlerDef<TContext, any>>): IView<TContext> {
//   let handlers = []
//   let subscriptions = []
//   let i = -1
//   const length = handlerDefs.length
//   while (++i < length) {
//     const handlerDef = handlerDefs[i]
//     const handler = (e: IEvent<any>) => {
//       handlerDef.handler(context, e.payload, e.meta)
//     }
//     handlers.push(handler)
//     const handlerUri = handlerDef.meta.uri
//     const type = handlerDef.meta.type
//     const filter = (e: IEvent<any>): boolean => {
//       return handlerUri === e.meta.uri && type === e.meta.type
//     }
//     const sub = new Subscription(handler, ErrorFunc, filter)
//     subscriptions.push(sub)
//   }
//   return {
//     getContext: () => context,
//     getHandlerDefs: () => handlerDefs,
//     getHandlers: () => handlers,
//     //getSubscriptions: () => subscriptions,
//     kind: 'VIEW',
//     uri,
//   }
// }
