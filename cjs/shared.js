'use strict';
const Wire = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('hyperhtml-wire'));

const {isArray} = Array;
const wireType = Wire.prototype.nodeType;

exports.Wire = Wire;
exports.isArray = isArray;
exports.wireType = wireType;
