const DEFAULT_SCHEDULE = '0 */10 * * * *';

module.exports = {
    scheduleString: process.env.SCHEDULE ? process.env.SCHEDULE : DEFAULT_SCHEDULE
};
