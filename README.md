# Sendblue Node.js Library

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

```javascript
import Sendblue from sendblue

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
SENDBLUE_API_KEY = process.env.SENDBLUE_API_KEY;
SENDBLUE_API_SECRET = process.env.SENDBLUE_API_SECRET;

sendblue = new Sendblue(SENDBLUE_API_KEY, SENDBLUE_API_SECRET)
```

### Send Message

```javascript
const response = sendblue.sendMessage('+19998887777', 'Hello from Sendblue!', sendStyle='invisible', mediaUrl='https://source.unsplash.com/random.png', statusCallback='https://example.com/callback')
```

### Send Group Message

```javascript
const response = sendblue.sendGroupMessage(['+19998887777', '+19998887778'], 'Hello from Sendblue!', sendStyle='invisible', mediaUrl='https://source.unsplash.com/random.png', statusCallback='https://example.com/callback')
```

### Modify Group

```javascript
const response = sendblue.modifyGroup('group_id', 'add_recipient', '+19998887777')
```

### Lookup Number

```javascript
const response = sendblue.lookup('+19998887777')
```

### Send Typing Indicator

```javascript
const response = sendblue.sendTypingIndicator('+19998887777')
```