const AbstractMetric = require('../../../AbstractMetric');

module.exports = class AlgoSpeed extends AbstractMetric {
    constructor ({address, algorithmId, speedType, clients, value}) {
        super({
            name: 'algoSpeed',
            labels: {
                address,
                algorithmId,
                speedType,
                uniqueName: `${address}_${algorithmId}_${speedType}_algoSpeed`
            },
            clients,
            value
        });
    }
}
