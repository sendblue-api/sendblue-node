# Sendblue Node.js Library

> [!WARNING]
> This repository has been deprecated in favor of [sendblue-ts](https://github.com/sendblue-api/sendblue-ts)
>
> npm package here: https://www.npmjs.com/package/sendblue

## Overview

This package is a Node.js wrapper for the Sendblue API. It provides a simple interface for sending and receiving messages.

## Prerequisites

You will need to get API keys by signing up for a Sendblue account. You can do so [here](https://sendblue.co/).

## Installation

```bash
npm install sendblue
```

## Usage

### Initializing

```js
import Sendblue from sendblue;

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
SENDBLUE_API_KEY = process.env.SENDBLUE_API_KEY
SENDBLUE_API_SECRET = process.env.SENDBLUE_API_SECRET

sendblue = new Sendblue(SENDBLUE_API_KEY, SENDBLUE_API_SECRET)
```

### Send Message

```js
const response = await sendblue.sendMessage('+19998887777', 'Hello from Sendblue!', 'invisible', 'https://source.unsplash.com/random.png', 'https://example.com/callback');
```

### Send Group Message

```js
const response = await sendblue.sendGroupMessage(['+19998887777', '+19998887778'], 'Hello from Sendblue!', 'invisible', 'https://source.unsplash.com/random.png', 'https://example.com/callback');
```

### Get Message

```js
const response = await sendblue.getMessage('messageId');
```

### Modify Group

```js
const response = await sendblue.modifyGroup('groupId', 'add_recipient', '+19998887777');
```

### Lookup Number

```js
const response = await sendblue.lookup('+19998887777');
```

### Send Typing Indicator

```js
const response = await sendblue.sendTypingIndicator('+19998887777');
```

### Get Contacts

```js
const response = await sendblue.getContacts();
```

### Create Contact

```js
const response = await sendblue.createContact('+19998887777', 'First Name', 'Last Name', 'Company Name');
```

### Delete Contact

```js
const response = await sendblue.deleteContact('contactId');
```

### Get Messages

```js
const response = await sendblue.getMessages('contactId');
```
