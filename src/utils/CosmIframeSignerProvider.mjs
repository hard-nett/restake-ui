import _ from 'lodash'
import KeplrSignerProvider from "./KeplrSignerProvider.mjs"
import {
  isMobile,
} from "@walletconnect/browser-utils";
import { Cosmiframe } from '@dao-dao/cosmiframe'

export default class CosmIframeSignerProvider extends KeplrSignerProvider {
  name = 'iframe'
  label = 'CosmIframe'
  keychangeEvent = 'iframe_keystorechange'

  constructor(keplrProvider, cosmiframeUrl) {
    super(keplrProvider)
    this.cosmiframeUrl = cosmiframeUrl
    this.cosmiframe = new Cosmiframe(this.cosmiframeUrl)
  }

  async enable(network) {
    await this.cosmiframe.p.enable(network)
  }

  available() {
    return !!this.provider || isMobile()
  }

  async getOfflineSigner(network) {
    return this.cosmiframe.getOfflineSigner(network)
  }

  async getOfflineSignerAmino(network) {
    return this.cosmiframe.getOfflineSignerAmino(network)
  }

  async getOfflineSignerDirect(network) {
    return this.cosmiframe.getOfflineSignerDirect(network)
  }

  async getKeplrClient() {
    return this.cosmiframe.getKeplrClient()
  }

  setOptions(options) {
    return _.merge(this.provider.defaultOptions, options)
  }

  getOptions() {
    return this.provider.defaultOptions
  }
}