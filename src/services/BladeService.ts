import { BladeSDK } from '@bladelabs/blade-sdk.js'

export class BladeService {
  private static instance: BladeSDK;

  public static getInstance(): BladeSDK {
    if (!BladeService.instance) {
        BladeService.instance = new BladeSDK()
    }

    return BladeService.instance
  }
}