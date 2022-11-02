import { MessageImpl } from '../../base/Message'
import { SendblueClient } from '../../base/SendblueClient'

export interface MessageOptions {
  number: string
  content?: string
  media_url?: string
  status_callback?: string
  send_style?: string
}

export class Messages {
  constructor (private client: SendblueClient) {}

  async sendMessage (options: MessageOptions) {
    const response = await this.client.request({
      method: 'POST',
      url: '/api/send-message',
      data: options
    })
    return MessageImpl.from(response.data)
  }
}
