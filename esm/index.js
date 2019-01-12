import tta from '@ungap/template-tag-arguments';
import {Wire, wireType, isArray} from './shared.js';
import Tagger from './tagger.js';

const wm = new WeakMap;
const templateType = 0;

let current = null;

export function render(node, callback) {
  const content = update(node, callback);
  if (content !== null)
    appendClean(node, content);
  return node;
}

export function update(reference, callback) {
  const prev = current;
  current = wm.get(reference) || set(reference);
  current.i = 0;

  // TODO: perf measurement about guarding this
  const result = callback();

  let ret = null;
  if (result.nodeType === templateType) {
    const template = result._[0];
    // TODO: perf measurement about guarding this
    const content = unroll(result);
    if (current.template !== template) {
      setTemplate(template);
      ret = asNode(content);
    }
  }
  else {
    setTemplate(null);
    ret = asNode(result);
  }

  current = prev;
  return ret;
}

export const html = outer('html');
export const svg = outer('svg');

function appendClean(node, fragment) {
  node.textContent = '';
  node.appendChild(fragment);
}

function asNode(result) {
  return result.nodeType === wireType ? result.valueOf(true) : result;
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

function setTemplate(template) {
  if (current.template)
    current.stack.splice(0);
  current.template = template;
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
    if (value.nodeType === 0)
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

function Template($, _) {
  this.$ = $;
  this._ = _;
}

const TP = Template.prototype;
TP.nodeType = templateType;
TP.valueOf = function () {
  return unroll(this);
};
