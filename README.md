# Sendblue API

## Overview

This package is a node.js wrapper for the Sendblue API. It provides a simple interface for sending and receiving messages.

## Prerequisites

You will need to get API keys by signing up for a Sendblue account. You can do so [here](https://sendblue.co/).

## Installation

`npm i sendblue`

## Usage

### Initializing

```js
import Sendblue from 'sendblue-node'

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const SENDBLUE_API_KEY = process.env.SENDBLUE_API_KEY
const SENDBLUE_API_SECRET = process.env.SENDBLUE_API_SECRET

const sendblue = new Sendblue(SENDBLUE_API_KEY, SENDBLUE_API_SECRET)
```

### Send Message API Call

```js
;(async () => {
  const response = await sendblue.sendMessage({
    number: '+19998887777',
    content: 'Hello world!',
    send_style: 'invisible',
    media_url: 'https://source.unsplash.com/random.png',
    status_callback: 'https://example.com/message-status/1234abcd'
  })

  console.log(response)
})()
```

### Send Group Message API call

```js
;(async () => {
  const response = await sendblue.sendGroupMessage({
    numbers: ['+19998887777', '+19998887778'],
    content: 'Hello world!',
    send_style: 'invisible',
    media_url: 'https://source.unsplash.com/random.png',
    status_callback: 'https://example.com/message-status/1234abcd'
  })

  console.log(response)
})()
```

## Hint

You can get free api keys for testing & hobby purposes by emailing the team
