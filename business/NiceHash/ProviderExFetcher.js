const cfg = require('./NiceHashCfg');
const fetch = require('node-fetch');

module.exports = class ProviderFetcher {
    constructor ({address}) {
        this.address = address;
    }

    async getStatus() {
        const fullUrl = `${cfg.baseUrl}?method=stats.provider.ex&addr=${this.address}`;
        const response = await fetch(fullUrl);

        return await response.json();
    }
}
