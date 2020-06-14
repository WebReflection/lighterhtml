'use strict';
const WeakMap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/weakmap'));
const domsanitizer = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('domsanitizer'));
const {isArray} = require('uarray');
const umap = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('umap'));
const {persistent} = require('uwire');

const {Tagger} = require('./tagger.js');

const {create, freeze, keys} = Object;

const tProto = Tagger.prototype;

const cache = umap(new WeakMap);

const createRender = Tagger => ({
  html: outer('html', Tagger),
  svg: outer('svg', Tagger),
  render(where, what) {
    const hole = typeof what === 'function' ? what() : what;
    const info = cache.get(where) || cache.set(where, createCache());
    const wire = hole instanceof LighterHole ?
                  unroll(Tagger, info, hole) : hole;
    if (wire !== info.wire) {
      info.wire = wire;
      where.textContent = '';
      where.appendChild(wire.valueOf());
    }
    return where;
  }
});

const createCache = () => ({stack: [], entry: null, wire: null});

const outer = (type, Tagger) => {
  const cache = umap(new WeakMap);
  const fixed = info => function () {
    return unroll(Tagger, info, hole.apply(null, arguments));
  };
  hole.for = (ref, id) => {
    const memo = cache.get(ref) || cache.set(ref, create(null));
    return memo[id] || (memo[id] = fixed(createCache()));
  };
  hole.node = function () {
    return unroll(
      Tagger,
      createCache(),
      hole.apply(null, arguments)
    ).valueOf();
  };
  return hole;
  function hole() {
    return new LighterHole(type, tta.apply(null, arguments));
  }
};

const unroll = (Tagger, info, {type, template, values}) => {
  const {length} = values;
  unrollValues(Tagger, info, values, length);
  let {entry} = info;
  if (!entry || (entry.template !== template || entry.type !== type)) {
    const tag = new Tagger(type);
    info.entry = (entry = {
      type,
      template,
      tag,
      wire: persistent(tag(template, ...values))
    });
  }
  else
    entry.tag(template, ...values);
  return entry.wire;
};

const unrollValues = (Tagger, {stack}, values, length) => {
  for (let i = 0; i < length; i++) {
    const hole = values[i];
    if (hole instanceof Hole)
      values[i] = unroll(
        Tagger,
        stack[i] || (stack[i] = createCache()),
        hole
      );
    else if (isArray(hole))
      unrollValues(
        Tagger,
        stack[i] || (stack[i] = createCache()),
        hole,
        hole.length
      );
    else
      stack[i] = null;
  }
  if (length < stack.length)
    stack.splice(length);
};

freeze(LighterHole);
function LighterHole(type, args) {
  this.type = type;
  this.template = args.shift();
  this.values = args;
};
const Hole = LighterHole;
exports.Hole = Hole;

const custom = overrides => {
  const prototype = create(tProto);
  keys(overrides).forEach(key => {
    prototype[key] = overrides[key](
      prototype[key] ||
      (key === 'convert' ? domsanitizer : String)
    );
  });
  CustomTagger.prototype = prototype;
  return createRender(CustomTagger);
  function CustomTagger() {
    return Tagger.apply(this, arguments);
  }
};
exports.custom = custom;

const {render, html, svg} = createRender(Tagger);
exports.render = render;
exports.html = html;
exports.svg = svg;

function tta() {
  let out = [], i = 0, {length} = arguments;
  while (i < length)
    out.push(arguments[i++]);
  return out;
}
