import Wire from 'hyperhtml-wire';

const {isArray} = Array;
const {create, freeze, keys} = Object;
const wireType = Wire.prototype.nodeType;

export {
  Wire,
  create,
  freeze,
  isArray,
  keys,
  wireType
};
