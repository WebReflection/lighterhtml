'use strict';
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));
const tta = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/template-tag-arguments'));
const {Wire, wireType, isArray} = require('./shared.js');
const Tagger = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('./tagger.js'));

const wm = new WeakMap;

let current = null;

// can be used with any useRef hook
// returns an `html` and `svg` function
const hook = useRef => ({
  html: createHook(useRef, html),
  svg: createHook(useRef, svg)
});
exports.hook = hook;

// generic content render
function render(node, callback) {
  const content = update.call(this, node, callback);
  if (content !== null)
    appendClean(node, content);
  return node;
}
exports.render = render

// keyed render via render(node, () => html`...`)
// non keyed renders in the wild via html`...`
const html = outer('html');
exports.html = html;
const svg = outer('svg');
exports.svg = svg;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function appendClean(node, fragment) {
  node.textContent = '';
  node.appendChild(fragment);
}

function asNode(result) {
  return result.nodeType === wireType ? result.valueOf(true) : result;
}

function createHook(useRef, view) {
  return function () {
    const ref = useRef(null);
    if (ref.current === null)
      ref.current = view.for(ref);
    return asNode(ref.current.apply(null, arguments));
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
    const ref = {};
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
  const result = callback.call(this);
  let ret = null;
  if (result instanceof Hole) {
    const value = unroll(result);
    const {i, length, stack} = current;
    if (i < length) {
      current.length = i;
      stack.splice(i);
    }
    if (current.update) {
      current.update = false;
      ret = asNode(value);
    }
  } else {
    ret = asNode(result);
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
