/// <reference path="../typings/modules/lodash/index.d.ts" />
/**
 * cqjs/src/eventstream.js
 */

'use strict'

import { IDomain } from './domain'
import { IEvent } from './event'

import { throwit } from './utils'

export type IEventStream<TState> = {
  kind: 'EVENTSTREAM',

  getDomain: () => IDomain<TState>,
  getKey: () => string,
  getEvents: () => Array<IEvent<any>>,

  append: (...events: Array<IEvent<any>>) => void,
  load: () => TState,
}

export const EventStream = <TState>(domain: IDomain<TState>, key: string, ...initialEvents: Array<IEvent<any>>) => {
  let data = initialEvents
  return {
    append: (...events: Array<IEvent<any>>) => {
      data.push(...events)
    },
    getDomain: () => domain,
    getEvents: () => data,
    getKey: () => key,
    kind: 'EVENTSTREAM',
    load: (): TState => {
      // const events = domain.getEventsMap
      const events = domain.getEvents()
      const state = domain.getMeta().getInitialState()// _.cloneDeep(domain.initial_state)
      const meta = { key, version: 0 }
      return data.reduce((s, curr, index) => {
        const eventType = curr.meta.type
        const uri = domain.getMeta().getUri()
        if (!data.hasOwnProperty(eventType)) {
          throwit('Invalid event [' + eventType + '] in domain [' + uri + ']')
        }
        meta.version = index
        // return events[eventType].loader(s, curr.payload, meta)
        const loader = events.filter(e => e.getMeta().type === eventType)[0].getLoader()
        return loader(s, curr.payload, meta)
      }, state)
    },
  }
}

/*
export class EventStream<TState> {
  kind: 'EVENTSTREAM';
  domain: IDomain<TState>;
  events: Array<IEvent<any>>;
  key: string;

  constructor(domain: IDomain<TState>, key: string, ...events: Array<IEvent<any>>) {
    this.domain = domain
    this.events = events
    this.key = key
  }

  getDomain(): IDomain<TState> {
    return this.domain
  }

  getKey(): string {
    return this.key
  }

  getEvents(): Array<IEvent<any>> {
    return this.events
  }

  append(...events: Array<IEvent<any>>) {
    this.events.push(...events)
  }

  load(): TState {
    //const loaders = this.domain.loaders
    const events = this.domain.events
    const agg = _.cloneDeep(this.domain.initial_state)
    const meta = {
      //domain: this.domain,
      key: this.key,
      version: 0
    }
    let result = this.events.reduce((state, curr, index) => {
      let eventType = curr.def.type
      if (!events.hasOwnProperty(eventType)) throwit('Invalid event [' + eventType + '] in domain [' + this.domain.uri + ']')
      meta.version = index
      return events[eventType].loader(state, curr.payload, meta)
    }, agg)
    return result
  }
}
*/
