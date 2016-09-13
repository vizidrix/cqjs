/**
 * cqjs/cqjs.js
 */

'use strict'

export type IAggregateMeta = {
  key: string,
  version: number,
}

export type IMessageMeta = {
  kind: 'COMMAND' | 'EVENT',
  uri: string,
  type: string,
}

// export interface ICommandMap<TState> {
//   [key: string]: ICommandDef<TState,IAnyCommandPayloadType, IAnyCommandHandlerResultType>
// }

// export interface IEventMap<TState> {
//   [key: string]: IEventDef<TState, any>
// }

// export interface IDomain<TState> {
//   kind: 'DOMAIN'
//   getMeta: IFunc<IDomainMeta<TState>>,
//   getCommandMap: IFunc<ICommandMap<TState>>
//   getEventMap: IFunc<IEventMap<TState>>
// }
