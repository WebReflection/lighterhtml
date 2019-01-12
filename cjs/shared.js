'use strict';
const Wire = (m => m.__esModule ? m.default : m)(require('hyperhtml-wire'));

const {isArray} = Array;
const wireType = Wire.prototype.nodeType;

exports.Wire = Wire;
exports.isArray = isArray;
exports.wireType = wireType;
