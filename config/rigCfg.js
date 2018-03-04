/*
* RIG_0_NAME
* RIG_0_HOST
* RIG_0_PORT
*/

const rigCfg = [];
const envs = Object.keys(process.env);
let i = 0;
let findNext = true;

while (findNext) {
    const rigNameVar = `RIG_${i}_NAME`;
    const rigHostVar = `RIG_${i}_HOST`;
    const rigPortVar = `RIG_${i}_PORT`;

    i += 1;

    if (process.env[rigHostVar]) {
        const rigHost = process.env[rigHostVar];
        const rigName = process.env[rigNameVar] ? process.env[rigNameVar] : rigHost;
        const rigPort = process.env[rigPortVar];

        rigCfg.push({
            name: rigName,
            host: rigHost,
            port: rigPort
        });
    } else {
        findNext = false;
    }
}

module.exports = rigCfg;