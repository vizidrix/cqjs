/**
 * cqjs/src/eventstore.js
 */

'use strict'

import { IDomain } from './domain'
import { EventStream, IEventStream } from './eventstream'
import { throwit } from './utils'

export type IEventStore<TState> = {
  stream: <TState>(domain: IDomain<TState>, key: string) => IEventStream<TState>,
}

export type EventStoreData = { [domain: string]: { [key: string]: IEventStream<any> } }

export const EventStore = (...streams: Array<IEventStream<any>>) => {
  const length = streams.length
  let data = {}
  let i = -1
  while (++i < length) {
    const stream = streams[i]
    const domain = stream.getDomain()
    const key = stream.getKey()
    const uri = domain.getMeta().getUri()
    if (!data.hasOwnProperty(uri)) { // Make sure entry exists for domain uri
      data[uri] = {}
    }
    const domainStream = data[uri]
    if (domainStream.hasOwnProperty(key)) {
      throwit('Duplicate stream in event store ctor')
    }
    domainStream[key] = stream
  }

  return {
    stream: <TState>(domain: IDomain<TState>, key: string): IEventStream<TState> => {
      const uri = domain.getMeta().getUri()
      if (!data.hasOwnProperty(uri)) {
        data[uri] = {}
      }
      let domainStream = data[uri]
      if (!domainStream.hasOwnProperty(key)) {
        domainStream[key] = EventStream(domain, key)
      }
      return domainStream[key]
    },
  }
}

/*
export class EventStore {
  streams: EventStoreData;

  //constructor(...streams: Array<EventStream<*>>) {
  constructor(...streams: Array<IEventStream<any>>) {
    this.streams = {}
    for (let i = 0; i < streams.length; i++) {
      const stream = streams[i]
      const domain = stream.getDomain()
      const key = stream.getKey()
      const uri = domain.uri
      if (!this.streams.hasOwnProperty(uri)) {
        this.streams[uri] = {}
      }
      const domainStream = this.streams[uri]
      if (domainStream.hasOwnProperty(key)) {
        throwit('Duplicate stream in event store ctor')
      }
      domainStream[key] = stream
    }
  }

  stream<TState>(domain: IDomain<TState>, key: string): IEventStream<TState> {
    if (!this.streams.hasOwnProperty(domain.uri)) {
      this.streams[domain.uri] = {}
    }
    let domainStream = this.streams[domain.uri]
    if (!domainStream.hasOwnProperty(key)) {
      domainStream[key] = new EventStream(domain, key)
    }
    return domainStream[key]
  }
}
*/
