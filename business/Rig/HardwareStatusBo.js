const HardwareStatusFetcher = require('./HardwareStatusFetcher');
const GfxFanRpm = require('./Metric/GfxFanRpm');
const GfxTemperature = require('./Metric/GfxTemperature');

module.exports = class HardwareStatusBo {
    constructor ({rigName, host, port}) {
        this.rigName = rigName;
        this.fetcher = new HardwareStatusFetcher({host, port});
    }

    async collectMetrics() {
        const status = await this.fetcher.getStatus();
        // parse status
        const metrics = [];

        if (status) {
            const gpus = status.filter(s => s.HardwareType === 5);
            for (let gpu of gpus) {
                const gfxId = gpu.Identifier;
                if (gpu.sensors) {
                    const fanRpmSensor = gpu.sensors.find(s => s.SensorType === 4);
                    const temperatureSensor = gpu.sensors.find(s => s.SensorType === 2);

                    if (fanRpmSensor) {
                        const fanRpm = new GfxFanRpm({
                            minerName: this.rigName,
                            gfxId
                        });
                        fanRpm.setValue(fanRpmSensor.Value);
                        metrics.push(fanRpm);
                    }

                    if (temperatureSensor) {
                        const temperature = new GfxTemperature({
                            minerName: this.rigName,
                            gfxId
                        });
                        temperature.setValue(temperatureSensor.Value);
                        metrics.push(fanRpm);
                    }
                }
            }
        }
        return metrics;
    }
}