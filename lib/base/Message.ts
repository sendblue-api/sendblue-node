import { ExpressiveSendStyles } from '../types'

interface MessageMetadata {
  plan?: string
}

export type MessageTypes = 'group' | 'message'

export interface Message {
  accountEmail?: string
  content?: string
  is_outbound?: boolean
  status?: string
  error_code?: string
  error_message?: string
  message_handle?: string
  date_sent?: Date
  date_updated?: Date
  from_number?: string
  number?: string
  to_number?: string
  was_downgraded?: boolean
  plan?: string
  media_url?: string
  message_type?: string
  group_id?: string
  participants?: string[]
}

export class MessageImpl {
  accountEmail: string | undefined
  content: string | undefined
  is_outbound: boolean | undefined
  status: string | undefined
  error_code: string | undefined
  error_message: string | undefined
  message_handle: string | undefined
  date_sent: Date | undefined
  date_updated: Date | undefined
  from_number: string | undefined
  number: string | undefined
  to_number: string | undefined
  was_downgraded: boolean | undefined
  plan: string | undefined
  media_url: string | undefined
  message_type: string | undefined
  group_id: string | undefined
  participants: string[] | undefined

  constructor (message: Message) {
    this.accountEmail = message.accountEmail
    this.content = message.content
    this.is_outbound = message.is_outbound
    this.status = message.status
    this.error_code = message.error_code
    this.error_message = message.error_message
    this.message_handle = message.message_handle
    this.date_sent = message.date_sent
    this.date_updated = message.date_updated
    this.from_number = message.from_number
    this.number = message.number
    this.to_number = message.to_number
    this.was_downgraded = message.was_downgraded
    this.plan = message.plan
    this.media_url = message.media_url
    this.message_type = message.message_type
    this.group_id = message.group_id
    this.participants = message.participants
  }

  static from (data: Message): MessageImpl {
    return new MessageImpl(data)
  }
}
