var lighterhtml = (function (document,exports) {
  'use strict';

  

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /*! (c) Andrea Giammarchi - ISC */
  var self = {};

  try {
    self.WeakMap = WeakMap;
  } catch (WeakMap) {
    // this could be better but 90% of the time
    // it's everything developers need as fallback
    self.WeakMap = function (id, Object) {

      var dP = Object.defineProperty;
      var hOP = Object.hasOwnProperty;
      var proto = WeakMap.prototype;

      proto["delete"] = function (key) {
        return this.has(key) && delete key[this._];
      };

      proto.get = function (key) {
        return this.has(key) ? key[this._] : void 0;
      };

      proto.has = function (key) {
        return hOP.call(key, this._);
      };

      proto.set = function (key, value) {
        dP(key, this._, {
          configurable: true,
          value: value
        });
        return this;
      };

      return WeakMap;

      function WeakMap(iterable) {
        dP(this, '_', {
          value: '_@ungap/weakmap' + id++
        });
        if (iterable) iterable.forEach(add, this);
      }

      function add(pair) {
        this.set(pair[0], pair[1]);
      }
    }(Math.random(), Object);
  }

  var WeakMap$1 = self.WeakMap;

  /*! (c) Andrea Giammarchi - ISC */
  // Custom
  var UID = '-' + Math.random().toFixed(6) + '%'; //                           Edge issue!

  var UID_IE = false;

  try {
    if (!function (template, content, tabindex) {
      return content in template && (template.innerHTML = '<p ' + tabindex + '="' + UID + '"></p>', template[content].childNodes[0].getAttribute(tabindex) == UID);
    }(document.createElement('template'), 'content', 'tabindex')) {
      UID = '_dt: ' + UID.slice(1, -1) + ';';
      UID_IE = true;
    }
  } catch (meh) {}

  var UIDC = '<!--' + UID + '-->'; // DOM

  var COMMENT_NODE = 8;
  var ELEMENT_NODE = 1;
  var TEXT_NODE = 3;
  var SHOULD_USE_TEXT_CONTENT = /^(?:style|textarea)$/i;
  var VOID_ELEMENTS = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;

  /*! (c) Andrea Giammarchi - ISC */
  function domsanitizer (template) {
    return template.join(UIDC).replace(selfClosing, fullClosing).replace(attrSeeker, attrReplacer);
  }
  var spaces = ' \\f\\n\\r\\t';
  var almostEverything = '[^' + spaces + '\\/>"\'=]+';
  var attrName = '[' + spaces + ']+' + almostEverything;
  var tagName = '<([A-Za-z]+[A-Za-z0-9:._-]*)((?:';
  var attrPartials = '(?:\\s*=\\s*(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything.replace('\\/', '') + '))?)';
  var attrSeeker = new RegExp(tagName + attrName + attrPartials + '+)([' + spaces + ']*/?>)', 'g');
  var selfClosing = new RegExp(tagName + attrName + attrPartials + '*)([' + spaces + ']*/>)', 'g');
  var findAttributes = new RegExp('(' + attrName + '\\s*=\\s*)([\'"]?)' + UIDC + '\\2', 'gi');

  function attrReplacer($0, $1, $2, $3) {
    return '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
  }

  function replaceAttributes($0, $1, $2) {
    return $1 + ($2 || '"') + UID + ($2 || '"');
  }

  function fullClosing($0, $1, $2) {
    return VOID_ELEMENTS.test($1) ? $0 : '<' + $1 + $2 + '></' + $1 + '>';
  }

  var isArray = Array.isArray;
  var _ref = [],
      slice = _ref.slice;

  var umap = (function (_) {
    return {
      // About: get: _.get.bind(_)
      // It looks like WebKit/Safari didn't optimize bind at all,
      // so that using bind slows it down by 60%.
      // Firefox and Chrome are just fine in both cases,
      // so let's use the approach that works fast everywhere 👍
      get: function get(key) {
        return _.get(key);
      },
      set: function set(key, value) {
        return _.set(key, value), value;
      }
    };
  });

  var ELEMENT_NODE$1 = 1;
  var nodeType = 111;

  var remove = function remove(_ref) {
    var firstChild = _ref.firstChild,
        lastChild = _ref.lastChild;
    var range = document.createRange();
    range.setStartAfter(firstChild);
    range.setEndAfter(lastChild);
    range.deleteContents();
    return firstChild;
  };

  var diffable = function diffable(node, operation) {
    return node.nodeType === nodeType ? 1 / operation < 0 ? operation ? remove(node) : node.lastChild : operation ? node.valueOf() : node.firstChild : node;
  };
  var persistent = function persistent(fragment) {
    var childNodes = fragment.childNodes;
    var length = childNodes.length;
    if (length < 2) return length ? childNodes[0] : fragment;
    var nodes = slice.call(childNodes, 0);
    var firstChild = nodes[0];
    var lastChild = nodes[length - 1];
    return {
      ELEMENT_NODE: ELEMENT_NODE$1,
      nodeType: nodeType,
      firstChild: firstChild,
      lastChild: lastChild,
      valueOf: function valueOf() {
        if (childNodes.length !== length) {
          var i = 0;

          while (i < length) {
            fragment.appendChild(nodes[i++]);
          }
        }

        return fragment;
      }
    };
  };

  /*! (c) Andrea Giammarchi - ISC */
  var createContent = function (document) {

    var FRAGMENT = 'fragment';
    var TEMPLATE = 'template';
    var HAS_CONTENT = ('content' in create(TEMPLATE));
    var createHTML = HAS_CONTENT ? function (html) {
      var template = create(TEMPLATE);
      template.innerHTML = html;
      return template.content;
    } : function (html) {
      var content = create(FRAGMENT);
      var template = create(TEMPLATE);
      var childNodes = null;

      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
        var selector = RegExp.$1;
        template.innerHTML = '<table>' + html + '</table>';
        childNodes = template.querySelectorAll(selector);
      } else {
        template.innerHTML = html;
        childNodes = template.childNodes;
      }

      append(content, childNodes);
      return content;
    };
    return function createContent(markup, type) {
      return (type === 'svg' ? createSVG : createHTML)(markup);
    };

    function append(root, childNodes) {
      var length = childNodes.length;

      while (length--) {
        root.appendChild(childNodes[0]);
      }
    }

    function create(element) {
      return element === FRAGMENT ? document.createDocumentFragment() : document.createElementNS('http://www.w3.org/1999/xhtml', element);
    } // it could use createElementNS when hasNode is there
    // but this fallback is equally fast and easier to maintain
    // it is also battle tested already in all IE


    function createSVG(svg) {
      var content = create(FRAGMENT);
      var template = create('div');
      template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
      append(content, template.firstChild.childNodes);
      return content;
    }
  }(document);

  /**
   * ISC License
   *
   * Copyright (c) 2020, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */

  /**
   * @param {Node} parentNode The container where children live
   * @param {Node[]} a The list of current/live children
   * @param {Node[]} b The list of future children
   * @param {(entry: Node, action: number) => Node} get
   * The callback invoked per each entry related DOM operation.
   * @param {Node} [before] The optional node used as anchor to insert before.
   * @returns {Node[]} The same list of future children.
   */
  var udomdiff = (function (parentNode, a, b, get, before) {
    var bLength = b.length;
    var aEnd = a.length;
    var bEnd = bLength;
    var aStart = 0;
    var bStart = 0;
    var map = null;

    while (aStart < aEnd || bStart < bEnd) {
      // append head, tail, or nodes in between: fast path
      if (aEnd === aStart) {
        // we could be in a situation where the rest of nodes that
        // need to be added are not at the end, and in such case
        // the node to `insertBefore`, if the index is more than 0
        // must be retrieved, otherwise it's gonna be the first item.
        var node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd - bStart], 0) : before;

        while (bStart < bEnd) {
          parentNode.insertBefore(get(b[bStart++], 1), node);
        }
      } // remove head or tail: fast path
      else if (bEnd === bStart) {
          while (aStart < aEnd) {
            // remove the node only if it's unknown or not live
            if (!map || !map.has(a[aStart])) parentNode.removeChild(get(a[aStart], -1));
            aStart++;
          }
        } // same node: fast path
        else if (a[aStart] === b[bStart]) {
            aStart++;
            bStart++;
          } // same tail: fast path
          else if (a[aEnd - 1] === b[bEnd - 1]) {
              aEnd--;
              bEnd--;
            } // The once here single last swap "fast path" has been removed in v1.1.0
            // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
            // reverse swap: also fast path
            else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
                // this is a "shrink" operation that could happen in these cases:
                // [1, 2, 3, 4, 5]
                // [1, 4, 3, 2, 5]
                // or asymmetric too
                // [1, 2, 3, 4, 5]
                // [1, 2, 3, 5, 6, 4]
                var _node = get(a[--aEnd], -1).nextSibling;
                parentNode.insertBefore(get(b[bStart++], 1), get(a[aStart++], -1).nextSibling);
                parentNode.insertBefore(get(b[--bEnd], 1), _node); // mark the future index as identical (yeah, it's dirty, but cheap 👍)
                // The main reason to do this, is that when a[aEnd] will be reached,
                // the loop will likely be on the fast path, as identical to b[bEnd].
                // In the best case scenario, the next loop will skip the tail,
                // but in the worst one, this node will be considered as already
                // processed, bailing out pretty quickly from the map index check

                a[aEnd] = b[bEnd];
              } // map based fallback, "slow" path
              else {
                  // the map requires an O(bEnd - bStart) operation once
                  // to store all future nodes indexes for later purposes.
                  // In the worst case scenario, this is a full O(N) cost,
                  // and such scenario happens at least when all nodes are different,
                  // but also if both first and last items of the lists are different
                  if (!map) {
                    map = new Map();
                    var i = bStart;

                    while (i < bEnd) {
                      map.set(b[i], i++);
                    }
                  } // if it's a future node, hence it needs some handling


                  if (map.has(a[aStart])) {
                    // grab the index of such node, 'cause it might have been processed
                    var index = map.get(a[aStart]); // if it's not already processed, look on demand for the next LCS

                    if (bStart < index && index < bEnd) {
                      var _i = aStart; // counts the amount of nodes that are the same in the future

                      var sequence = 1;

                      while (++_i < aEnd && _i < bEnd && map.get(a[_i]) === index + sequence) {
                        sequence++;
                      } // effort decision here: if the sequence is longer than replaces
                      // needed to reach such sequence, which would brings again this loop
                      // to the fast path, prepend the difference before a sequence,
                      // and move only the future list index forward, so that aStart
                      // and bStart will be aligned again, hence on the fast path.
                      // An example considering aStart and bStart are both 0:
                      // a: [1, 2, 3, 4]
                      // b: [7, 1, 2, 3, 6]
                      // this would place 7 before 1 and, from that time on, 1, 2, and 3
                      // will be processed at zero cost


                      if (sequence > index - bStart) {
                        var _node2 = get(a[aStart], 0);

                        while (bStart < index) {
                          parentNode.insertBefore(get(b[bStart++], 1), _node2);
                        }
                      } // if the effort wasn't good enough, fallback to a replace,
                      // moving both source and target indexes forward, hoping that some
                      // similar node will be found later on, to go back to the fast path
                      else {
                          parentNode.replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
                        }
                    } // otherwise move the source forward, 'cause there's nothing to do
                    else aStart++;
                  } // this node has no meaning in the future list, so it's more than safe
                  // to remove it, and check the next live node out instead, meaning
                  // that only the live list index should be forwarded
                  else parentNode.removeChild(get(a[aStart++], -1));
                }
    }

    return b;
  });

  /*! (c) Andrea Giammarchi - ISC */
  var importNode = function (document, appendChild, cloneNode, createTextNode, importNode) {
    var _native = (importNode in document); // IE 11 has problems with cloning templates:
    // it "forgets" empty childNodes. This feature-detects that.


    var fragment = document.createDocumentFragment();
    fragment[appendChild](document[createTextNode]('g'));
    fragment[appendChild](document[createTextNode](''));
    /* istanbul ignore next */

    var content = _native ? document[importNode](fragment, true) : fragment[cloneNode](true);
    return content.childNodes.length < 2 ? function importNode(node, deep) {
      var clone = node[cloneNode]();

      for (var
      /* istanbul ignore next */
      childNodes = node.childNodes || [], length = childNodes.length, i = 0; deep && i < length; i++) {
        clone[appendChild](importNode(childNodes[i], deep));
      }

      return clone;
    } :
    /* istanbul ignore next */
    _native ? document[importNode] : function (node, deep) {
      return node[cloneNode](!!deep);
    };
  }(document, 'appendChild', 'cloneNode', 'createTextNode', 'importNode');

  var trim = ''.trim ||
  /* istanbul ignore next */
  function () {
    return String(this).replace(/^\s+|\s+/g, '');
  };

  /* istanbul ignore next */

  var normalizeAttributes = UID_IE ? function (attributes, parts) {
    var html = parts.join(' ');
    return parts.slice.call(attributes, 0).sort(function (left, right) {
      return html.indexOf(left.name) <= html.indexOf(right.name) ? -1 : 1;
    });
  } : function (attributes, parts) {
    return parts.slice.call(attributes, 0);
  };

  function find(node, path) {
    var length = path.length;
    var i = 0;

    while (i < length) {
      node = node.childNodes[path[i++]];
    }

    return node;
  }

  function parse(node, holes, parts, path) {
    var childNodes = node.childNodes;
    var length = childNodes.length;
    var i = 0;

    while (i < length) {
      var child = childNodes[i];

      switch (child.nodeType) {
        case ELEMENT_NODE:
          var childPath = path.concat(i);
          parseAttributes(child, holes, parts, childPath);
          parse(child, holes, parts, childPath);
          break;

        case COMMENT_NODE:
          var textContent = child.textContent;

          if (textContent === UID) {
            parts.shift();
            holes.push( // basicHTML or other non standard engines
            // might end up having comments in nodes
            // where they shouldn't, hence this check.
            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ? Text(node, path) : Any(child, path.concat(i)));
          } else {
            switch (textContent.slice(0, 2)) {
              case '/*':
                if (textContent.slice(-2) !== '*/') break;

              case "\uD83D\uDC7B":
                // ghost
                node.removeChild(child);
                i--;
                length--;
            }
          }

          break;

        case TEXT_NODE:
          // the following ignore is actually covered by browsers
          // only basicHTML ends up on previous COMMENT_NODE case
          // instead of TEXT_NODE because it knows nothing about
          // special style or textarea behavior

          /* istanbul ignore if */
          if (SHOULD_USE_TEXT_CONTENT.test(node.nodeName) && trim.call(child.textContent) === UIDC) {
            parts.shift();
            holes.push(Text(node, path));
          }

          break;
      }

      i++;
    }
  }

  function parseAttributes(node, holes, parts, path) {
    var attributes = node.attributes;
    var cache = [];
    var remove = [];
    var array = normalizeAttributes(attributes, parts);
    var length = array.length;
    var i = 0;

    while (i < length) {
      var attribute = array[i++];
      var direct = attribute.value === UID;
      var sparse;

      if (direct || 1 < (sparse = attribute.value.split(UIDC)).length) {
        var name = attribute.name; // the following ignore is covered by IE
        // and the IE9 double viewBox test

        /* istanbul ignore else */

        if (cache.indexOf(name) < 0) {
          cache.push(name);
          var realName = parts.shift().replace(direct ? /^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/ : new RegExp('^(?:|[\\S\\s]*?\\s)(' + name + ')\\s*=\\s*(\'|")[\\S\\s]*', 'i'), '$1');
          var value = attributes[realName] || // the following ignore is covered by browsers
          // while basicHTML is already case-sensitive

          /* istanbul ignore next */
          attributes[realName.toLowerCase()];
          if (direct) holes.push(Attr(value, path, realName, null));else {
            var skip = sparse.length - 2;

            while (skip--) {
              parts.shift();
            }

            holes.push(Attr(value, path, realName, sparse));
          }
        }

        remove.push(attribute);
      }
    }

    length = remove.length;
    i = 0;
    /* istanbul ignore next */

    var cleanValue = 0 < length && UID_IE && !('ownerSVGElement' in node);

    while (i < length) {
      // Edge HTML bug #16878726
      var attr = remove[i++]; // IE/Edge bug lighterhtml#63 - clean the value or it'll persist

      /* istanbul ignore next */

      if (cleanValue) attr.value = ''; // IE/Edge bug lighterhtml#64 - don't use removeAttributeNode

      node.removeAttribute(attr.name);
    } // This is a very specific Firefox/Safari issue
    // but since it should be a not so common pattern,
    // it's probably worth patching regardless.
    // Basically, scripts created through strings are death.
    // You need to create fresh new scripts instead.
    // TODO: is there any other node that needs such nonsense?


    var nodeName = node.nodeName;

    if (/^script$/i.test(nodeName)) {
      // this used to be like that
      // var script = createElement(node, nodeName);
      // then Edge arrived and decided that scripts created
      // through template documents aren't worth executing
      // so it became this ... hopefully it won't hurt in the wild
      var script = document.createElement(nodeName);
      length = attributes.length;
      i = 0;

      while (i < length) {
        script.setAttributeNode(attributes[i++].cloneNode(true));
      }

      script.textContent = node.textContent;
      node.parentNode.replaceChild(script, node);
    }
  }

  function Any(node, path) {
    return {
      type: 'any',
      node: node,
      path: path
    };
  }

  function Attr(node, path, name, sparse) {
    return {
      type: 'attr',
      node: node,
      path: path,
      name: name,
      sparse: sparse
    };
  }

  function Text(node, path) {
    return {
      type: 'text',
      node: node,
      path: path
    };
  }

  // globals
  var parsed = umap(new WeakMap$1());

  function createInfo(options, template) {
    var markup = (options.convert || domsanitizer)(template);
    var transform = options.transform;
    if (transform) markup = transform(markup);
    var content = createContent(markup, options.type);
    cleanContent(content);
    var holes = [];
    parse(content, holes, template.slice(0), []);
    return {
      content: content,
      updates: function updates(content) {
        var updates = [];
        var len = holes.length;
        var i = 0;
        var off = 0;

        while (i < len) {
          var info = holes[i++];
          var node = find(content, info.path);

          switch (info.type) {
            case 'any':
              updates.push({
                fn: options.any(node, []),
                sparse: false
              });
              break;

            case 'attr':
              var sparse = info.sparse;
              var fn = options.attribute(node, info.name, info.node);
              if (sparse === null) updates.push({
                fn: fn,
                sparse: false
              });else {
                off += sparse.length - 2;
                updates.push({
                  fn: fn,
                  sparse: true,
                  values: sparse
                });
              }
              break;

            case 'text':
              updates.push({
                fn: options.text(node),
                sparse: false
              });
              node.textContent = '';
              break;
          }
        }

        len += off;
        return function () {
          var length = arguments.length;

          if (len !== length - 1) {
            throw new Error(length - 1 + ' values instead of ' + len + '\n' + template.join('${value}'));
          }

          var i = 1;
          var off = 1;

          while (i < length) {
            var update = updates[i - off];

            if (update.sparse) {
              var values = update.values;
              var value = values[0];
              var j = 1;
              var l = values.length;
              off += l - 2;

              while (j < l) {
                value += arguments[i++] + values[j++];
              }

              update.fn(value);
            } else update.fn(arguments[i++]);
          }

          return content;
        };
      }
    };
  }

  function createDetails(options, template) {
    var info = parsed.get(template) || parsed.set(template, createInfo(options, template));
    return info.updates(importNode.call(document, info.content, true));
  }

  var empty = [];

  function domtagger(options) {
    var previous = empty;
    var updates = cleanContent;
    return function (template) {
      if (previous !== template) updates = createDetails(options, previous = template);
      return updates.apply(null, arguments);
    };
  }

  function cleanContent(fragment) {
    var childNodes = fragment.childNodes;
    var i = childNodes.length;

    while (i--) {
      var child = childNodes[i];

      if (child.nodeType !== 1 && trim.call(child.textContent).length === 0) {
        fragment.removeChild(child);
      }
    }
  }

  /*! (c) Andrea Giammarchi - ISC */
  var hyperStyle = function () {

    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var hyphen = /([^A-Z])([A-Z]+)/g;
    return function hyperStyle(node, original) {
      return 'ownerSVGElement' in node ? svg(node, original) : update(node.style, false);
    };

    function ized($0, $1, $2) {
      return $1 + '-' + $2.toLowerCase();
    }

    function svg(node, original) {
      var style;
      if (original) style = original.cloneNode(true);else {
        node.setAttribute('style', '--hyper:style;');
        style = node.getAttributeNode('style');
      }
      style.value = '';
      node.setAttributeNode(style);
      return update(style, true);
    }

    function toStyle(object) {
      var key,
          css = [];

      for (key in object) {
        css.push(key.replace(hyphen, ized), ':', object[key], ';');
      }

      return css.join('');
    }

    function update(style, isSVG) {
      var oldType, oldValue;
      return function (newValue) {
        var info, key, styleValue, value;

        switch (typeof(newValue)) {
          case 'object':
            if (newValue) {
              if (oldType === 'object') {
                if (!isSVG) {
                  if (oldValue !== newValue) {
                    for (key in oldValue) {
                      if (!(key in newValue)) {
                        style[key] = '';
                      }
                    }
                  }
                }
              } else {
                if (isSVG) style.value = '';else style.cssText = '';
              }

              info = isSVG ? {} : style;

              for (key in newValue) {
                value = newValue[key];
                styleValue = typeof value === 'number' && !IS_NON_DIMENSIONAL.test(key) ? value + 'px' : value;
                if (!isSVG && /^--/.test(key)) info.setProperty(key, styleValue);else info[key] = styleValue;
              }

              oldType = 'object';
              if (isSVG) style.value = toStyle(oldValue = info);else oldValue = newValue;
              break;
            }

          default:
            if (oldValue != newValue) {
              oldType = 'string';
              oldValue = newValue;
              if (isSVG) style.value = newValue || '';else style.cssText = newValue || '';
            }

            break;
        }
      };
    }
  }();

  var aria = function aria(node) {
    return function (value) {
      for (var key in value) {
        node.setAttribute(key === 'role' ? key : "aria-".concat(key), value[key]);
      }
    };
  };
  var attribute = function attribute(node, name) {
    var oldValue,
        orphan = true;
    var attributeNode = document.createAttributeNS(null, name);
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (oldValue == null) {
          if (!orphan) {
            node.removeAttributeNode(attributeNode);
            orphan = true;
          }
        } else {
          attributeNode.value = newValue;

          if (orphan) {
            node.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
      }
    };
  };
  var data = function data(_ref) {
    var dataset = _ref.dataset;
    return function (value) {
      for (var key in value) {
        dataset[key] = value[key];
      }
    };
  };
  var event = function event(node, name) {
    var oldValue,
        type = name.slice(2);
    if (!(name in node) && name.toLowerCase() in node) type = type.toLowerCase();
    return function (newValue) {
      var info = isArray(newValue) ? newValue : [newValue, false];

      if (oldValue !== info[0]) {
        if (oldValue) node.removeEventListener(type, oldValue, info[1]);
        if (oldValue = info[0]) node.addEventListener(type, oldValue, info[1]);
      }
    };
  };
  var ref = function ref(node) {
    return function (value) {
      if (typeof value === 'function') value(node);else value.current = node;
    };
  };
  var setter = function setter(node, key) {
    return function (value) {
      node[key] = value;
    };
  };

  var hyperProperty = function hyperProperty(node, name) {
    var oldValue;
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (node[name] !== newValue) {
          if (newValue == null) {
            // cleanup before dropping the attribute to fix IE/Edge gotcha
            node[name] = '';
            node.removeAttribute(name);
          } else node[name] = newValue;
        }
      }
    };
  }; // list of attributes that should not be directly assigned


  var readOnly = /^(?:form|list)$/i; // simplifies text node creation

  var text = function text(node, _text) {
    return node.ownerDocument.createTextNode(_text);
  };

  function Tagger(type) {
    this.type = type;
    return domtagger(this);
  }
  Tagger.prototype = {
    // there are four kind of attributes, and related behavior:
    //  * events, with a name starting with `on`, to add/remove event listeners
    //  * special, with a name present in their inherited prototype, accessed directly
    //  * regular, accessed through get/setAttribute standard DOM methods
    //  * style, the only regular attribute that also accepts an object as value
    //    so that you can style=${{width: 120}}. In this case, the behavior has been
    //    fully inspired by Preact library and its simplicity.
    attribute: function attribute$1(node, name, original) {
      var isSVG = this.type === 'svg';

      switch (name) {
        case 'class':
          if (isSVG) return attribute(node, name);
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
          if (name.slice(0, 1) === '.') return setter(node, name.slice(1));
          if (name.slice(0, 2) === 'on') return event(node, name);
          if (name in node && !(isSVG || readOnly.test(name))) return hyperProperty(node, name);
          return attribute(node, name);
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
    any: function any(node, childNodes) {
      var type = this.type;
      var fastPath = false;
      var oldValue;

      var anyContent = function anyContent(value) {
        switch (typeof(value)) {
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
              childNodes = udomdiff(node.parentNode, childNodes, [text(node, value)], diffable, node);
            }

            break;

          case 'function':
            anyContent(value(node));
            break;

          case 'object':
          case 'undefined':
            if (value == null) {
              fastPath = false;
              childNodes = udomdiff(node.parentNode, childNodes, [], diffable, node);
              break;
            }

          default:
            fastPath = false;
            oldValue = value;

            if (isArray(value)) {
              if (value.length === 0) {
                if (childNodes.length) {
                  childNodes = udomdiff(node.parentNode, childNodes, [], diffable, node);
                }
              } else {
                switch (typeof(value[0])) {
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
                    childNodes = udomdiff(node.parentNode, childNodes, value, diffable, node);
                    break;
                }
              }
            } else if ('ELEMENT_NODE' in value) {
              childNodes = udomdiff(node.parentNode, childNodes, value.nodeType === 11 ? slice.call(value.childNodes) : [value], diffable, node);
            } else if ('text' in value) {
              anyContent(String(value.text));
            } else if ('any' in value) {
              anyContent(value.any);
            } else if ('html' in value) {
              childNodes = udomdiff(node.parentNode, childNodes, slice.call(createContent([].concat(value.html).join(''), type).childNodes), diffable, node);
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
    text: function text(node) {
      var oldValue;

      var textContent = function textContent(value) {
        if (oldValue !== value) {
          oldValue = value;

          var type = typeof(value);

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

  var create = Object.create,
      freeze = Object.freeze,
      keys = Object.keys;
  var tProto = Tagger.prototype;
  var cache = umap(new WeakMap$1());

  var createRender = function createRender(Tagger) {
    return {
      html: outer('html', Tagger),
      svg: outer('svg', Tagger),
      render: function render(where, what) {
        var hole = typeof what === 'function' ? what() : what;
        var info = cache.get(where) || cache.set(where, createCache());
        var wire = hole instanceof LighterHole ? unroll(Tagger, info, hole) : hole;

        if (wire !== info.wire) {
          info.wire = wire;
          where.textContent = '';
          where.appendChild(wire.valueOf());
        }

        return where;
      }
    };
  };

  var createCache = function createCache() {
    return {
      stack: [],
      entry: null,
      wire: null
    };
  };

  var outer = function outer(type, Tagger) {
    var cache = umap(new WeakMap$1());

    var fixed = function fixed(info) {
      return function () {
        return unroll(Tagger, info, hole.apply(null, arguments));
      };
    };

    hole["for"] = function (ref, id) {
      var memo = cache.get(ref) || cache.set(ref, create(null));
      return memo[id] || (memo[id] = fixed(createCache()));
    };

    hole.node = function () {
      return unroll(Tagger, createCache(), hole.apply(null, arguments)).valueOf();
    };

    return hole;

    function hole() {
      return new LighterHole(type, tta.apply(null, arguments));
    }
  };

  var unroll = function unroll(Tagger, info, _ref) {
    var _entry;

    var type = _ref.type,
        template = _ref.template,
        values = _ref.values;
    var length = values.length;
    unrollValues(Tagger, info, values, length);
    var entry = info.entry;

    if (!entry || entry.template !== template || entry.type !== type) {
      var tag = new Tagger(type);
      info.entry = entry = {
        type: type,
        template: template,
        tag: tag,
        wire: persistent(tag.apply(void 0, [template].concat(_toConsumableArray(values))))
      };
    } else (_entry = entry).tag.apply(_entry, [template].concat(_toConsumableArray(values)));

    return entry.wire;
  };

  var unrollValues = function unrollValues(Tagger, _ref2, values, length) {
    var stack = _ref2.stack;

    for (var i = 0; i < length; i++) {
      var hole = values[i];
      if (hole instanceof Hole) values[i] = unroll(Tagger, stack[i] || (stack[i] = createCache()), hole);else if (isArray(hole)) unrollValues(Tagger, stack[i] || (stack[i] = createCache()), hole, hole.length);else stack[i] = null;
    }

    if (length < stack.length) stack.splice(length);
  };

  freeze(LighterHole);

  function LighterHole(type, args) {
    this.type = type;
    this.template = args.shift();
    this.values = args;
  }
  var Hole = LighterHole;
  var custom = function custom(overrides) {
    var prototype = create(tProto);
    keys(overrides).forEach(function (key) {
      prototype[key] = overrides[key](prototype[key] || (key === 'convert' ? domsanitizer : String));
    });
    CustomTagger.prototype = prototype;
    return createRender(CustomTagger);

    function CustomTagger() {
      return Tagger.apply(this, arguments);
    }
  };

  var _createRender = createRender(Tagger),
      render = _createRender.render,
      html = _createRender.html,
      svg = _createRender.svg;

  function tta() {
    var out = [],
        i = 0,
        length = arguments.length;

    while (i < length) {
      out.push(arguments[i++]);
    }

    return out;
  }

  exports.Hole = Hole;
  exports.custom = custom;
  exports.html = html;
  exports.render = render;
  exports.svg = svg;

  return exports;

}(document,{}));
