"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTaskSchema = void 0;

var _zod = require("zod");

var createTaskSchema = _zod.z.object({
  title: _zod.z.string({
    required_error: 'Title is required'
  }),
  description: _zod.z.string({
    required_error: 'Description must be a string'
  }),
  date: _zod.z.string().regex(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/).optional()
});

exports.createTaskSchema = createTaskSchema;