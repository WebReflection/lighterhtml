'use strict';
const Wire = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('hyperhtml-wire'));

const {isArray} = Array;
const {create, freeze, keys} = Object;
const wireType = Wire.prototype.nodeType;

exports.Wire = Wire;
exports.create = create;
exports.freeze = freeze;
exports.isArray = isArray;
exports.keys = keys;
exports.wireType = wireType;
