module.exports = class Worker {
    constructor({rigs}) {
        this.rigs = rigs;
    }

    async work() {
        await Promise.all(this.rigs.map(rigBo => rigBo.collectAndSendMetrics()));
    }
}