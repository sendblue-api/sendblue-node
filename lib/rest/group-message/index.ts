import { MessageImpl } from '../../base/Message'
import { RequestClient } from '../../base/RequestClient'
import { SendblueClient } from '../../base/SendblueClient'
import { ExpressiveSendStyles } from '../../types'

export interface GroupMessageOptions {
  numbers?: string[]
  groupId?: string
  content?: string
  media_url?: string
  send_style?: ExpressiveSendStyles
  status_callback?: string
}

export class Groups {
  constructor (private client: SendblueClient) {}

  /**
   *
   * @param {GroupMessageOptions} options Group message options
   * @returns {Message} message
   *
   * @throws {Error} if the request fails
   */
  async sendGroupMessage (options: GroupMessageOptions) {
    const responseData = await this.client.request({
      method: 'POST',
      url: '/api/send-group-message',
      data: options
    })

    if (this.client.logLevel === 'debug')
      console.log('Response:', responseData)

    return MessageImpl.from(responseData)
  }
}
