const XmrstakStatusFetch = require('./XmrstakStatusFetcher');
const ThreadHashrate = require('./Metric/ThreadHashrate');
const MinerErrorCount = require('./Metric/MinerErrorCount');

module.exports = class XmrstakStatusBo {
    constructor ({rigName, host, port}) {
        this.rigName = rigName;
        this.fetcher = new XmrstakStatusFetch({host, port});
    }

    async collectMetrics () {
        const status = await this.fetcher.getStatus();
        const metrics = [];

        if (status) {
            if (status.hashrate && status.hashrate.threads) {
                const threadHashrates = status.hashrate.threads;
                for (let i = 0; i < threadHashrates.length; i++) {
                    const threadHashrateGauge = new ThreadHashrate({
                        minerName: this.rigName,
                        threadId: i
                    });
                    threadHashrateGauge.setValue(threadHashrates[i][0]);
                    metrics.push(threadHashrateGauge);
                }
            }

            if (status.results) {
                if (rigStatus.results.error_log) {
                    for (let error of status.results.error_log) {
                        const errorCounter = new MinerErrorCount({
                            minerName: this.rigName,
                            errorText: error.text
                        });
                        errorCounter.setValue(error.count);
                        metrics.push(errorCounter);
                    }
                }
            }
        }
        return metrics;
    }
}