import { AxiosRequestConfig } from 'axios'
import { GroupMessageOptions, Groups } from '../rest/group-message'
import { MessageOptions, Messages } from '../rest/message'
import {
  RequestClient,
  RequestClientOptions,
  RequestClientRequestOptions
} from './RequestClient'

export interface SendblueClientOptions {
  axiosClientOptions?: RequestClientOptions
  logLevel?: 'debug' | 'info' | 'warn' | 'error'
}

export class SendblueClient {
  axiosClient: RequestClient
  groups: Groups
  messages: Messages
  logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info'

  constructor (
    apiKey: string,
    apiSecret: string,
    options: SendblueClientOptions
  ) {
    if (options.logLevel !== options?.axiosClientOptions?.logLevel) {
      if (!options.axiosClientOptions) options.axiosClientOptions = {}
      options.axiosClientOptions.logLevel = options.logLevel
    }
    this.logLevel = options.logLevel || 'info'
    this.axiosClient = new RequestClient(
      options?.axiosClientOptions || {},
      apiKey,
      apiSecret
    )

    this.groups = new Groups(this)
    this.messages = new Messages(this)
  }

  request (options: AxiosRequestConfig & RequestClientRequestOptions) {
    return this.axiosClient.request(options)
  }

  sendGroupMessage (options: GroupMessageOptions) {
    return this.groups.sendGroupMessage(options)
  }

  sendMessage (options: MessageOptions) {
    return this.messages.sendMessage(options)
  }
}
