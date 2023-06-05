const crypto = require('crypto');

async function getData() {
    return crypto.randomBytes(20);
}

getData();

module.exports = {
    getData,
}
