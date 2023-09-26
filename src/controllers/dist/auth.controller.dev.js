"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profile = exports.logout = exports.login = exports.register = void 0;

var _userModel = _interopRequireDefault(require("../models/user.model.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jwt = require("../libs/jwt.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var register = function register(req, res) {
  var _req$body, email, password, username, userFound, passwordHash, newUser, userSaved, token;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, username = _req$body.username;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          userFound = _context.sent;

          if (!userFound) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: ['the email is already in user']
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, 10));

        case 9:
          passwordHash = _context.sent;
          newUser = new _userModel["default"]({
            username: username,
            email: email,
            password: passwordHash
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(newUser.save());

        case 13:
          userSaved = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap((0, _jwt.createAccessToken)({
            id: userSaved._id
          }));

        case 16:
          token = _context.sent;
          res.cookie('token', token);
          res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
          });
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            message: _context.t0.message
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 21]]);
};

exports.register = register;

var login = function login(req, res) {
  var _req$body2, email, password, userFound, isMatch, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_userModel["default"].findOne({
            email: email
          }));

        case 4:
          userFound = _context2.sent;

          if (userFound) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "User not found"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(_bcryptjs["default"].compare(password, userFound.password));

        case 9:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Incorrect password"
          }));

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap((0, _jwt.createAccessToken)({
            id: userFound._id
          }));

        case 14:
          token = _context2.sent;
          res.cookie('token', token);
          res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
          });
          _context2.next = 22;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 19]]);
};

exports.login = login;

var logout = function logout(req, res) {
  res.cookie('token', "", {
    expires: new Date(0)
  });
  return res.sendStatus(200);
};

exports.logout = logout;

var profile = function profile(req, res) {
  var userFound;
  return regeneratorRuntime.async(function profile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.user.id));

        case 2:
          userFound = _context3.sent;

          if (userFound) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'User not found'
          }));

        case 5:
          return _context3.abrupt("return", res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
          }));

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.profile = profile;