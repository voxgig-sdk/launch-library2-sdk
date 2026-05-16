
import { inspect } from 'node:util'

import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase'

import type {
  LaunchLibrary2SDK,
} from '../LaunchLibrary2SDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'


// TODO: needs Entity superclass
class DockingEntity extends LaunchLibrary2EntityBase {

  constructor(client: LaunchLibrary2SDK, entopts: any) {
    super(client, entopts)
    this.name = 'docking'
    this.name_ = 'docking'
    this.Name = 'Docking'
  }


  make(this: DockingEntity) {
    return new DockingEntity(this._client, this.entopts())
  }







}


export {
  DockingEntity
}
