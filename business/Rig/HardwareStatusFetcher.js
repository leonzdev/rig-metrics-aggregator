const fetch = require('node-fetch');

module.exports = class HardwareStatusFetcher {
    constructor({host, port}) {
        this.url = `http://${host}:${port}`;
    }

    async getStatus () {
        const response = await fetch(this.url);

        return await response.json();
    }
};
