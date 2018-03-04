const RigStatusFetcher = require('./RigStatusFetcher');
const ThreadHashrate = require('./Metric/ThreadHashrate');
const MinerErrorCount = require('./Metric/MinerErrorCount');

const API_JSON_PATH = 'api.json';
const DEFAULT_RIG_STATUS_PORT = 80;

module.exports = class RigMetricsBo {
    constructor({rigName, host, port, metricClients}) {
        if (!Array.isArray(metricClients)) {
            throw new Error('MetricClients has to be an array.');
        }
        this.rigName = rigName;
        this.host = host;
        this.port = port ? port : DEFAULT_RIG_STATUS_PORT;
        this.metricClients = metricClients;
        this.rigStatus = undefined;

        this.rigStatusFetcher = new RigStatusFetcher({
            rigName: this.rigName,
            url: `http://${host}:${port}/${API_JSON_PATH}`
        });
    }

    async collectAndSendMetrics () {
        const rigStatus = await this.rigStatusFetcher.getStatus();
        if (rigStatus) {
            if (rigStatus.hashrate && rigStatus.hashrate.threads) {
                const threadHashrates = rigStatus.hashrate.threads;
                for (let i = 0; i < threadHashrates.length; i++) {
                    const threadHashrateGauge = new ThreadHashrate({
                        minerName: this.rigName,
                        threadId: i,
                        clients: this.metricClients
                    });
                    threadHashrateGauge.sendValue(threadHashrates[i][0]);
                }
            }

            if (rigStatus.results) {
                if (rigStatus.results.error_log) {
                    for (let error of rigStatus.results.error_log) {
                        const errorCounter = new MinerErrorCount({
                            minerName: this.rigName,
                            errorText: error.text,
                            clients: this.metricClients
                        });
                        errorCounter.sendValue(error.count);
                    }
                }
            }
        }
    }
};
