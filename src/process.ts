/**
 * cqjs/src/process.js
 */

'use strict'

export type IProcess = {
  kind: 'PROCESS',
  uri: string,
  // getHandlerDefs
}

export function isProcess(target: any): target is IProcess {
  return (<IProcess> target).kind === 'PROCESS'
}

export class Process {
  public kind: 'PROCESS'
  private uri: string

  constructor(uri: string) {
    this.kind = 'PROCESS'
    this.uri = uri
  }
}
