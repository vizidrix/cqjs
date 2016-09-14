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

export const ErrorFunc: IAction = () => throwit('unhandled error')
export const FalseFunc: IPredicate<any> = () => false
export const NoOpFunc: IAction = () => { /* noop */ }
export const TrueFunc: IPredicate<any> = () => true

export function throwit(message: string) {
  throw new Error(message)
}

export function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U> {}
    for (let id in first) {
        if (!first.hasOwnProperty(id)) { continue }
        result[id] = first[id]
    }
    for (let id in second) {
        if (result.hasOwnProperty(id)) { continue }
        result[id] = second[id]
    }
    return result
}
