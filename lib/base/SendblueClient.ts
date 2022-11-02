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
}

export class SendblueClient {
  axiosClient: RequestClient
  groups: Groups
  messages: Messages

  constructor (
    apiKey: string,
    apiSecret: string,
    options: SendblueClientOptions
  ) {
    this.axiosClient = new RequestClient(
      options.axiosClientOptions || {},
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
