const schedule = require('node-schedule');

const RigMetricsBo = require('./business/Rig/RigMetricsBo');
const AppInsightsClient = require('./MetricClient/AppInsightsClient');
const Worker = require('./Worker');
const appInsightsCfg = require('./config/appInsightsCfg');
const rigCfg = require('./config/rigCfg');

const appInsightsClient = new AppInsightsClient(appInsightsCfg);

const rigs = rigCfg.map(rig => new RigMetricsBo({
    rigName: rig.name,
    host: rig.host,
    port: rig.port,
    metricClients: [
        appInsightsClient
    ]
}));
const worker = new Worker({rigs});
const job = schedule.scheduleJob('0 */10 * * * *', worker.work.bind(worker));

process.on('SIGINT', () => {
    job.cancel();
    console.log('Job cancelled. Exit gracefully');
});
