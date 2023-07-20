export default class Sendblue {
    constructor(apiKey, apiSecret) {
        this.baseUrl = 'https://api.sendblue.co/api';
        this.headers = {
            'sb-api-key-id': apiKey,
            'sb-api-secret-key': apiSecret,
            'Content-Type': 'application/json'
        };
    }

    async sendMessage(number, content, sendStyle, mediaUrl, statusCallback) {
        const data = {
            number: number,
            content: content,
            send_style: sendStyle,
            media_url: mediaUrl,
            status_callback: statusCallback
        };
        let response = await fetch(`${this.baseUrl}/send-message`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        });
        response = await response.json();
        if (!response.ok) {
            throw new Error(response.message)
        }
        return await response.json();
    }

    async sendGroupMessage(numbers, content, groupId, sendStyle, mediaUrl, statusCallback) {
        const data = {
            numbers: numbers,
            group_id: groupId,
            content: content,
            send_style: sendStyle,
            media_url: mediaUrl,
            status_callback: statusCallback
        };
        const response = await fetch(`${this.baseUrl}/send-group-message`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async modifyGroup(groupId, modifyType, number) {
        const data = {
            group_id: groupId,
            modify_type: modifyType,
            number: number
        };
        const response = await fetch(`${this.baseUrl}/modify-group`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async lookup(number) {
        const response = await fetch(`${this.baseUrl}/evaluate-service?number=${number}`, {
            headers: this.headers
        });
        return await response.json();
    }

    async sendTypingIndicator(number) {
        const data = {
            number: number
        };
        const response = await fetch(`${this.baseUrl}/send-typing-indicator?number=${number}`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}