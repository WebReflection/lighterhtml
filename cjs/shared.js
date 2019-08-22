'use strict';
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));
const Wire = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('hyperhtml-wire'));

const {isArray} = Array;
const wireType = Wire.prototype.nodeType;
const WS = typeof WeakSet === ('' + void 0) ?
  function () {
    const ws = new WeakMap;
    ws.add = add;
    return ws;
  } :
  WeakSet;

exports.Hole = Hole;
exports.Wire = Wire;
exports.WS = WS;
exports.isArray = isArray;
exports.wireType = wireType;

function add(key) {
  return this.set(key, true);
}

function Hole(type, args) {
  this.type = type;
  this.args = args;
}
