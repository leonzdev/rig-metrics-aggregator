const RigStatusFetcher = require('./RigStatusFetcher');
const XmrstakStatusBo = require('./XmrstakStatusBo');
const HardwareStatusBo = require('./HardwareStatusBo');

module.exports = class RigMetricsBo {
    constructor({rigName, host, xmrstakPort, openhwPort, metricClients}) {
        if (!Array.isArray(metricClients)) {
            throw new Error('MetricClients has to be an array.');
        }
        _validateConstructorInputs({xmrstakPort, openhwPort});
        this.rigName = rigName;
        this.host = host;
        this.metricClients = metricClients;

        this.xmrstakBo = new XmrstakStatusBo({
            rigName, host, port: xmrstakPort
        });
        this.openhwBo = new HardwareStatusBo({
            rigName, host, port: openhwPort
        });
    }

    _validateConstructorInputs({xmrstakPort, openhwPort}) {
        if (!xmrstakPort) {
            throw new Error('xmrstakPort cannot be null or 0');
        }
        if (!openhwPort) {
            throw new Error('openhwPort cannot be null or 0');
        }
        if (xmrstakPort === openhwPort) {
            throw new Error(`xmrstakPort=${xmrstakPort} and openhwPort=${openhwPort} must be different`);
        }
    }

    async collectAndSendMetrics () {
        const metrics = [];
        // collect
        metrics.push(await this.xmrstakBo.collectMetrics());
        metrics.push(await this.openhwBo.collectMetrics());

        // send
        for (let metric of metrics) {
            metric.setClients(this.metricClients);
            metric.send();
        }
    }
};
