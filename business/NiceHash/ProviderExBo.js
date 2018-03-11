const ProviderExFetcher = require('./ProviderExFetcher');
const AlgoBalance = require('./Metric/AlgoBalance');
const AlgoProfitability = require('./Metric/AlgoProfitability');
const AlgoSpeed = require('./Metric/AlgoSpeed');

module.exports = class ProviderExBo {
    constructor ({address}) {
        this.address = address;
        this.fetcher = new ProviderExFetcher({address});
    }

    async collectMetrics() {
        const metrics = [];
        const status = await this.fetcher.getStatus();
        
        if (status.result && status.result.current) {
            const currentResults = status.result.current;
            for (const algoResult of currentResults) {
                const algorithmId = algoResult.algo;
                const profitability = algoResult.profitability;

                if (typeof profitability !== 'undefined') {
                    metrics.push(new AlgoProfitability({
                        address: this.address,
                        algorithmId,
                        value: profitability
                    }));
                }

                if (algoResult.data) {
                    const algoResultData = algoResult.data;
                    const speeds = algoResultData[0];
                    const balance = algoResultData[1];

                    if (typeof balance !== 'undefined') {
                        metrics.push(new AlgoBalance({
                            address: this.address,
                            algorithmId,
                            value: balance
                        }));
                    }

                    if (speeds) {
                        for (const speedType of Object.keys(speeds)) {
                            metrics.push(new AlgoSpeed({
                                address: this.address,
                                algorithmId,
                                speedType,
                                value: speeds[speedType]
                            }));
                        }
                    }
                }
            }
        }
        return metrics;
    }
}
