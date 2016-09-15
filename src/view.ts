/// <reference path="../typings/modules/lodash/index.d.ts" />
/**
 * cqjs/src/view.js
 */

'use strict'

import * as _ from 'lodash'

import { IMessageMeta } from './cqjs'
// import { IEvent, IEventHandlerDef } from './event'
// import { IEventHandlerDef } from './event'
import { IEvent, IEventDef } from './event'
// import { ISubscription, Subscription } from './subscription'
// import { ErrorFunc, IAction1, IFunc } from './utils'
// import { IAction1, IFunc1, IFunc2, IFunc } from './utils'
import { IAction1, IFunc, IFunc1 } from './utils'

// import { ERROR } from './cqjs'

// export interface IViewContext {
//   kind: 'VIEW_CONTEXT'
// }

export type IContextKind<TContext> = TContext | IFunc<TContext>

export interface IViewConfig {

}

export interface IViewMeta<TContext> {
  kind: 'VIEW_META'
  getUri: IFunc<string>
  getContext: IFunc<IContextKind<TContext>>
  getConfig: IFunc<IViewConfig>
  // getContext: IFunc<TContext>
  // getHandlerDefs: IFunc<Array<IEventHandlerDef<TContext, any>>>
  // getHandlers: () => Array<IAction1<IEvent<any>>>,
  // getSubscriptions: () => Array<ISubscription>,
}

export function isViewMeta<TContext>(target: any): target is IViewMeta<TContext> {
  return (<IViewMeta<TContext>> target).kind === 'VIEW_META'
}

export function isContextInstance<TContext>(target: any): target is TContext {
  // return (<TContext> target).kind === 'VIEW_CONTEXT'
  return typeof (<TContext> target) !== 'function'
}

export class ViewMeta<TContext> implements IViewMeta<TContext> {
  public kind: 'VIEW_META'
  private uri: string
  private context: IContextKind<TContext>
  private config: IViewConfig
  // private context: TContext
 // private handlerDefs: Array<IEventHandlerDef<TContext, any>>

  constructor (
    uri: string,
    context: IContextKind<TContext>,
    config: IViewConfig = {}
    // ...handlerDefs: Array<IEventHandlerDef<TContext, any>>
  ) {
    this.uri = uri
    this.context = context
    this.config = config
    // this.handlerDefs = []// handlerDefs
  }

  public getUri() {
    return this.uri
  }

  public getContext() {
    const ctx = this.context
    if (isContextInstance<TContext>(ctx)) {
      return _.cloneDeep(ctx)
    } else {
      return _.cloneDeep(ctx())
    }
  }

  public getConfig() {
    return _.cloneDeep(this.config)
  }
}

export type IEventHandlerFunc<TContext, TEvent> = (
  context: TContext,
  event: IEvent<TEvent>,
  meta: IMessageMeta
) => void

export interface IViewHandlerDef<TContext, TEvent> {
  eventDef: IEventDef<any, TEvent>
  handler: IEventHandlerFunc<TContext, TEvent>
}

export type IViewHandlerDefFunc<TContext> = <TEvent>(
  eventDef: IEventDef<any, TEvent>,
  handler: IEventHandlerFunc<TContext, TEvent>
) => IViewHandlerDef<TContext, TEvent>

/// map function to bind the event def to the view handler allowing the meta to be bound to the function def
export function viewHandlerDefFunc<TContext, TEvent>(
  eventDef: IEventDef<any, TEvent>,
  handler: IEventHandlerFunc<TContext, TEvent>
): IViewHandlerDef<TContext, TEvent> {
  return {
    eventDef,
    handler,
  }
}

export interface IView<TContext> {
  meta: IViewMeta<TContext>
  // handlers: Array<IViewHandlerDef<TContext, IEvent<any>>>
  handlers: Array<IAction1<IEvent<any>>>
}

export function View<TContext>(
  uri: string,
  context: IContextKind<TContext>,
  handlerDefsFunc: IFunc1<IViewHandlerDefFunc<TContext>, Array<IViewHandlerDef<TContext, any>>>
): IView<TContext> {
  const meta = new ViewMeta(uri, context)
  const getContext = meta.getContext
  // const handlers: Array<IViewHandlerDef<TContext, any>> = []
  // const handlers: Array<IAction2<any, IMessageMeta>> = []
  // const handlers: Array<IViewHandlerDef<TContext, IEvent<any>>> = []
  const handlers: Array<IAction1<IEvent<any>>> = []
  const handlerDefs = handlerDefsFunc(viewHandlerDefFunc)
  const handlerLength = handlerDefs.length
  let i = -1
  while (++i < handlerLength) {
    const def = handlerDefs[i]
    const defMeta = def.eventDef.getMeta()
    handlers.push((event: IEvent<any>) => {
      def.handler(getContext(), event, defMeta)
    })
    // let defs = handlersDefs(handlerFunc<TContext, any, any>)
    // let def = handlersDefs[i]({})
    // def.
  }
  return { meta, handlers }
}

//  public getContext() { return this.context }
//   public getHandlerDefs() { return this.handlerDefs }

//   // public handle<TEvent>(handlerDef: IEventHandlerDef<TContext, TEvent>, any)
//   public handle<TEvent>(eventDef: IEventDef<any, TEvent>, handler: IEventHandlerFunc<TContext, TEvent>) {
//     this.handlerDefs.push(eventDef.handler(handler))
//   }
// }

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
