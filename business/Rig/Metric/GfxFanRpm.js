const AbstractMetric = require('../../../AbstractMetric');

module.exports = class GfxFanRpm extends AbstractMetric {
    constructor ({minerName, gfxId, clients}) {
        super({
            name: 'gfxFanRpm',
            labels: {
                minerName,
                gfxId,
                uniqueName: `${minerName}_${gfxId}_gfxFanRpm`
            },
            clients
        });
    }
}
