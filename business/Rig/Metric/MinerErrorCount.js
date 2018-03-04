const AbstractMetric = require('../../../AbstractMetric');

module.exports = class MinerErrorCount extends AbstractMetric {
    constructor ({minerName, errorText, clients}) {
        super({
            name: 'minerErrorCount',
            labels: {
                minerName,
                errorText
            },
            clients
        });
    }
}
