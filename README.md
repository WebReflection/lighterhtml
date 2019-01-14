# lighterhtml

[![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/WebReflection/donate) [![Build Status](https://travis-ci.com/WebReflection/lighterhtml.svg?branch=master)](https://travis-ci.com/WebReflection/lighterhtml) ![WebReflection status](https://offline.report/status/webreflection.svg) [![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC) ![Blazing Fast](https://img.shields.io/badge/speed-blazing%20🔥-brightgreen.svg)

The _hyperHTML_ strength & experience without its complexity 🎉

  * **faster** than [hyperHTML](https://github.com/WebReflection/hyperHTML) ⚡️
  * **simpler** than [lit-html](https://github.com/polymer/lit-html) 💡
  * fueling the [neverland](https://github.com/WebReflection/neverland/#neverland-) magic 🦄


### faster than hyperHTML

Even if sharing 90% of _hyperHTML_'s code, this utility removed all the not strictly necessary parts from it, including:

  * no `Component`, no `define` and/or intents, no `connect` or `disconnect`, and no promises <sup><sub>(possibly in later on)</sub></sup>, everything these days can be easily handled by hooks, as example using the [dom-augmentor](https://github.com/WebReflection/dom-augmentor) utility
  * html content is never implicit, since all you have to do is to write `html` before any template when you need it. However, the `{html: string}` is still accepted for extreme cases.

Removing these parts made the output smaller in size <sup><sub>(less than 6K)</sub></sup> but it also simplified some underlying logic.

Accordingly, _lighterhtml_ delivers raw [domdiff](https://github.com/WebReflection/domdiff#domdiff) and [domtagger](https://github.com/WebReflection/domtagger#domtagger) performance in an optimized way.

If you don't believe it, check the [DBMonster](https://webreflection.github.io/lighterhtml/test/dbmonster.html) benchmark 😉


### simpler than lit-html

In _lit-html_, the `html` function tag is worthless, if used without its `render`.

In _lighterhtml_ though, the `html` tag can be used in the wild to create any, one-off, real DOM.

Strawberry on top, when used through its `render`, it automatically creates all the keyed performance you'd expect from _hyperHTML_ wires, without needing to manually address any reference: pain point defeated 🍾

"_but ... how?_", if you're asking, the answer is simple: _lighterhtml_ is based on the same [augmentor](https://github.com/WebReflection/augmentor#augmentor)'s hooks concept, followed by automatically addressed [hyperhtml-wire](https://github.com/WebReflection/hyperhtml-wire#hyperhtml-wire)s, which in turns brings a battle tested solution for the [O(ND) Eugene W. Myers' Algorithm](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.4.6927&rep=rep1&type=pdf) based [domdiff](https://github.com/WebReflection/domdiff#domdiff), and its extra variations.


### A basic example

Live on [Code Pen](https://codepen.io/WebReflection/pen/jXdBLV?editors=0010).

```js
import {render, html} from 'https://unpkg.com/lighterhtml?module';

document.body.appendChild(
  // as unkeyed one-off content, right away 🎉
  html`<strong>any</strong> one-off content!<div/>`
);

// as automatically rendered wired content 🤯
todo(document.body.lastChild);
function todo(node, items = []) {
  render(node, () => html`
  <ul>${items.map((what, i) => html`
    <li data-i=${i} onclick=${remove}> ${what} </li>
  `)}
    <button onclick=${add}> add </button>
  </uL>`);
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

