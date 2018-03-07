const AbstractMetric = require('../../../AbstractMetric');

module.exports = class GfxTemperature extends AbstractMetric {
    constructor ({minerName, gfxId, clients}) {
        super({
            name: 'gfxTemp',
            labels: {
                minerName,
                gfxId,
                uniqueName: `${minerName}_${gfxId}_gfxTemp`
            },
            clients
        });
    }
}
