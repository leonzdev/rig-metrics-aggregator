module.exports = class Worker {
    constructor({rigs}) {
        this.rigs = rigs;
    }

    async work() {
        try {
            await Promise.all(this.rigs.map(rigBo => rigBo.collectAndSendMetrics()));
        } catch (e) {
            console.error(e);
        }
    }
}