const fetch = require('node-fetch');

module.exports = class XmrstakStatusFetcher {
    constructor({host, port}) {
        this.url = `http://${host}:${port}/api.json`;
    }

    async getStatus () {
        const response = await fetch(this.url);

        return await response.json();
    }
};
