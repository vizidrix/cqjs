/**
 * cqjs/src/system.js
 */

// import { IAction1, IPredicate, throwit } from './utils'
import { throwit } from './utils'

import { ICommand } from './command'
import { Domain, IDomain } from './domain'
// import { IEvent } from './event'
import { EventStore, IEventStore } from './eventstore'
import { IProcess } from './process'
// import { ISubscription, Subscription } from './subscription'
import { ISubscription } from './subscription'
import { IView } from './view'

export type IActor = IDomain<any> | IProcess | IView<any>

// export function isDomain(actor: IActor): actor is IDomain<any> {
//   return (<IDomain<any>> actor).kind === 'DOMAIN'
// }

export function isProcess(actor: IActor): actor is IProcess {
  return (<IProcess> actor).kind === 'PROCESS'
}

export function isView(actor: IActor): actor is IView<any> {
  return (<IDomain<any>> actor).kind === 'DOMAIN'
}

export type ISystem = {
  kind: 'SYSTEM',
  getStore: () => IEventStore<any>,
  domains: {[key: string]: IDomain<any>},
  withStore: (store: IEventStore<any>) => ISystem,
  dispatch: (command: ICommand<any>) => string,
  load: <TState>(domain: IDomain<TState>, key?: string) => TState,
  // subscribe: (next: IAction1<IEvent<any>>, err: IAction1<Error>) => ISubscription,
}

export class System {
  public kind: 'SYSTEM'
  private store: IEventStore<any>
  public domains: {[key: string]: IDomain<any>}
  private processes: {[key: string]: IProcess}
  private views: {[key: string]: IView<any>}
  private subscriptions: Array<ISubscription>

  constructor(...actors: Array<IActor>) {
    this.store = EventStore()
    this.domains = {}
    this.processes = {}
    this.views = {}
    this.subscriptions = []

    let subs
    actors.forEach(actor => {
      if (Domain.isDomain(actor)) {
        this.domains[actor.getMeta().getUri()] = actor
      } else if (isProcess(actor)) {
        this.processes[actor.uri] = actor
      } else if (isView(actor)) {
        this.views[actor.uri] = actor
        subs = actor.getSubscriptions()
        for (let i = 0; i < subs.length; i++) {
          this.subscriptions.push(subs[i])
        }
      } else {
        if (actor.kind === undefined) {
          throwit('Invalid actor definition')
        }
        throwit('Invalid actor kind [' + actor.kind + ']')
      }
    })
  }

  public getStore(): IEventStore<any> {
    return this.store
  }

  public getContext<TContext>(view: IView<TContext>): TContext {
    return view.getContext()
  }

  public withStore(store: IEventStore<any>): ISystem {
    this.store = store
    return this
  }

  public dispatch<TCommand>(command: ICommand<TCommand>): string {
    const domain = this.domains[command.meta.uri]
    if (typeof domain !== 'undefined' && !this.domains.hasOwnProperty(command.meta.uri)) { throwit('domain not found in system') }
    return ''

    // const def = domain.commands[command.meta.type]
    // const key = command.key !== undefined ? command.key : domain.config.keyFunc()
    // const version = command.version !== undefined ? command.version : 0
    // const stream = this.store.stream<any>(domain, key)
    // const state = stream.load()
    // const event = def.handler(state, command.payload, {
    //   key,
    //   version,
    // })
    // stream.append(event)
    // let i = -1
    // const length = this.subscriptions.length
    // while (++i < length) {
    //   this.subscriptions[i].dispatch(event)
    // }
    // return key
  }

  public load<TDomain>(domain: IDomain<TDomain>, key?: string): TDomain {
    if (key == null) {
      key = ''
    }
    const meta = domain.getMeta()
    const uri = meta.getUri()
    domain = this.domains[uri]
    if (typeof domain !== 'undefined' && !this.domains.hasOwnProperty(uri)) {
      throwit('domain not found in system')
    }
    const stream = this.store.stream(domain, key)
    const state = stream.load()
    return state
  }

  // public subscribe(next: IAction<IEvent<any>>, err: IAction<Error>, filter: IPredicate<IEvent<any>> = () => true): ISubscription {
  //   const sub = new Subscription(next, err, filter)
  //   this.subscriptions.push(sub)
  //   this.gc()
  //   return sub
  // }

  public gc() {
    const length = this.subscriptions.length
    let i = -1
    while (++i < length) {
      // if (this.subscriptions[i].isDisposed()) {
      //   this.subscriptions.splice(i--, 1)
      // }
    }
  }
}
