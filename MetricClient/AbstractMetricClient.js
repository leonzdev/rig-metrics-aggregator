module.exports = class AbstractEmitter {
    sendMetric({name, labels, value}) {
        throw new Error('NotImplemented');
    }
}