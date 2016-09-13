/**
 * cqjs/src/subscription.js
 */

import * as rx from 'rxjs'

import { IFunc, IAction, IAction1, IPredicate, NoOpFunc } from './utils'
import { IEvent } from './event'
import { UUID } from './keygen'

export type ISubscription = {
  getKind: IFunc<string>,
  isKind: (target: any) => target is ISubscription,
  getKey: IFunc<string>,
  dispatch: IAction1<IEvent<any>>,
  onError: IAction1<Error>,
  dispose: IAction,
  isDisposed: IPredicate<void>,
}

const KIND = 'SUBSCRIPTION'

export class Subscription {
  private props: {
    disposed: boolean,
    filter: IPredicate<IEvent<any>>,
    key: string,
    onError: IAction1<Error>,
    onNext: IAction1<IEvent<any>>,
  }

  constructor(
    onNext: IAction1<IEvent<any>>,
    onError: IAction1<Error>,
    filter: IPredicate<IEvent<any>> = () => true
  ) {
    this.props = {
      disposed: false,
      filter,
      key: UUID(),
      onError,
      onNext,
    }
  }

  public isKind(target: any): target is ISubscription {
    return (<ISubscription> target).getKind() === KIND
  }

  public getKind(): string {
    return KIND
  }

  public getKey(): string {
    return this.props.key
  }

  public dispatch(event: IEvent<any>) {
    if (!this.props.filter(event)) { return }
    this.props.onNext(event)
  }

  public onError(err: Error) {
    this.onError(err)
  }

  public dispose() {
    this.props.onNext = 
    this.props.onError = () => {}
    this.props.disposed = true
  }

  public isDisposed(): boolean {
    return this.props.disposed
  }
}
