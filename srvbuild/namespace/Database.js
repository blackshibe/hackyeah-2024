"use strict";
exports.__esModule = true;
exports.Database = void 0;
var mysql_1 = require("mysql");
var connection = mysql_1.createConnection({
    host: "192.168.5.129",
    user: "user",
    password: "blank-password"
});
var Database;
(function (Database) {
    function connect() {
        connection.connect(function (err) {
            if (err) {
                console.error("error connecting: " + err.stack);
                return;
            }
            console.log("connected as id " + connection.threadId);
        });
    }
    Database.connect = connect;
})(Database = exports.Database || (exports.Database = {}));
//# sourceMappingURL=Database.js.map