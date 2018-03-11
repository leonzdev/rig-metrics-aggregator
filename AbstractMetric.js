module.exports = class AbstractMetric {
    constructor ({name, labels, clients, value}) {
        this.name = name;
        this.labels = labels ? labels : {};
        this.value = value;
        this.clients = [];
        if (clients) {
            if (!Array.isArray(clients)) {
                throw new Error('Invalid input: clients must be an array');
            }
            this.clients = clients;
        }
    }

    setLabel ({name, value}) {
        if (!name || !value) {
            throw new Error(`name=${name}, value=${value} cannot be null or undefined`);
        }
        this.labels.name = value;
    }

    setLabelsFromObject (labelsObject) {
        if (!labelsObject || typeof labelsObject !== 'object') {
            throw new Error('labelsObject has to be an object');
        }
        for (let key of Object.keys(labelsObject)) {
            this.setLabel({
                name: key,
                value: labelsObject[key]
            })
        }
    }

    setValue(value) {
        if (typeof value !== 'number') {
            throw new Error(`value=${value} is not a valid number.`);
        }
        this.value = value;
    }

    sendValue(value) {
        this.setValue(value);
        this.send();
    }

    setClients(clients) {
        this.clients = clients;
    }

    send () {
        this.sendWithClients(this.clients);
    }

    sendWithClients(clients) {
        for (let client of clients) {
            client.sendMetric({
                name: this.name,
                labels: this.labels,
                value: this.value
            });
        }
    }
}
