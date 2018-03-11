const schedule = require('node-schedule');

const RigMetricsBo = require('./business/Rig/RigMetricsBo');
const NiceHashMetricsBo = require('./business/NiceHash/NiceHashMetricsBo');
const AppInsightsClient = require('./MetricClient/AppInsightsClient');
const Worker = require('./Worker');
const appInsightsCfg = require('./config/appInsightsCfg');
const rigCfg = require('./config/rigCfg');
const nicehashCfg = require('./config/nicehashCfg');

const appInsightsClient = new AppInsightsClient(appInsightsCfg);

const rigs = rigCfg.map(rig => new RigMetricsBo({
    rigName: rig.name,
    host: rig.host,
    xmrstakPort: rig.xmrstakPort,
    openhwPort: rig.openhwPort,
    metricClients: [
        appInsightsClient
    ]
}));
const nicehashes = nicehashCfg.map(nh => new NiceHashMetricsBo({
    address: nh.address,
    metricClients: [
        appInsightsClient
    ]
}));
const worker = new Worker({rigs, nicehashes});
const job = schedule.scheduleJob('0 */10 * * * *', worker.work.bind(worker));

process.on('SIGINT', () => {
    job.cancel();
    console.log('Job cancelled. Exit gracefully');
});
