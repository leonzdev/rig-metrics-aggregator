const XmrstakStatusBo = require('./XmrstakStatusBo');
const HardwareStatusBo = require('./HardwareStatusBo');

module.exports = class RigMetricsBo {
    constructor({rigName, host, xmrstakPort, openhwPort, metricClients}) {
        if (!Array.isArray(metricClients)) {
            throw new Error('MetricClients has to be an array.');
        }
        RigMetricsBo._validateConstructorInputs({xmrstakPort, openhwPort});
        this.rigName = rigName;
        this.host = host;
        this.metricClients = metricClients;

        if (xmrstakPort) {
            this.xmrstakBo = new XmrstakStatusBo({
                rigName, host, port: xmrstakPort
            });
        }

        if (openhwPort) {
            this.openhwBo = new HardwareStatusBo({
                rigName, host, port: openhwPort
            });
        }
    }

    static _validateConstructorInputs({xmrstakPort, openhwPort}) {
        if (xmrstakPort === openhwPort) {
            throw new Error(`xmrstakPort=${xmrstakPort} and openhwPort=${openhwPort} must be different`);
        }
    }

    async collectAndSendMetrics () {
        const metrics = [];
        // collect
        if (this.xmrstakBo) {
            metrics.push(...await this.xmrstakBo.collectMetrics());
        }
        if (this.openhwBo) {
            metrics.push(...await this.openhwBo.collectMetrics());
        }

        // send
        for (let metric of metrics) {
            metric.setClients(this.metricClients);
            metric.send();
        }
    }
};
