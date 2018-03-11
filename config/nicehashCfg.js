/*
* NICEHASH_0_ADDRESS
*/

const cfg = [];
const envs = Object.keys(process.env);
let i = 0;
let findNext = true;

while (findNext) {
    const addressVar = `NICEHASH_${i}_ADDRESS`;

    i += 1;

    if (process.env[addressVar]) {
        cfg.push({
            address: process.env[addressVar]
        });
    } else {
        findNext = false;
    }
}

module.exports = cfg;
