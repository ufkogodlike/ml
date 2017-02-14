var db = require('../utils/db');
var encrypt = require('../utils/encrypt');

var authorize = function(un, pw, cb) {
    try {
        var tt = db.query(
            "SELECT id, username, password, nickname FROM `User` where username = ? ", [un],
            function(results) {

                if ( results && results.length == 1 ) {
                    var result = results[0];
                    var passwordDB = result["password"];
                    console.log("2. " + passwordDB);
                    if (pw == "" || !pw) {
                        return cb (null, false, "密码不能为空。");
                    }
                    console.log("3. " + encrypt.MD5(pw));
                    if (encrypt.MD5(pw) == passwordDB) {
                        return cb (null, result, "通过校验。");
                    } else {
                        return cb (null, false, "密码不正确。");
                    }

                } else {
                    return cb (null, false, "找不到该用户。");
                }
            }
        );

        console.log("4. " + tt);
    } catch(err) {
        console.log("User authorize failed.");
        return cb (false, "User authorize failed.", err);
    }
};

module.exports = {
    authorize: authorize
};