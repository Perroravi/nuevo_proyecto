"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validateToken = require("../middlewares/validateToken.js");

var _tasksController = require("../controllers/tasks.controller.js");

var _validatorMiddleware = require("../middlewares/validator.middleware.js");

var _taskChema = require("../schemas/task.chema.js");

var router = (0, _express.Router)();
router.get('/tasks', _validateToken.authRequired, _tasksController.getTasks);
router.get('/tasks/:id', _validateToken.authRequired, _tasksController.getTask);
router.post('/tasks', _validateToken.authRequired, (0, _validatorMiddleware.validateSchema)(_taskChema.createTaskSchema), _tasksController.createTask);
router["delete"]('/tasks/:id', _validateToken.authRequired, _tasksController.deleteTask);
router.put('/tasks/:id', _validateToken.authRequired, _tasksController.updateTask);
var _default = router;
exports["default"] = _default;