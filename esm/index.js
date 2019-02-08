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
  const {forced, value} = update.call(this, node, callback);
  const prev = container.get(node);
  if (forced || prev !== value) {
    container.set(node, value);
    appendClean(node, asNode(value, true));
  }
  return node;
}

// keyed render via render(node, () => html`...`)
// non keyed renders in the wild via html`...`
export const html = outer('html');
export const svg = outer('svg');

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
    let wire = null;
    const $ = new Tagger(type);
    return (ref[id] = function () {
      const result = $.apply(null, tta.apply(null, arguments));
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
  let ret = {forced: false, value: callback.call(this)};
  if (ret.value instanceof Hole) {
    ret.value = unroll(ret.value);
    const {i, length, stack} = current;
    if (i < length) {
      current.length = i;
      stack.splice(i);
    }
    if (current.update) {
      current.update = false;
      ret.forced = true;
    }
  }
  current = prev;
  return ret;
}

function unroll(hole) {
  const {i, length, stack} = current;
  const {type, args} = hole;
  const stacked = i < length;
  current.i++;
  unrollArray(args, 1);
  if (stacked) {
    const {tagger, tpl, kind, wire} = stack[i];
    if (type === kind && tpl === args[0]) {
      tagger.apply(null, args);
      return wire;
    }
  }
  const tagger = new Tagger(type);
  const info = {
    tagger,
    tpl: args[0],
    kind: type,
    wire: wiredContent(tagger.apply(null, args))
  };
  if (stacked)
    stack[i] = info;
  else
    current.length = stack.push(info);
  if (i < 1)
    current.update = true;
  return info.wire;
}

function unrollArray(arr, i) {
  for (const {length} = arr; i < length; i++) {
    const value = arr[i];
    if (value) {
      if (value instanceof Hole) {
        arr[i] = unroll(value);
      } else if (isArray(value)) {
        arr[i] = unrollArray(value, 0);
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

function Hole(type, args) {
  this.type = type;
  this.args = args;
}
