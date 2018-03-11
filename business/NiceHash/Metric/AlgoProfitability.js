const AbstractMetric = require('../../../AbstractMetric');

module.exports = class AlgoProfitability extends AbstractMetric {
    constructor ({address, algorithmId, clients, value}) {
        super({
            name: 'algoProfitability',
            labels: {
                address,
                algorithmId,
                uniqueName: `${address}_${algorithmId}_lgoProfitability`
            },
            clients,
            value
        });
    }
}
