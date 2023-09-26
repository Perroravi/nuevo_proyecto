"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));

var _tasksRoutes = _interopRequireDefault(require("./routes/tasks.routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: 'http://localhost:5173'
}));
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
app.use("/api", _authRoutes["default"]);
app.use("/api", _tasksRoutes["default"]);
var _default = app;
exports["default"] = _default;