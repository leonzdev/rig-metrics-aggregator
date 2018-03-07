/*
* RIG_0_NAME
* RIG_0_HOST
* RIG_0_XMRSTAK_PORT
* RIG_0_OPENHW_PORT
*/

const rigCfg = [];
const envs = Object.keys(process.env);
let i = 0;
let findNext = true;

while (findNext) {
    const rigNameVar = `RIG_${i}_NAME`;
    const rigHostVar = `RIG_${i}_HOST`;
    const xmrstakPortVar = `RIG_${i}_XMRSTAK_PORT`;
    const openhwPortVar = `RIG_${i}_OPENHW_PORT`;

    i += 1;

    if (process.env[rigHostVar]) {
        const rigHost = process.env[rigHostVar];
        const rigName = process.env[rigNameVar] ? process.env[rigNameVar] : rigHost;
        const xmrstakPort = process.env[xmrstakPortVar];
        const openhwPort = process.env[openhwPortVar];

        rigCfg.push({
            name: rigName,
            host: rigHost,
            xmrstakPort,
            openhwPort 
        });
    } else {
        findNext = false;
    }
}

module.exports = rigCfg;