/// <reference path="../typings/modules/lodash/index.d.ts" />
/*
 * cqjs/src/domain.js
 */

'use strict'

import * as _ from 'lodash'

import { CommandDef, ICommandDef, ICommandHandlerFunc } from './command'
import { EventDef, IEventDef, IEventLoaderFunc } from './event'
import { IKeyFunc, Random } from './keygen'
// import { extend, IFunc1, IFunc2 } from './utils'
import { IFunc, IFunc1, IFunc2 } from './utils'
import { extend } from './utils'

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

// export interface IDomain<TState, TEventDefs> {
//   kind: 'DOMAIN'
//   defs: TEventDefs,
//   getMeta: IFunc<IDomainMeta<TState>>,
//   getCommands: IFunc<Array<ICommandDef<TState, IAnyCommandPayloadType, IAnyCommandHandlerResultType>>>,
//   getEvents: IFunc<Array<IEventDef<TState, IAnyEventPayloadType>>>,

//   command: <TCommand, TEvent>(
//     type: string,
//     handler: ICommandHandlerFunc<TState, TCommand, TEvent>
//   ) => ICommandDef<TState, TCommand, TEvent>,

//   event: <TEvent>(
//     type: string,
//     loader: IEventLoaderFunc<TState, TEvent>
//   ) => IEventDef<TState, TEvent>
// }

export function isDomainMeta<TState>(target: any): target is IDomainMeta<TState> {
  return (<IDomainMeta<TState>> target).kind === 'DOMAIN_META'
}

// export type IEventLoaderFuncMap<TState> = { [key: string]: IEventLoaderFunc<TState, any> }
export type IEventDefMap<TState> = { [key: string]: IEventDef<TState, any> }
export type ICommandDefMap<TState> = { [key: string]: ICommandDef<TState, any, any> }

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

  // public test<TEventDefs extends IEventDefMap<TState>>(defs: TEventDefs): TEventDefs {
  //   return defs
  // }

  public command<TCommand, TEvent>(
    type: string,
    handler: ICommandHandlerFunc<TState, TCommand, TEvent>
  ): ICommandDef<TState, TCommand, TEvent> {
    const def = new CommandDef(this.getUri(), type, handler)
    // this.commands.push(def)
    return def
  }

  // public event<TEvent>(
  //   type: string,
  //   loader: IEventLoaderFunc<TState, TEvent>
  // ): IEventDef<TState, TEvent> {
  //   const def = new EventDef(this.getUri(), type, loader)
  //   //this.events.push(def)
  //   return def
  // }
}

export type EventDefFunc<TState> = <TEvent>(
  type: string,
  loader: IEventLoaderFunc<TState, TEvent>
) => IEventDef<TState, TEvent>

export type CommandDefFunc<TState> = <TCommand, TEvents>(
  type: string,
  handler: ICommandHandlerFunc<TState, TCommand, TEvents>
) => ICommandDef<TState, TCommand, TEvents>

export function eventFunc<TState, TEvent>(
  uri: string
): IFunc2<string, IEventLoaderFunc<TState, TEvent>, IEventDef<TState, TEvent>> {
  return (
    type: string,
    loader: IEventLoaderFunc<TState, TEvent>
  ): IEventDef<TState, TEvent> => new EventDef(uri, type, loader)
}

export function commandFunc<TState, TCommand, TEvents>(
  uri: string
): IFunc2<string, ICommandHandlerFunc<TState, TCommand, TEvents>, ICommandDef<TState, TCommand, TEvents>> {
  return (
    type: string,
    handler: ICommandHandlerFunc<TState, TCommand, TEvents>
  ): ICommandDef<TState, TCommand, TEvents> => new CommandDef(uri, type, handler)
}

export function Domain<
  TState,
  TEventDefs extends IEventDefMap<TState>,
  TCommandDefs extends ICommandDefMap<TState>
>(
  uri: string,
  initialState: TState,
  config: IDomainConfig,
  events: IFunc1<EventDefFunc<TState>, TEventDefs>,
  commands: IFunc2<CommandDefFunc<TState>, TEventDefs, TCommandDefs>
): { meta: IDomainMeta<TState>} & TEventDefs & TCommandDefs {
  const meta = new DomainMeta(uri, initialState)
  const eventDefs = events(eventFunc<TState, any>(uri))
  const commandDefs = commands(commandFunc<TState, any, any>(uri), eventDefs)
  const messages = extend(eventDefs, commandDefs)
  return extend({meta}, messages)
}

// const def = new EventDef(uri, type, loader)
// this.events.push(def)
// return def

// export function Domain<
//   TState,
//   TEventDefs extends IEventDefMap<TState>
// >(
//   // meta: IDomainMeta<TState>,
//   defs: TEventDefs
// ): TEventDefs {
//   return defs
// }

// export function isDomain<TState>(target: any): target is IDomain<TState> {
//   return (<IDomain<TState>> target).kind === 'DOMAIN'
// }

// // {[key: string]: IEventDef<any> | ICommandDef<any> }`
// export class Domain<TState, TEventDefs> implements IDomain<TState> {
//   public kind: 'DOMAIN'
//   private meta: IDomainMeta<TState>
//   private commands: Array<ICommandDef<TState, IAnyCommandPayloadType, IAnyCommandHandlerResultType>> = []
//   private events: Array<IEventDef<TState, IAnyEventPayloadType>> = []
//   public defs: TEventDefs

//   constructor(uri: string, initialState: TState, defs: IFunc1<IDomain<TState, TEventDefs>, TEventDefs>) {
//     this.defs = defs(this)
//   }

//   // constructor(uri: string, initialState: TState, config: IDomainConfig = {
//   //   keyFunc: Random(10),
//   // }) {
//   //   this.meta = new DomainMeta(uri, initialState, config)
//   //   this.commands = []
//   //   this.events = []
//   // }

//   public getMeta(): IDomainMeta<TState> {
//     return this.meta
//   }

//   public getCommands(): Array<ICommandDef<TState, IAnyCommandPayloadType, IAnyCommandHandlerResultType>> {
//     return this.commands
//   }

//   public getEvents(): Array<IEventDef<TState, IAnyEventPayloadType>> {
//     return this.events
//   }

//   public command<TCommand, TEvent>(
//     type: string,
//     handler: ICommandHandlerFunc<TState, TCommand, TEvent>
//   ): ICommandDef<TState, TCommand, TEvent> {
//     const def = new CommandDef(this.meta.getUri(), type, handler)
//     this.commands.push(def)
//     return def
//   }

//   public event<TEvent>(
//     type: string,
//     loader: IEventLoaderFunc<TState, TEvent>
//   ): IEventDef<TState, TEvent> {
//     const def = new EventDef(this.meta.getUri(), type, loader)
//     this.events.push(def)
//     return def
//   }
// }
