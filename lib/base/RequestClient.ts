import { Agent, AgentOptions } from 'https'
import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios'

const DEFAULT_CONTENT_TYPE = 'application/json'
const DEFAULT_TIMEOUT = 30000

export interface RequestClientOptions {
  timeout?: number
  keepAlive?: boolean
  keepAliveMsecs?: number
  maxSockets?: number
  maxTotalSockets?: number
  maxFreeSockets?: number
  scheduling?: 'fifo' | 'lifo'
}

export interface RequestClientRequestOptions {
  logLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'
}

export class RequestClient {
  defaultTimeout: number = DEFAULT_TIMEOUT
  agentOpts: AgentOptions
  agent: Agent
  axios: AxiosInstance

  constructor (opts: RequestClientOptions, apiKey: string, apiSecret: string) {
    this.defaultTimeout = opts.timeout || DEFAULT_TIMEOUT

    this.agentOpts = {
      keepAlive: opts.keepAlive || false,
      keepAliveMsecs: opts.keepAliveMsecs || 1000,
      maxSockets: opts.maxSockets || 256,
      maxTotalSockets: opts.maxTotalSockets || 256,
      maxFreeSockets: opts.maxFreeSockets || 256,
      scheduling: opts.scheduling || 'fifo'
    }

    this.agent = new Agent(this.agentOpts)

    this.axios = axios.create({
      httpsAgent: this.agent
    })
    this.axios.defaults.headers.post['Content-Type'] = DEFAULT_CONTENT_TYPE
    this.axios.defaults.headers.post['sb-api-key-id'] = apiKey
    this.axios.defaults.headers.post['sb-api-secret-key'] = apiSecret
  }

  async request (opts: AxiosRequestConfig & RequestClientRequestOptions) {
    const options: AxiosRequestConfig = {
      method: opts.method,
      url: opts.url,
      headers: opts.headers,
      params: opts.params,
      data: opts.data,
      timeout: opts.timeout || this.defaultTimeout,
      maxRedirects: opts.maxRedirects ? 10 : 0,
      validateStatus: (status: number) => {
        return status >= 200 && status < 300
      }
    }

    if (opts.logLevel === 'debug') {
      this.logRequest(options)
    }

    try {
      const response = await this.axios.request(options)

      if (opts.logLevel === 'debug') {
        console.log(`response.statusCode: ${response.status}`)
        console.log(`response.headers: ${JSON.stringify(response.headers)}`)
      }

      return response.data
    } catch (err) {
      if ((err as any).response) {
        throw new Error((err as any).response.data)
      } else {
        throw new Error((err as any).message)
      }
    }
  }

  filterLoggingHeaders (headers: any) {
    return Object.keys(headers).filter(header => {
      return (
        !'authorization'.includes(header.toLowerCase()) &&
        !'sb-api-key-id'.includes(header.toLowerCase()) &&
        !'sb-api-secret-key'.includes(header.toLowerCase())
      )
    })
  }

  logRequest (options: AxiosRequestConfig) {
    console.log('-- BEGIN Sendblue API Request --')
    console.log(`${options.method} ${options.url}`)

    if (options.params) {
      console.log('Querystring:')
      console.log(options.params)
    }

    if (options.headers) {
      console.log('Headers:')
      const filteredHeaderKeys = this.filterLoggingHeaders(options.headers)
      filteredHeaderKeys.forEach(header =>
        console.log(`${header}: ${options.headers[header]}`)
      )
    }

    console.log('-- END Sendblue API Request --')
  }
}
