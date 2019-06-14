import WeakMap from '@ungap/weakmap';
import tta from '@ungap/template-tag-arguments';
import {Wire, wireType, isArray} from './shared.js';
import Tagger from './tagger.js';

const wm = new WeakMap;
const container = new WeakMap;

let current = null;

// can be used with any useRef hook
// returns an `html` and `svg` function
export const hook = useRef => ({
  html: createHook(useRef, html),
  svg: createHook(useRef, svg)
});

// generic content render
export function render(node, callback) {
  const value = update.call(this, node, callback);
  if (container.get(node) !== value) {
    container.set(node, value);
    appendClean(node, value);
  }
  return node;
}

// keyed render via render(node, () => html`...`)
// non keyed renders in the wild via html`...`
export const html = outer('html');
export const svg = outer('svg');

// an indirect exposure of a domtagger capability
// usable to transform once per template any layout
export const transform = callback => {
  const {transform} = Tagger.prototype;
  Tagger.prototype.transform = transform ?
    markup => callback(transform(markup)) :
    callback;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function appendClean(node, fragment) {
  node.textContent = '';
  node.appendChild(fragment);
}

function asNode(result, forceFragment) {
  return result.nodeType === wireType ?
    result.valueOf(forceFragment) :
    result;
}

function createHook(useRef, view) {
  return function () {
    const ref = useRef(null);
    if (ref.current === null)
      ref.current = view.for(ref);
    return asNode(ref.current.apply(null, arguments), false);
  };
}

function outer(type) {
  const wm = new WeakMap;
  tag.for = (identity, id) => {
    const ref = wm.get(identity) || set(identity);
    if (id == null)
      id = '$';
    return ref[id] || create(ref, id);
  };
  return tag;
  function create(ref, id) {
    let args = [];
    let wire = null;
    const tagger = new Tagger(type);
    const callback = () => tagger.apply(null, unrollArray(args, 1, 1));
    return (ref[id] = function () {
      args = tta.apply(null, arguments);
      const result = update(tagger, callback);
      return wire || (wire = wiredContent(result));
    });
  }
  function set(identity) {
    const ref = {'$': null};
    wm.set(identity, ref);
    return ref;
  }
  function tag() {
    const args = tta.apply(null, arguments);
    return current ?
      new Hole(type, args) :
      new Tagger(type).apply(null, args);
  }
}

function set(node) {
  const info = {
    i: 0, length: 0,
    stack: [],
    update: false
  };
  wm.set(node, info);
  return info;
}

function update(reference, callback) {
  const prev = current;
  current = wm.get(reference) || set(reference);
  current.i = 0;
  const ret = callback.call(this);
  let value;
  if (ret instanceof Hole) {
    value = asNode(unroll(ret, 0), current.update);
    const {i, length, stack, update} = current;
    if (i < length)
      stack.splice(current.length = i);
    if (update)
      current.update = false;
  } else {
    value = asNode(ret, false);
  }
  current = prev;
  return value;
}

function unroll(hole, level) {
  const {i, length, stack} = current;
  const {type, args} = hole;
  const stacked = i < length;
  current.i++;
  if (!stacked)
    current.length = stack.push({
      l: level,
      kind: type,
      tag: null,
      tpl: args[0],
      wire: null
    });
  unrollArray(args, 1, level + 1);
  const info = stack[i];
  if (stacked) {
    const {l:control, kind, tag, tpl, wire} = info;
    if (control === level && type === kind && tpl === args[0]) {
      tag.apply(null, args);
      return wire;
    }
  }
  const tag = new Tagger(type);
  const wire = wiredContent(tag.apply(null, args));
  info.l = level;
  info.kind = type;
  info.tag = tag;
  info.tpl = args[0];
  info.wire = wire;
  if (i < 1)
    current.update = true;
  return wire;
}

function unrollArray(arr, i, level) {
  for (const {length} = arr; i < length; i++) {
    const value = arr[i];
    if (typeof value === 'object' && value) {
      if (value instanceof Hole) {
        arr[i] = unroll(value, level - 1);
      } else if (isArray(value)) {
        arr[i] = unrollArray(value, 0, level++);
      }
    }
  }
  return arr;
}

function wiredContent(node) {
  const childNodes = node.childNodes;
  const {length} = childNodes;
  return length === 1 ?
    childNodes[0] :
    (length ? new Wire(childNodes) : node);
}

Object.freeze(Hole);
export function Hole(type, args) {
  this.type = type;
  this.args = args;
}
