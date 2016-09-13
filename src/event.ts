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

export type IEventHandlerFunc<TContext, TEvent> = (
  context: TContext,
  event: TEvent,
  meta: IMessageMeta
) => void

export interface IEventHandlerDef<TContext, TEvent> {
  kind: 'EVENT_HANDLER_DEF',
  meta: IMessageMeta,
  handler: IEventHandlerFunc<TContext, TEvent>,
}

export interface IEventDef<TState, TEvent> {
  kind: 'EVENTDEF',
  getMeta: IFunc<IMessageMeta>,
  getLoader: IFunc<IEventLoaderFunc<TState, TEvent>>,
  getHandler: <TContext>(
    handler: IEventHandlerFunc<TContext, TEvent>
  ) => IEventHandlerDef<TContext, TEvent>,

  new: (payload: TEvent) => IEvent<TEvent>,
}

export interface IEvent<TEvent> {
  meta: IMessageMeta,
  payload: TEvent,
}

export class EventDef<TState, TEvent> {
  public kind: 'EVENTDEF'
  private meta: IMessageMeta
  private loader: IEventLoaderFunc<TState, TEvent>
  private handlerFunc: <TContext>(
    handler: IEventHandlerFunc<TContext, TEvent>
  ) => IEventHandlerDef<TContext, TEvent>

  constructor(
    uri: string,
    type: string,
    loader: IEventLoaderFunc<TState, TEvent>
  ) {
    this.meta = {
      kind: 'EVENT',
      uri,
      type,
    }
    this.loader = loader
    this.handlerFunc = <TContext>(
      handler: IEventHandlerFunc<TContext, TEvent>
    ): IEventHandlerDef<TContext, TEvent> => {
      return {
        kind: 'EVENT_HANDLER_DEF',
        meta: this.meta,
        handler,
      }
    }
  }

  public getMeta(): IMessageMeta {
    return this.meta
  }

  public getLoader(): IEventLoaderFunc<TState, TEvent> {
    return this.loader
  }

  public getHandler<TContext>(
    handler: IEventHandlerFunc<TContext, TEvent>
  ): IEventHandlerDef<TContext, TEvent> {
    return this.handlerFunc(handler)
  }

  public new(
    payload: TEvent
  ): IEvent<TEvent> {
    return {
      meta: this.meta,
      payload,
    }
  }
}
