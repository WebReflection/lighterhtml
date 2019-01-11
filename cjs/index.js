'use strict';
const Wire = (m => m.__esModule ? m.default : m)(require('hyperhtml-wire'));
const tta = (m => m.__esModule ? m.default : m)(require('@ungap/template-tag-arguments'));

const Tagger = (m => m.__esModule ? m.default : m)(require('./tagger.js'));

const {isArray} = Array;

const wm = new WeakMap;

let current = null;

function render(node, callback) {
  const prev = current;
  current = wm.get(node) || set(node);

  // TODO: perf measurement about guarding this via try/catch/finally
  const result = callback();

  const template = result._[0];
  const diff = current.template !== template;
  if (diff && current.template)
    current.stack.splice(0);
  current.i = 0;
  const dom = unroll(result);
  if (diff) {
    current.template = template;
    node.textContent = '';
    node.appendChild(dom.valueOf(true));
  }
  current = prev;
  return node;
}
exports.render = render

const html = outer('html');
exports.html = html;
const svg = outer('svg');
exports.svg = svg;

function Template($, _) {
  this.$ = $;
  this._ = _;
}

function getWire(type, args) {
  const {i, stack} = current;
  current.i++;
  // TODO:  a conditional SVG instead of HTML will cause
  //        surely problems, even if extremely edge case.
  //        Remember to explain this is a current caveat.
  if (i === stack.length) {
    const tagger = new Tagger(type);
    const wire = wireContent(tagger.apply(null, args));
    stack.push({tagger, wire});
    return wire;
  } else {
    const {tagger, wire} = stack[i];
    tagger.apply(null, args);
    return wire;
  }
}

function outer(type) {
  return function () {
    const $ = tta.apply(null, arguments);
    return current ? new Template(type, $) : new Tagger(type).apply(null, $);
  };
}

function set(node) {
  const info = {i: 0, stack: [], template: null};
  wm.set(node, info);
  return info;
}

function unroll(template) {
  const {$, _} = template;
  const {length} = _;
  for (let i = 1; i < length; i++)
    unrollDeep(_[i], i, _);
  return getWire($, _);
}

function unrollDeep(value, i, array) {
  if (value) {
    if (value.constructor === Template)
      array[i] = unroll(value);
    else if (isArray(value))
      value.forEach(unrollDeep);
  }
}

function wireContent(node) {
  const childNodes = node.childNodes;
  const {length} = childNodes;
  return length === 1 ?
    childNodes[0] :
    (length ? new Wire(childNodes) : node);
}
