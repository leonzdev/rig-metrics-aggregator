const fetch = require('node-fetch');

const OPTS = {
    timeout: 30
};

module.exports = class HardwareStatusFetcher {
    constructor({host, port}) {
        this.url = `http://${host}:${port}`;
    }

    async getStatus () {
        const response = await fetch(this.url, OPTS);

        return await response.json();
    }
};
