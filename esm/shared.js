import Wire from 'hyperhtml-wire';

const {isArray} = Array;
const wireType = Wire.prototype.nodeType;

Object.freeze(Hole);

export {
  Hole,
  Wire,
  isArray,
  wireType
};

function Hole(type, args) {
  this.type = type;
  this.args = args;
}
