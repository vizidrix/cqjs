/**
 * cqjs/src/event.js
 */

'use strict'

import { IAggregateMeta, IMessageMeta } from './cqjs'
import { IFunc } from './utils'

export type IEventLoaderFunc<TState, TEvent> = (
  state: TState,
  event: TEvent,
  meta: IAggregateMeta
) => TState

export interface IEvent<TEvent> {
  meta: IMessageMeta,
  key: string,
  version: number,
  payload: TEvent,
}

export interface IEventHandlerDef<TContext, TEvent> {
  kind: 'EVENT_HANDLER_DEF',
  meta: IMessageMeta,
}

export interface IEventDef<TState, TEvent> {
  kind: 'EVENTDEF',
  getMeta: IFunc<IMessageMeta>,
  loader: IFunc<IEventLoaderFunc<TState, TEvent>>,

  new: (payload: TEvent) => IEvent<TEvent>,
}

export class EventDef<TState, TEvent> {
  public kind: 'EVENTDEF'
  private meta: IMessageMeta
  private loaderFunc: IEventLoaderFunc<TState, TEvent>

  constructor(
    uri: string,
    type: string,
    loaderFunc: IEventLoaderFunc<TState, TEvent>
  ) {
    this.meta = {
      kind: 'EVENT',
      uri,
      type,
    }
    this.loaderFunc = loaderFunc
  }

  public getMeta(): IMessageMeta {
    return this.meta
  }

  public loader(): IEventLoaderFunc<TState, TEvent> {
    return this.loaderFunc
  }

  public new(
    payload: TEvent
  ): IEvent<TEvent> {
    return {
      key: '', // This should be stitched in from the store prior to handlers not carried togetehr with payload
      meta: this.meta,
      payload,
      version: 0,
    }
  }
}

// export type IEventHandlerFunc<TContext, TEvent> = (
//   context: TContext,
//   event: TEvent,
//   meta: IMessageMeta
// ) => void

// handler: IEventHandlerFunc<TContext, TEvent>,

//   handler: <TContext>(
//     handler: IEventHandlerFunc<TContext, TEvent>
//   ) => IEventHandlerDef<TContext, TEvent>,

// this.handlerFunc = <TContext>(
//       handler: IEventHandlerFunc<TContext, TEvent>
//     ): IEventHandlerDef<TContext, TEvent> => {
//       return {
//         kind: 'EVENT_HANDLER_DEF',
//         meta: this.meta,
//         handler,
//       }
//     }

//   public handler<TContext>(
//     handler: IEventHandlerFunc<TContext, TEvent>
//   ): IEventHandlerDef<TContext, TEvent> {
//     return this.handlerFunc(handler)
//   }

//     private handlerFunc: <TContext>(
//     handlerFunc: IEventHandlerFunc<TContext, TEvent>
//   ) => IEventHandlerDef<TContext, TEvent>
