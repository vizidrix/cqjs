/**
 * cqjs/src/command.js
 */

'use strict'

import { IAggregateMeta, IMessageMeta } from './cqjs'
import { IEvent } from './event'
import { IFunc } from './utils'

export type ICommandHandlerFunc<TState, TCommand, TEvents> = (
  state: TState,
  command: TCommand,
  meta: IAggregateMeta
) => IEvent<TEvents>

export interface ICommand<TCommand> {
  meta: IMessageMeta,
  key?: string,
  version?: number,
  payload: TCommand,
}

export type ICommandCtor<TCommand> = (
  payload: TCommand,
  key?: string,
  version?: number
) => ICommand<TCommand>

export interface ICommandDef<TState, TCommand, TEvents> {
  kind: 'COMMANDDEF',
  getMeta: IFunc<IMessageMeta>,
  getHandler: IFunc<ICommandHandlerFunc<TState, TCommand, TEvents>>,

  new: ICommandCtor<TCommand>,
}

export class CommandDef<TState, TCommand, TEvents> {
  public kind: 'COMMANDDEF'
  private meta: IMessageMeta
  private handler: ICommandHandlerFunc<TState, TCommand, TEvents>

  constructor(
    uri: string,
    type: string,
    handler: ICommandHandlerFunc<TState, TCommand, TEvents>
  ) {
    this.meta = {
      kind: 'COMMAND',
      uri,
      type,
    }
    this.handler = handler
  }

  public getMeta(): IMessageMeta {
    return this.meta
  }

  public getHandler(): ICommandHandlerFunc<TState, TCommand, TEvents> {
    return this.handler
  }

  public new(
    payload: TCommand,
    key?: string,
    version?: number
  ): ICommand<TCommand> {
    return {
      meta: this.meta,
      key,
      version,
      payload,
    }
  }
}
