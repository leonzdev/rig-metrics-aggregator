const fetch = require('node-fetch');

module.exports = class RigStatusFetcher {
    constructor({rigName, url}) {
        this.rigName = rigName;
        this.url = url;
    }

    async getStatus () {
        const response = await fetch(this.url);

        return await response.json();
    }
};
