const TelemetryClient = require("applicationinsights").TelemetryClient;
const AbstractMetricClient = require("./AbstractMetricClient");

module.exports = class AppInsightsClient extends AbstractMetricClient {
    constructor ({instrumentationKey}) {
        if (!instrumentationKey) {
            throw new Error('instrumentationKey required.');
        }
        super();
        this.instrumentationKey = instrumentationKey;
        this.client = new TelemetryClient(instrumentationKey);
    }

    sendMetric ({name, labels, value}) {
        const metric = {
            name,
            value,
            properties: labels
        };
        console.log(`Send AppInsights metric=${JSON.stringify(metric)}`);
        return this.client.trackMetric(metric);
    }
}
