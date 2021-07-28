import { DataStorage } from './data-storage'
import { UserSetup } from '@speek/core/entity'
import { getAudioConfig, getVideoConfig } from '@speek/util/device'

export class UserSetupStorage extends DataStorage<UserSetup> {
  protected key = 'user_setup'

  getAudioConfig() {
    const { audio } = this.getStoredValue() ?? {}
    return getAudioConfig(audio?.deviceId)
  }

  getVideoConfig() {
    const { video } = this.getStoredValue() ?? {}
    return getVideoConfig(video?.deviceId)
  }

  getStateConfig() {
    const { state } = this.getStoredValue() ?? {}
    return state ? state : { audio: true, video: true, caption: false }
  }
}
