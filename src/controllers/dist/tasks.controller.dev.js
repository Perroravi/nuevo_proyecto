"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTask = exports.deleteTask = exports.getTask = exports.createTask = exports.getTasks = void 0;

var _taskModel = _interopRequireDefault(require("../models/task.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getTasks = function getTasks(req, res) {
  var tasks;
  return regeneratorRuntime.async(function getTasks$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_taskModel["default"].find({
            user: req.user.id
          }).populate('user'));

        case 2:
          tasks = _context.sent;
          res.json(tasks);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getTasks = getTasks;

var createTask = function createTask(req, res) {
  var _req$body, title, description, date, newTask, savedTask;

  return regeneratorRuntime.async(function createTask$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, description = _req$body.description, date = _req$body.date;
          newTask = new _taskModel["default"]({
            title: title,
            description: description,
            date: date,
            user: req.user.id
          });
          _context2.next = 4;
          return regeneratorRuntime.awrap(newTask.save());

        case 4:
          savedTask = _context2.sent;
          res.json(savedTask);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.createTask = createTask;

var getTask = function getTask(req, res) {
  var task;
  return regeneratorRuntime.async(function getTask$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_taskModel["default"].findById(req.params.id).populate('user'));

        case 2:
          task = _context3.sent;

          if (task) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Task not found'
          }));

        case 5:
          res.json(task);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getTask = getTask;

var deleteTask = function deleteTask(req, res) {
  var task;
  return regeneratorRuntime.async(function deleteTask$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_taskModel["default"].findByIdAndDelete(req.params.id));

        case 2:
          task = _context4.sent;

          if (task) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Task not found'
          }));

        case 5:
          return _context4.abrupt("return", res.sendStatus(204));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteTask = deleteTask;

var updateTask = function updateTask(req, res) {
  var task;
  return regeneratorRuntime.async(function updateTask$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_taskModel["default"].findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 2:
          task = _context5.sent;

          if (task) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Task not found'
          }));

        case 5:
          res.json(task);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.updateTask = updateTask;