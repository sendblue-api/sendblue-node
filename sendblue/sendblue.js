export default class Sendblue {
    constructor(apiKey, apiSecret) {
        this.baseUrl = 'https://api.sendblue.co';
        this.headers = {
            'sb-api-key-id': apiKey,
            'sb-api-secret-key': apiSecret,
            'Content-Type': 'application/json',
        };
    }

    async request(method, endpoint, data = null) {
        const url = this.baseUrl + endpoint;
        const response = await fetch(url, {
            method: method.toUpperCase(),
            body: data ? JSON.stringify(data) : null,
            headers: this.headers
        });
        
        try {
            response.ok ? response.json() : Promise.reject(response);
        } catch (err) {
            const errorText = await response.text();
            console.error(err, errorText);
            throw err;
        }
    }

    async sendMessage(number, content, sendStyle = null, mediaUrl = null, statusCallback = null) {
        const data = {
            number,
            content,
            send_style: sendStyle,
            media_url: mediaUrl,
            status_callback: statusCallback
        };
        return this.request('post', '/api/send-message', data);
    }

    async sendGroupMessage(numbers, content, groupId = null, sendStyle = null, mediaUrl = null, statusCallback = null) {
        const data = {
            numbers,
            group_id: groupId,
            content,
            send_style: sendStyle,
            media_url: mediaUrl,
            status_callback: statusCallback
        };
        return this.request('post', '/api/send-group-message', data);
    }

    async getMessage(messageId) {
        return this.request('get', `/api/message/${messageId}`);
    }

    async modifyGroup(groupId, modifyType, number) {
        const data = {
            group_id: groupId,
            modify_type: modifyType,
            number
        };
        return this.request('post', '/modify-group', data);
    }

    async lookup(number) {
        return this.request('get', `/api/evaluate-service?number=${number}`);
    }

    async sendTypingIndicator(number) {
        const data = {
            number
        };
        return this.request('post', `/api/send-typing-indicator?number=${number}`, data);
    }

    async getContacts() {
        return this.request('get', '/accounts/contacts');
    }

    async createContact(number, firstName = null, lastName = null, companyName = null) {
        const data = {
            number,
            firstName,
            lastName,
            companyName
        };
        return this.request('post', '/accounts/contacts', data);
    }

    async deleteContact(contactId) {
        return this.request('delete', `/accounts/contacts/${contactId}`);
    }

    async getMessages(contactId) {
        return this.request('get', `/accounts/messages?cid=${contactId}`);
    }
}