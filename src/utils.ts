/**
 * cqjs/utils.js
 */

'use strict'

export type IAction = () => void
export type IAction1<T1> = (arg1: T1) => void
export type IAction2<T1, T2> = (arg1: T1, arg2: T2) => void

export type IFunc<R> = () => R
export type IFunc1<T1, R> = (arg1: T1) => R
export type IFunc2<T1, T2, R> = (arg1: T1, arg2: T2) => R

export type IPredicate<T> = IFunc1<T, boolean>

export function throwit(message: string) {
  throw new Error(message)
}

export const ErrorFunc: IAction = () => throwit('unhandled error')
export const FalseFunc: IPredicate<any> = () => false
export const NoOpFunc: IAction = () => { /* noop */ }
export const TrueFunc: IPredicate<any> = () => true
