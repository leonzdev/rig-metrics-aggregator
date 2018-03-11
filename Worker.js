module.exports = class Worker {
    constructor({rigs, nicehashes}) {
        this.rigs = rigs;
        this.nicehashes = nicehashes;
    }

    async work() {
        try {
            await Promise.all(this.rigs.map(rigBo => rigBo.collectAndSendMetrics()));
            await Promise.all(this.nicehashes.map(nhBo => nhBo.collectAndSendMetrics()));
        } catch (e) {
            console.error(e);
        }
    }
}