const AbstractMetric = require('../../../AbstractMetric');

module.exports = class ThreadHashrate extends AbstractMetric {
    constructor ({minerName, threadId, clients}) {
        super({
            name: 'threadHashrate',
            labels: {
                minerName,
                threadId,
                uniqueName: `${minerName}_thread${threadId}`
            },
            clients
        });
    }
}
