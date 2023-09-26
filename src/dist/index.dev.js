"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _db = require("./db.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _db.connectDB)();

_app["default"].listen(4000);

console.log('Server on port', 4000);