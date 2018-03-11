const AbstractMetric = require('../../../AbstractMetric');

module.exports = class AlgoBalance extends AbstractMetric {
    constructor ({address, algorithmId, clients, value}) {
        super({
            name: 'algoBalance',
            labels: {
                address,
                algorithmId,
                uniqueName: `${address}_${algorithmId}_algoBalance`
            },
            clients,
            value
        });
    }
}
