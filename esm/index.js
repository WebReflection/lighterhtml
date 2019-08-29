import WeakMap from '@ungap/weakmap';
import domsanitizer from 'domsanitizer';
import tta from '@ungap/template-tag-arguments';
import {Hole, Wire, wireType, isArray} from './shared.js';
import DefaultTagger from './tagger.js';

const {create, keys} = Object;
const wm = new WeakMap;
const container = new WeakMap;

const dtPrototype = DefaultTagger.prototype;

let current = null;

const lighterhtml = Tagger => {
  const html = outer('html', Tagger);
  const svg = outer('svg', Tagger);
  return {
    html, svg,
    hook: useRef => ({
      html: createHook(useRef, html),
      svg: createHook(useRef, svg)
    }),
    render(node, callback) {
      const value = update.call(this, node, callback, Tagger);
      if (container.get(node) !== value) {
        container.set(node, value);
        appendClean(node, value);
      }
      return node;
    }
  };
};

const custom = overrides => {
  const prototype = create(dtPrototype);
  keys(overrides).forEach(key => {
    // assign the method after passing along the previous one
    // `convert` exposes the original domsanitizer while
    // all other unknown methods, including `transform`,
    // fallbacks to generic String
    prototype[key] = overrides[key](
      prototype[key] ||
      (key === 'convert' ? domsanitizer : String)
    );
  });
  Tagger.prototype = prototype;
  return lighterhtml(Tagger);
  function Tagger() {
    return DefaultTagger.apply(this, arguments);
  }
};

const {html, svg, render, hook} = lighterhtml(DefaultTagger);

export {

  // keyed render via render(node, () => html`...`)
  // non keyed renders in the wild via html`...`
  html, svg,

  // generic content render: render(where, () => what)
  render,

  // can be used with any useRef hook
  // returns an `html` and `svg` function
  hook,

  // a way to define custom lighterhtml behaviors
  // const { html } = override({attribute: fn => (...args) => fn(...args)});
  custom,

  // exposed for third parts libraries
  Hole
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

function outer(type, Tagger) {
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
    const callback = () => tagger.apply(null, unrollArray(args, 1, 1, Tagger));
    return (ref[id] = function () {
      args = tta.apply(null, arguments);
      const result = update(tagger, callback, Tagger);
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

function update(reference, callback, Tagger) {
  const prev = current;
  current = wm.get(reference) || set(reference);
  current.i = 0;
  const ret = callback.call(this);
  let value;
  if (ret instanceof Hole) {
    value = asNode(unroll(ret, 0, Tagger), current.update);
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

function unroll(hole, level, Tagger) {
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
  unrollArray(args, 1, level + 1, Tagger);
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

function unrollArray(arr, i, level, Tagger) {
  for (const {length} = arr; i < length; i++) {
    const value = arr[i];
    if (typeof value === 'object' && value) {
      if (value instanceof Hole) {
        arr[i] = unroll(value, level - 1, Tagger);
      } else if (isArray(value)) {
        arr[i] = unrollArray(value, 0, level++, Tagger);
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
