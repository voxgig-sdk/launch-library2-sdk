
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

import type {
  ReusableFirstStage,
} from '../LaunchLibrary2Types'

// TODO: needs Entity superclass
class ReusableFirstStageEntity extends LaunchLibrary2EntityBase<ReusableFirstStage> {

  constructor(client: LaunchLibrary2SDK, entopts: any) {
    super(client, entopts)
    this.name = 'reusable_first_stage'
    this.name_ = 'reusable_first_stage'
    this.Name = 'ReusableFirstStage'
  }


  make(this: ReusableFirstStageEntity) {
    return new ReusableFirstStageEntity(this._client, this.entopts())
  }







}


export {
  ReusableFirstStageEntity
}
