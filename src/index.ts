/**
 * cqjs/src/index.js
 */

'use strict'

export {
  CommandDef,
  ICommand,
  ICommandHandlerFunc,
  ICommandCtor,
  ICommandDef
} from './command'

export {
  IAggregateMeta
} from './cqjs'

export {
  Domain,
  IDomainConfig,
  IDomain
} from './domain'

export {
  EventDef,
  IEventLoaderFunc,
  IEventHandlerFunc,
  IEventHandlerDef,
  IEventDef,
  IEvent
} from './event'

export {
  IEventStore
} from './eventstore'

export {
  IKeyFunc,
  Random,
  Singleton,
  UUIDKeyGen
} from './keygen'

export {
  IProcess,
  Process,
} from './process'

export {
  IAction,
  IAction1,
  IAction2,
  IFunc,
  IFunc1,
  IFunc2,
  IPredicate,
  throwit,
  ErrorFunc,
  FalseFunc,
  NoOpFunc,
  TrueFunc,
} from './utils'

export {
  IView,
  View,
} from './view'

// export { EventStore } from './eventstore'

// export { IEventStream } from './eventstream'

// export { EventStream } from './eventstream'

// export { ISubscription } from './subscription'

// export { Subscription } from './subscription'

// export { IActor, ISystem } from './system'

// export { System } from './system'

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
// function isCrushed() {}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
// function warning(message) {
//   /* eslint-disable no-console */
//   if (typeof console !== 'undefined' && typeof console.error === 'function') {
//     console.error(message)
//   }
//   /* eslint-enable no-console */
//   try {
//     // This error was thrown as a convenience so that if you enable
//     // "break on all exceptions" in your console,
//     // it would pause the execution at this line.
//     throw new Error(message)
//   /* eslint-disable no-empty */
//   } catch (e) { }
//   /* eslint-enable no-empty */
// }

// if (
//   process.env.NODE_ENV !== 'production' &&
//   typeof isCrushed.name === 'string' &&
//   isCrushed.name !== 'isCrushed'
// ) {
//   warning(
//     'You are currently using minified code outside of NODE_ENV === \'production\'. ' +
//     'This means that you are running a slower development build of CQJS. ' +
//     'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
//     'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' +
//     'to ensure you have the correct code for your production build.'
//   )
// }
