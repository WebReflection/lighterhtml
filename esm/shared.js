import WeakMap from '@ungap/weakmap';
import Wire from 'hyperhtml-wire';

const {isArray} = Array;
const wireType = Wire.prototype.nodeType;
const WS = typeof WeakSet === ('' + void 0) ?
  function () {
    const ws = new WeakMap;
    ws.add = add;
    return ws;
  } :
  WeakSet;

export {
  Hole,
  Wire,
  WS,
  isArray,
  wireType
};

function add(key) {
  return this.set(key, true);
}

function Hole(type, args) {
  this.type = type;
  this.args = args;
}
