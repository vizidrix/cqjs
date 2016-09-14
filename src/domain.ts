/// <reference path="../typings/modules/lodash/index.d.ts" />
/*
 * cqjs/src/domain.js
 */

'use strict'

import * as _ from 'lodash'

import { IFunc } from './utils'

import { CommandDef, ICommandDef, ICommandHandlerFunc } from './command'
import { EventDef, IEventDef, IEventLoaderFunc } from './event'
import { IKeyFunc, Random } from './keygen'

export interface IDomainConfig {
  keyFunc?: IKeyFunc,
}

export interface IDomainProps<TState> {
  uri: string,
  initialState: TState,
  config: IDomainConfig,
}

export interface IAnyCommandPayloadType {}
export interface IAnyCommandHandlerResultType {}

export interface IAnyEventPayloadType {}

export interface IDomainMeta<TState> {
  kind: 'DOMAIN_META'
  getUri: IFunc<string>
  getConfig: IFunc<IDomainConfig>
  getInitialState: IFunc<TState>
}

export interface IDomain<TState> {
  kind: 'DOMAIN'
  getMeta: IFunc<IDomainMeta<TState>>,
  getCommands: IFunc<Array<ICommandDef<TState, IAnyCommandPayloadType, IAnyCommandHandlerResultType>>>,
  getEvents: IFunc<Array<IEventDef<TState, IAnyEventPayloadType>>>,

  command: <TCommand, TEvent>(
    type: string,
    handler: ICommandHandlerFunc<TState, TCommand, TEvent>
  ) => ICommandDef<TState, TCommand, TEvent>,

  event: <TEvent>(
    type: string,
    loader: IEventLoaderFunc<TState, TEvent>
  ) => IEventDef<TState, TEvent>
}

export function isDomainMeta<TState>(target: any): target is IDomainMeta<TState> {
  return (<IDomainMeta<TState>> target).kind === 'DOMAIN_META'
}

export class DomainMeta<TState> implements IDomainMeta<TState> {
  public kind: 'DOMAIN_META'
  private uri: string
  private config: IDomainConfig
  private initialState: TState

  constructor(uri: string, initialState: TState, config: IDomainConfig = {
    keyFunc: Random(10),
  }) {
    this.uri = uri
    this.config = config
    this.initialState = initialState
  }

  public getUri(): string {
    return this.uri
  }

  public getConfig(): IDomainConfig {
    return _.cloneDeep(this.config)
  }

  public getInitialState(): TState {
    return _.cloneDeep(this.initialState)
  }
}

export function isDomain<TState>(target: any): target is IDomain<TState> {
  return (<IDomain<TState>> target).kind === 'DOMAIN'
}

export class Domain<TState> implements IDomain<TState> {
  public kind: 'DOMAIN'
  private meta: IDomainMeta<TState>
  private commands: Array<ICommandDef<TState, IAnyCommandPayloadType, IAnyCommandHandlerResultType>> = []
  private events: Array<IEventDef<TState, IAnyEventPayloadType>> = []

  constructor(uri: string, initialState: TState, config: IDomainConfig = {
    keyFunc: Random(10),
  }) {
    this.meta = new DomainMeta(uri, initialState, config)
    this.commands = []
    this.events = []
  }

  public getMeta(): IDomainMeta<TState> {
    return this.meta
  }

  public getCommands(): Array<ICommandDef<TState, IAnyCommandPayloadType, IAnyCommandHandlerResultType>> {
    return this.commands
  }

  public getEvents(): Array<IEventDef<TState, IAnyEventPayloadType>> {
    return this.events
  }

  public command<TCommand, TEvent>(
    type: string,
    handler: ICommandHandlerFunc<TState, TCommand, TEvent>
  ): ICommandDef<TState, TCommand, TEvent> {
    const def = new CommandDef(this.meta.getUri(), type, handler)
    this.commands.push(def)
    return def
  }

  public event<TEvent>(
    type: string,
    loader: IEventLoaderFunc<TState, TEvent>
  ): IEventDef<TState, TEvent> {
    const def = new EventDef(this.meta.getUri(), type, loader)
    this.events.push(def)
    return def
  }
}
