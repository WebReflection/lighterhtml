# lighterhtml

<sup>**Social Media Photo by [Kristine Weilert](https://unsplash.com/@kristineweilert) on [Unsplash](https://unsplash.com/)**</sup>

![WebReflection status](https://offline.report/status/webreflection.svg) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC) [![Greenkeeper badge](https://badges.greenkeeper.io/WebReflection/lighterhtml.svg)](https://greenkeeper.io/) ![Blazing Fast](https://img.shields.io/badge/speed-blazing%20🔥-brightgreen.svg)


### 📣 Community Announcement

Please ask questions in the [dedicated discussions repository](https://github.com/WebReflection/discussions), to help the community around this project grow ♥

---

The _hyperHTML_ strength & experience without its complexity 🎉

  * **faster** than [hyperHTML](https://github.com/WebReflection/hyperHTML) ⚡️
  * **simpler** than [lit-html](https://github.com/polymer/lit-html) 💡
  * **fueling** both [neverland](https://github.com/WebReflection/neverland/#readme) and [heresy](https://github.com/WebReflection/heresy/#readme) 🔥

#### Looking for something even smaller?

If you want 90% of functionalities offered by *lightetrhtml* for 2/3rd of its size, check **[µhtml](https://github.com/WebReflection/uhtml#readme)**, which is also used in "*micro custom elements*" **[µce](https://github.com/WebReflection/uce#readme)** library, hence **[µce-template](https://github.com/WebReflection/uce-template#readme)** too, plus "*micro land*" **[µland](https://github.com/WebReflection/uland#readme)** 🦄

---

### 4.2 Highlights

  * the new `?boolean=${value}` syntax from [µhtml](https://github.com/WebReflection/uhtml#readme) has landed in *lighterhtml* too. Feel free to [read this long discussion](https://github.com/WebReflection/discussions/discussions/13) to better understand *why* this syntax is better, or necessary.

---

### faster than hyperHTML

Even if sharing 90% of _hyperHTML_'s code, this utility removed all the not strictly necessary parts from it, including:

  * no `Component`, no `define` and/or intents, no `connect` or `disconnect`, and no promises <sup><sub>(possibly in later on)</sub></sup>, everything these days can be easily handled by hooks, as example using the [dom-augmentor](https://github.com/WebReflection/dom-augmentor) utility
  * html content is never implicit, since all you have to do is to write `html` before any template when you need it. However, the `{html: string}` is still accepted for extreme cases.

Removing these parts made the output smaller in size <sup><sub>(less than 6K)</sub></sup> but it also simplified some underlying logic.

Accordingly, _lighterhtml_ delivers raw [domdiff](https://github.com/WebReflection/domdiff#domdiff) and [domtagger](https://github.com/WebReflection/domtagger#domtagger) performance in an optimized way.

If you don't believe it, check the [DBMonster](https://webreflection.github.io/lighterhtml/test/dbmonster.html) benchmark 😉


### simpler than lit-html

In _lit-html_, the `html` function tag is worthless, if used without its `render`.

In _lighterhtml_ though, the `html.node` or `svg.node` tag, can be used in the wild to create any, one-off, real DOM, [as shown in this pen](https://codepen.io/WebReflection/pen/jXdJBR?editors=0010).

```js
// lighterhtml: import the `html` tag and use it right away
import {html} from '//unpkg.com/lighterhtml?module';

// a one off, safe, runtime list 👍
const list = ['some', '<b>nasty</b>', 'list'];
document.body.appendChild(html.node`
  <ul>${list.map(text => html.node`
    <li>${text}</li>
  `)}
  </ul>
`);
```

Strawberry on top, when the `html` or `svg` tag is used through _lighterhtml_ `render`, it automatically creates all the keyed performance you'd expect from _hyperHTML_ wires, without needing to manually address any reference: pain point? defeated! 🍾



### Available as lighterhtml-plus too!

If you are looking for Custom Elements like events out of the box, [lighterhtml-plus](https://github.com/WebReflection/lighterhtml-plus#readme) is your next stop 👍


### How to import lighterhtml/-plus

Following, the usual multi import pattern behind every project of mine:

  * via global `lighterhtml` CDN utility: `<script src="https://unpkg.com/lighterhtml"></script>`, and `const {render, html, svg} = lighterhtml`
  * via ESM CDN module: `import {render, html, svg} from 'https://unpkg.com/lighterhtml?module'`
  * via ESM bundler: `import {render, html, svg} from 'lighterhtml'`
  * via CJS module: `const {render, html, svg} = require('lighterhtml')`


### What's the API ? What's in the export ?

The module exports the following:

  * `html` tag function to create any sort of HTML content when used within a `render` call. It carries two extra utilities, `html.for(ref[, id])`, to hard-reference a specific node, and `html.node` to create one-off dom nodes in the wild without using the `render`.
  * `svg` tag function to create any sort of SVG content when used within a `render` call. It carries two extra utilities, `svg.for(ref[, id])`, to hard-reference a specific node, and `svg.node` to create one-off dom nodes in the wild without using the `render`.
  * `render(node, fn|Hole)` to pollute a `node` with whatever is returned from the `fn` parameters, including `html` or `svg` tagged layout
  * `Hole` class for 3rd parts (internal use)

You can test live a `hook` example in [this Code Pen](https://codepen.io/WebReflection/pen/maQXwq?editors=0010).


### What's different from hyperHTML ?

  * the wired content is not strongly referenced as it is for `hyperHTML.wire(ref[, type:id])` **unless** you explicitly ask for it via `html.for(ref[, id])` or `svg.for(ref[, id])`, where in both cases, the `id` doesn't need any colon to be unique. This creates content hard wired whenever it's needed.
  * the `ref=${object}` attribute works same as React, you pass an object via `const obj = useRef(null)` and you'll have `obj.current` on any effect. If a callback is passed instead, the callback will receive the node right away, same way [React ref](https://reactjs.org/docs/refs-and-the-dom.html) does.
  * if the attribute name is `aria`, as in `aria=${object}`, aria attributes are applied to the node, including the `role` one.
  * _deprecated_: if the attribute name is `data`, as in `data=${object}`, the `node.dataset` gets populated with all values.
  * if the attribute name is `.dataset`, as in `.dataset=${object}`, the `node.dataset` gets populated with all values.
  * intents, hence `define`, are not implemented. Most tasks can be achieved via hooks.
  * promises are not in neither. You can update asynchronously anything via hooks or via custom element forced updates.
  * the `onconnected` and `ondisconnected` special events are available only in _lighterhtml-plus_. These might come back in the future but right now _dom-augmentor_ replaces these via `useEffect(callback, [])`. Please note the empty array as second argument.
  * an array of functions will be called automatically, like functions are already called when found in the wild
  * the `Component` can be easily replaced with hooks or automatic keyed renders
  * if a listener is an `Array` such as `[listener, {once: true}]`, the second entry of the array will be used as option.

```js
const {render, html} = lighterhtml;

// all it takes to have components with lighterhtml
const Comp = name => html`<p>Hello ${name}!</p>`;

// for demo purpose, check in console keyed updates
// meaning you won't see a single change per second
setInterval(
  greetings,
  1000,
  [
    'Arianna',
    'Luca',
    'Isa'
  ]
);

function greetings(users) {
  render(document.body, html`${users.map(Comp)}`);
}
```

### Documentation

Excluding the already mentioned removed parts, everything else within the template literal works as described in [hyperHTML documentation](https://viperhtml.js.org/hyperhtml/documentation/#essentials-3-1).


### A basic example

Live on [Code Pen](https://codepen.io/WebReflection/pen/jXdBLV?editors=0010).

```js
import {render, html} from '//unpkg.com/lighterhtml?module';

document.body.appendChild(
  // as unkeyed one-off content, right away 🎉
  html.node`<strong>any</strong> one-off content!<div/>`
);

// as automatically rendered wired content 🤯
todo(document.body.lastChild);
function todo(node, items = []) {
  render(node, html`
  <ul>${
  items.map((what, i) => html`
    <li data-i=${i} onclick=${remove}> ${what} </li>`)
  }</ul>
  <button onclick=${add}> add </button>`);
  function add() {
    items.push(prompt('do'));
    todo(node, items);
  }
  function remove(e) {
    items.splice(e.currentTarget.dataset.i, 1);
    todo(node, items);
  }
}
```


### What about Custom Elements ?

**[You got 'em](https://codepen.io/WebReflection/pen/MZxYVm?editors=0010)**, just bind `render` arguments once and update the element content whenever you feel like.

Compatible with the node itself, or its shadow root, either opened or closed.

```js
const {render, html} = lighterhtml;

customElements.define('my-ce', class extends HTMLElement {
  constructor() {
    super();
    this.state = {yup: 0, nope: 0};
    this.render = render.bind(
      null,
      // used as target node
      // it could either be the node itself
      // or its shadow root, even a closed one
      this.attachShadow({mode: 'closed'}),
      // the update callback
      this.render.bind(this)
    );
    // first render
    this.render();
  }
  render() {
    const {yup, nope} = this.state;
    return html`
    Isn't this <strong>awesome</strong>?
    <hr>
    <button data-key=yup onclick=${this}>yup ${yup}</button>
    <button data-key=nope onclick=${this}>nope ${nope}</button>`;
  }
  handleEvent(event) {
    this[`on${event.type}`](event);
  }
  onclick(event) {
    event.preventDefault();
    const {key} = event.currentTarget.dataset;
    this.state[key]++;
    this.render();
  }
});
```


### Should I ditch hyperHTML ?

Born [at the beginning of 2017](https://medium.com/@WebReflection/hyperhtml-a-virtual-dom-alternative-279db455ee0e), _hyperHTML_ matured so much that no crucial bugs have appeared for a very long time.

It has also been used in production to deliver [HyperHTMLElement](https://github.com/WebReflection/hyperHTML-Element#hyperhtml-element) components to ~100M users, or to show [W3C specifications](https://github.com/w3c/respec), so that in case of bugs, _hyperHTML_ will most likely be on the fast lane for bug fixes, and _lighterhtml_ will eventually follow, whenever it's needed.

On top of this, most modules used in _lighterhtml_ are also part of _hyperHTML_ core, and the [./tagger.js](https://github.com/WebReflection/lighterhtml/blob/master/esm/tagger.js) file is mostly a copy and paste of the _hyperHTML_ [./objects/Update.js](https://github.com/WebReflection/hyperHTML/blob/master/esm/objects/Updates.js) one.

However, as tech and software evolve, I wanted to see if squashing together everything I know about template literals, thanks to _hyperHTML_ development, and everything I've recently learned about hooks, could've been merged together to deliver the easiest way ever to declare any non-virtual DOM view on the Web.

And this is what _lighterhtml_ is about, an attempt to simplify to the extreme the `.bind(...)` and `.wire(...)` concept of _hyperHTML_, through a package that requires pretty much zero knowledge about those internals.

_lighterhtml_ is also relatively new, so that some disabled functionality might come back, or slightly change, but if you like the idea, and you have tested it works for your project, feel free to ditch _hyperHTML_ in favor of _lighterhtml_, so that you can help maturing this project too.



### Should I use micro html instead ?

_[µhtml](https://github.com/WebReflection/uhtml#readme)_ is a great way to start playing around with most _lighterhtml_ features. As it's simply a subset, you can eventually switch to lighterhtml later on, whenever you miss, or need, some extra feature.

For a complete comparison of features and libraries around my repositories, please [have a look at this gist](https://gist.github.com/WebReflection/761052d6dae7c8207d2fcba7cdede295).

- - -

## History and changes

This session covers all major breaking changes and added features.

### V4 Breaking Changes

I am afraid this major was necessary due recent bugs/discoveries that made me rethink some practice and patch.

  * the recently introduced `data` helper [could conflict](https://github.com/WebReflection/uhtml/issues/14) with some node such as `<object>`, hence it has been replaced by the `.dataset` utility. Since `element.dataset = object` is an invalid operation, the sugar to simplify `data-` attributes is now never ambiguous and future-proof: `<element .dataset=${...} />` it is.
  * all cross browsers normalizations and features detection to make the template literal unique has been removed, as these were [causing more problems](https://github.com/WebReflection/lighterhtml/issues/92) than these were supposed to solve. If you are targeting IE 11 or older browsers, be sure you use [Babel 7](https://babeljs.io/) to transpile your production code. If you are using *TypeScript*, [be sure](https://github.com/microsoft/TypeScript/issues/27460#issuecomment-643763917) you use Babel 7 to transpile your code, as TS has always been broken with transpiled template literals (and classes, and ...).
  * the good old [domdiff](https://github.com/WebReflection/domdiff#readme) that served me well, and it still does, has been replaced by its little [udomdiff](https://github.com/WebReflection/domdiff#readme) brother, allowing _lighterhtml_ to weight 1K less than before, still keeping lightning fast performance.

Because of these breaking changes, all libraries around _lighterhtml_ will gradually bump major version too, pointing at this paragraph of the README.



### V3 Declarative `data` and `aria` attributes.

Since the introduction of `.setter=${value}` made special cases such as `data=${...}` and `props=${...}` redundant, as it's always possible to simply attach any kind of data via `.data=${...}` or `.props=${...}`, version 3 enhances the declarative power of the _template_ to _HTML_ translation.

```js
// the aria special case
html`<div aria=${{labelledBy: 'id', role: 'button'}} />`;
//=> <div aria-labelledby="id" role="button"></div>

// the *deprecated* dataset special case
html`<div data=${{key: 'value', otherKey: 'otherValue'}} />`;
//=> <div data-key="value" data-other-key="otherValue"></div>

// the *new* dataset special case
html`<div .dataset=${{key: 'value', otherKey: 'otherValue'}} />`;
//=> <div data-key="value" data-other-key="otherValue"></div>
```

This means the previous `data=${...}` behavior should be substituted with `.dataset=${...}` and it's now possible to better reflect declarative intents in nodes, simplifying both `data-*` attributes and `aria-*` ones.

Please note using `data-name=${value}`, as well as `aria-name=${value}` is still handled like any other regular attribute, hence it will work as expected, actually faster when the values don't change frequently, as both `aria` and `data` special cases simply loop through the object keys and assign their values to node's attributes.


### V2.1 Introducing A New Listener Feature

Until version 2.1, there was no way to define different options for any listener. The `el.addEventListener(type, listener, false)` was the only kind of operation possible behind the scene.

In _v2.1_ though, whenever a second option is needed, it is now possible to pass an `Array` instead, in the form `[listener, {once: true}]`, as example, or `[listener, true]` to use capture instead of bubbling, and so on and so forth.

Bear in mind, specially for the `once` case, if the listener is different per each update, like `onclick=${[() => stuff(), {once: true}]}`, it will be set each time that update happens, so that in this case is better to use always the same listener, either via outer scope callback, or via reference, using `useRef` and the `handleEvent` pattern, as example.

If you never needed to add a different second option, there is nothing you should do, everything will work exactly as it did before.



### V2 Breaking Changes & Improvements

#### Breaking

  * dropped the ambiguous ability to produce nodes when no `render(...)` is invoked. When needed, which is the minority of the cases, you need to explicitly use `html.node` or `svg.node`, instead of just `html` or `svg`. For every other cases, use `render(where, what)`.
  * the `render(where, what)` does not need a callback anymore. You can now ``render(node, html`<p>content</p>`)`` right away. If a callback is provided, that will still be invoked.
  * removed `useHook` as it's unnecessary since you can use `useRef` through `html.for(...)` or `svg.for(...)` within any `useRef` provided by your library of choice (i.e. [dom-augmentor](https://github.com/WebReflection/dom-augmentor#readme))
  * the recently introduced `inner.html/svg` has been removed, as completely unnatural and error prone (just use `html` anywhere, it'll work).

### Improvements

  * a fundamental core-logic implementation that was trashing any node after one or more collections has been refactored and fixed. The current logic create a stack per each array found down the rendering road, isolating those DOM updates per stack. This means that performance have been improved, and GC operations reduced.
  * `html` and `svg` template literals tags, now offer both `.for(ref[, id])` and `.node`, to either retain the same content (keyed render) or create fresh new nodes out of the box as one-off operation (via `.node`).
  * slightly reduced code size, which is always nice to have, after a refactoring


### V1 Changes + New Feature

Removed `transform` export and made default [domtagger](https://github.com/WebReflection/domtagger) customizable via `custom` export.

```js
import { custom } from 'lighterhtml';

const { html, render } = custom({

  // the domtagger attributes handler
  attribute: callback => (node, name, original) => {
    // return a function that will handle the attribute value
    // the function will receive just the new value
    if (name === 'double')
      return value => {
        node[name] = value + value;
      };
    // the received callback is usable as return fallback
    return callback(node, name, original);
  },

  // the domtagger any-content handler
  any: callback => (node, childNodes) => {
    // return a function that will handle handle all special cases
    // the function will receive just the new *hole* value
    if (node.nodeName === 'CUSTOM') {
      return value => {
        node.appendChild(value);
      };
    }
    // the received callback is usable as return fallback
    return callback(node, childNodes);
  },

  // the domtagger text for text only cases
  text: callback => (node) => {
    // return a function that will handle handle text content cases
    // the function will receive just the new text value
    if (node.nodeName === 'WRAP') {
      return value => {
        node.textContent = `(${value})`;
      };
    }
    // the received callback is usable as return fallback
    return callback(node);
  },

  // optionally you can use the special transform handler too
  // in this case, and in V1, the callback is just the String one
  transform: callback => markup => callback(markup),

  // same goes for convert, with the callback being the one
  // originally used to "convert" the template from Array to HTML
  // see: https://github.com/WebReflection/domtagger/issues/17#issuecomment-526151473
  convert: callback => template => callback(template)
});
```
