const ProviderExFetcher = require('./ProviderExFetcher');
const AlgoBalance = require('./Metric/AlgoBalance');
const AlgoProfitability = require('./Metric/AlgoProfitability');
const AlgoSpeed = require('./Metric/AlgoSpeed');
const SPEED_AMP = {
    'KH': 1000,
    'MH': 1000 * 1000,
    'GH': 1000 * 1000 * 1000
};
const DEFAULT_SPEED_AMP = 1000;
const BALANCE_AMP = 100000000; // Satoshi

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
                const speedSuffix = algoResult.suffix;
                const speedAmp = SPEED_AMP[speedSuffix] ? SPEED_AMP[speedSuffix] : DEFAULT_SPEED_AMP;

                if (typeof profitability !== 'undefined') {
                    metrics.push(new AlgoProfitability({
                        address: this.address,
                        algorithmId,
                        value: parseFloat(profitability) * BALANCE_AMP
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
                            value: parseFloat(balance) * BALANCE_AMP
                        }));
                    }

                    if (speeds) {
                        for (const speedType of Object.keys(speeds)) {
                            metrics.push(new AlgoSpeed({
                                address: this.address,
                                algorithmId,
                                speedType,
                                value: parseFloat(speeds[speedType]) * speedAmp
                            }));
                        }
                    }
                }
            }
        }
        return metrics;
    }
}
