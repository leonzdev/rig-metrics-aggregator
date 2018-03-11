const ProviderExBo = require('./ProviderExBo');

module.exports = class NiceHashMetricsBo {
    constructor ({address, metricClients}) {
        NiceHashMetricsBo._validateConstructorInputs({address, metricClients});
        this.providerExBo = new ProviderExBo({address});
        this.metricClients = metricClients;
    }

    static _validateConstructorInputs({address, metricClients}) {
        if (!address) {
            throw new Error('address cannot be null');
        }
        if (!Array.isArray(metricClients)) {
            throw new Error(`metricClients=${metricClients} must be an array`);
        }
    }

    async collectAndSendMetrics () {
        const metrics = [];
        // collect
        if (this.providerExBo) {
            metrics.push(...await this.providerExBo.collectMetrics());
        }

        // send
        for (let metric of metrics) {
            metric.setClients(this.metricClients);
            metric.send();
        }
    }
}