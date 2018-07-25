const fetch = require('node-fetch');

const OPTS = {
    timeout: 10
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
