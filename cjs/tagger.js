'use strict';
const createContent = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@ungap/create-content'));
const udomdiff = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('udomdiff'));
const domtagger = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('domtagger'));
const hyperStyle = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('hyperhtml-style'));
const {aria, attribute, data, event, ref, setter} = require('uhandlers');
const {diffable} = require('uwire');

const {isArray, slice} = require('uarray');

// special attributes helpers
const hyperProperty = (node, name) => {
  let oldValue;
  return newValue => {
    if (oldValue !== newValue) {
      oldValue = newValue;
      if (node[name] !== newValue) {
        if (newValue == null) {
          // cleanup before dropping the attribute to fix IE/Edge gotcha
          node[name] = '';
          node.removeAttribute(name);
        } else
          node[name] = newValue;
      }
    }
  };
};

// list of attributes that should not be directly assigned
const readOnly = /^(?:form|list)$/i;

// simplifies text node creation
const text = (node, text) => node.ownerDocument.createTextNode(text);

function Tagger(type) {
  this.type = type;
  return domtagger(this);
}
exports.Tagger = Tagger;

Tagger.prototype = {

  // there are four kind of attributes, and related behavior:
  //  * events, with a name starting with `on`, to add/remove event listeners
  //  * special, with a name present in their inherited prototype, accessed directly
  //  * regular, accessed through get/setAttribute standard DOM methods
  //  * style, the only regular attribute that also accepts an object as value
  //    so that you can style=${{width: 120}}. In this case, the behavior has been
  //    fully inspired by Preact library and its simplicity.
  attribute(node, name, original) {
    const isSVG = this.type === 'svg';
    switch (name) {
      case 'class':
        if (isSVG)
          return attribute(node, name, isSVG);
        name = 'className';
      case 'props':
        return setter(node, name);
      case 'aria':
        return aria(node);
      case 'style':
        return hyperStyle(node, original, isSVG);
      case 'ref':
        return ref(node);
      case '.dataset':
        return data(node);
      default:
        if (name.slice(0, 1) === '.')
          return setter(node, name.slice(1));
        if (name.slice(0, 2) === 'on')
          return event(node, name);
        if (name in node && !(isSVG || readOnly.test(name)))
          return hyperProperty(node, name);
        return attribute(node, name, isSVG);

    }
  },

  // in a hyper(node)`<div>${content}</div>` case
  // everything could happen:
  //  * it's a JS primitive, stored as text
  //  * it's null or undefined, the node should be cleaned
  //  * it's a promise, update the content once resolved
  //  * it's an explicit intent, perform the desired operation
  //  * it's an Array, resolve all values if Promises and/or
  //    update the node with the resulting list of content
  any(node, childNodes) {
    const {type} = this;
    let fastPath = false;
    let oldValue;
    const anyContent = value => {
      switch (typeof value) {
        case 'string':
        case 'number':
        case 'boolean':
          if (fastPath) {
            if (oldValue !== value) {
              oldValue = value;
              childNodes[0].textContent = value;
            }
          } else {
            fastPath = true;
            oldValue = value;
            childNodes = udomdiff(
              node.parentNode,
              childNodes,
              [text(node, value)],
              diffable,
              node
            );
          }
          break;
        case 'function':
          anyContent(value(node));
          break;
        case 'object':
        case 'undefined':
          if (value == null) {
            fastPath = false;
            childNodes = udomdiff(
              node.parentNode,
              childNodes,
              [],
              diffable,
              node
            );
            break;
          }
        default:
          fastPath = false;
          oldValue = value;
          if (isArray(value)) {
            if (value.length === 0) {
              if (childNodes.length) {
                childNodes = udomdiff(
                  node.parentNode,
                  childNodes,
                  [],
                  diffable,
                  node
                );
              }
            } else {
              switch (typeof value[0]) {
                case 'string':
                case 'number':
                case 'boolean':
                  anyContent(String(value));
                  break;
                case 'function':
                  anyContent(value.map(invoke, node));
                  break;
                case 'object':
                  if (isArray(value[0])) {
                    value = value.concat.apply([], value);
                  }
                default:
                  childNodes = udomdiff(
                    node.parentNode,
                    childNodes,
                    value,
                    diffable,
                    node
                  );
                  break;
              }
            }
          } else if ('ELEMENT_NODE' in value) {
            childNodes = udomdiff(
              node.parentNode,
              childNodes,
              value.nodeType === 11 ?
                slice.call(value.childNodes) :
                [value],
                diffable,
                node
            );
          } else if ('text' in value) {
            anyContent(String(value.text));
          } else if ('any' in value) {
            anyContent(value.any);
          } else if ('html' in value) {
            childNodes = udomdiff(
              node.parentNode,
              childNodes,
              slice.call(
                createContent(
                  [].concat(value.html).join(''),
                  type
                ).childNodes
              ),
              diffable,
              node
            );
          } else if ('length' in value) {
            anyContent(slice.call(value));
          }
          break;
      }
    };
    return anyContent;
  },

  // style or textareas don't accept HTML as content
  // it's pointless to transform or analyze anything
  // different from text there but it's worth checking
  // for possible defined intents.
  text(node) {
    let oldValue;
    const textContent = value => {
      if (oldValue !== value) {
        oldValue = value;
        const type = typeof value;
        if (type === 'object' && value) {
          if ('text' in value) {
            textContent(String(value.text));
          } else if ('any' in value) {
            textContent(value.any);
          } else if ('html' in value) {
            textContent([].concat(value.html).join(''));
          } else if ('length' in value) {
            textContent(slice.call(value).join(''));
          }
        } else if (type === 'function') {
          textContent(value(node));
        } else {
          node.textContent = value == null ? '' : value;
        }
      }
    };
    return textContent;
  }
};

function invoke(callback) {
  return callback(this);
}
