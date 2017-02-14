var crypto = require('crypto');

var MD5 = function(value) {
    var encryptedValue = null;

    try {
        var hash = crypto.createHash("md5");
        hash.update(value, "utf8");
        encryptedValue = hash.digest("hex");
    } catch(err) {
        console.log(err.message);
    }

    return encryptedValue;
};

module.exports = {
    MD5: MD5
};