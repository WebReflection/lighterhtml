var lighterhtml=function(e){"use strict";var t=function(e,t){return(t=n.prototype).ELEMENT_NODE=1,t.nodeType=111,t.remove=function(e){var t=this.childNodes,n=this.firstChild,r=this.lastChild;if(this._=null,e&&2===t.length)r.parentNode.removeChild(r);else{var o=this.ownerDocument.createRange();o.setStartBefore(e?t[1]:n),o.setEndAfter(r),o.deleteContents()}return n},t.valueOf=function(e){var t=this._,n=null==t;if(n&&(t=this._=this.ownerDocument.createDocumentFragment()),n||e)for(var r=this.childNodes,o=0,a=r.length;o<a;o++)t.appendChild(r[o]);return t},n;function n(t){var n=this.childNodes=e.call(t,0);this.firstChild=n[0],this.lastChild=n[n.length-1],this.ownerDocument=n[0].ownerDocument,this._=null}}([].slice);const{isArray:n}=Array,r=t.prototype.nodeType;var o=function(e){var t="fragment",n="content"in o("template")?function(e){var t=o("template");return t.innerHTML=e,t.content}:function(e){var n=o(t),a=o("template"),i=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var l=RegExp.$1;a.innerHTML="<table>"+e+"</table>",i=a.querySelectorAll(l)}else a.innerHTML=e,i=a.childNodes;return r(n,i),n};return function(e,a){return("svg"===a?function(e){var n=o(t),a=o("div");return a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",r(n,a.firstChild.childNodes),n}:n)(e)};function r(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function o(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}}(document);const a=(e,t,n,r,o,a)=>{if(o-r<2)t.insertBefore(e(n[r],1),a);else{const i=t.ownerDocument.createDocumentFragment();for(;r<o;)i.appendChild(e(n[r++],1));t.insertBefore(i,a)}},i=(e,t)=>e==t,l=e=>e,c=(e,t,n,r,o,a,i)=>{const l=a-o;if(l<1)return-1;for(;n-t>=l;){let l=t,c=o;for(;l<n&&c<a&&i(e[l],r[c]);)l++,c++;if(c===a)return t;t=l+1}return-1},s=(e,t,n,r,o)=>n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:o,u=(e,t,n,r,o)=>{if(o-r<2)t.removeChild(e(n[r],-1));else{const a=t.ownerDocument.createRange();a.setStartBefore(e(n[r],-1)),a.setEndAfter(e(n[o-1],-1)),a.deleteContents()}},f=(e,t,n)=>{let r=1,o=t;for(;r<o;){const t=(r+o)/2>>>0;n<e[t]?o=t:r=t+1}return r},p=(e,t,n,r,o,i,l,c,s,p,d,h,v)=>{((e,t,n,r,o,i,l,c,s)=>{const f=new Map,p=e.length;let d=l,h=0;for(;h<p;)switch(e[h++]){case 0:o++,d++;break;case 1:f.set(r[o],1),a(t,n,r,o++,o,d<c?t(i[d],0):s);break;case-1:d++}for(h=0;h<p;)switch(e[h++]){case 0:l++;break;case-1:f.has(i[l])?l++:u(t,n,i,l++,l)}})(((e,t,n,r,o,a,i)=>{const l=n+a,c=[];let s,u,f,p,d,h,v;e:for(s=0;s<=l;s++){if(s>50)return null;for(v=s-1,d=s?c[s-1]:[0,0],h=c[s]=[],u=-s;u<=s;u+=2){for(f=(p=u===-s||u!==s&&d[v+u-1]<d[v+u+1]?d[v+u+1]:d[v+u-1]+1)-u;p<a&&f<n&&i(r[o+p],e[t+f]);)p++,f++;if(p===a&&f===n)break e;h[s+u]=p}}const g=Array(s/2+l/2);let m=g.length-1;for(s=c.length-1;s>=0;s--){for(;p>0&&f>0&&i(r[o+p-1],e[t+f-1]);)g[m--]=0,p--,f--;if(!s)break;v=s-1,d=s?c[s-1]:[0,0],(u=p-f)==-s||u!==s&&d[v+u-1]<d[v+u+1]?(f--,g[m--]=1):(p--,g[m--]=-1)}return g})(n,r,i,l,c,p,h)||((e,t,n,r,o,a,i,l)=>{let c=0,s=r<l?r:l;const u=Array(s++),p=Array(s);p[0]=-1;for(let e=1;e<s;e++)p[e]=i;const d=new Map;for(let e=a;e<i;e++)d.set(o[e],e);for(let r=t;r<n;r++){const t=d.get(e[r]);null!=t&&-1<(c=f(p,s,t))&&(p[c]=t,u[c]={newi:r,oldi:t,prev:u[c-1]})}for(c=--s,--i;p[c]>i;)--c;s=l+r-c;const h=Array(s);let v=u[c];for(--n;v;){const{newi:e,oldi:t}=v;for(;n>e;)h[--s]=1,--n;for(;i>t;)h[--s]=-1,--i;h[--s]=0,--n,--i,v=v.prev}for(;n>=t;)h[--s]=1,--n;for(;i>=a;)h[--s]=-1,--i;return h})(n,r,o,i,l,c,s,p),e,t,n,r,l,c,d,v)},d=(e,t,n,r)=>{r||(r={});const o=r.compare||i,f=r.node||l,d=null==r.before?null:f(r.before,0),h=t.length;let v=h,g=0,m=n.length,w=0;for(;g<v&&w<m&&o(t[g],n[w]);)g++,w++;for(;g<v&&w<m&&o(t[v-1],n[m-1]);)v--,m--;const y=g===v,b=w===m;if(y&&b)return n;if(y&&w<m)return a(f,e,n,w,m,s(f,t,g,h,d)),n;if(b&&g<v)return u(f,e,t,g,v),n;const N=v-g,x=m-w;let C=-1;if(N<x){if(-1<(C=c(n,w,m,t,g,v,o)))return a(f,e,n,w,C,f(t[g],0)),a(f,e,n,C+N,m,s(f,t,v,h,d)),n}else if(x<N&&-1<(C=c(t,g,v,n,w,m,o)))return u(f,e,t,g,C),u(f,e,t,C+x,v),n;return N<2||x<2?(a(f,e,n,w,m,f(t[g],0)),u(f,e,t,g,v),n):N===x&&((e,t,n,r,o,a)=>{for(;r<o&&a(n[r],e[t-1]);)r++,t--;return 0===t})(n,m,t,g,v,o)?(a(f,e,n,w,m,s(f,t,v,h,d)),n):(p(f,e,n,w,m,x,t,g,v,N,h,o,d),n)};var h,v="-"+Math.random().toFixed(6)+"%";"content"in(h=document.createElement("template"))&&(h.innerHTML='<p tabindex="'+v+'"></p>',h.content.childNodes[0].getAttribute("tabindex")==v)||(v="_dt: "+v.slice(1,-1)+";");var g="\x3c!--"+v+"--\x3e",m=8,w=1,y=3,b=/^(?:style|textarea)$/i,N=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;var x=" \\f\\n\\r\\t",C="[ "+x+"]+[^  \\f\\n\\r\\t\\/>\"'=]+",k="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:",E="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|[^  \\f\\n\\r\\t\\/>\"'=]+))?)",A=new RegExp(k+C+E+"+)([ "+x+"]*/?>)","g"),S=new RegExp(k+C+E+"*)([ "+x+"]*/>)","g"),T=new RegExp("("+C+"\\s*=\\s*)(['\"]?)"+g+"\\2","gi");function M(e,t,n,r){return"<"+t+n.replace(T,L)+r}function L(e,t,n){return t+(n||'"')+v+(n||'"')}function j(e,t,n){return N.test(t)?e:"<"+t+n+"></"+t+">"}var D=String.prototype.trim;function $(e,t,n,r){return{name:r,node:t,path:n,type:e}}function _(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function R(e,t,n,r){for(var o=new Map,a=e.attributes,i=[],l=i.slice.call(a,0),c=l.length,s=0;s<c;){var u=l[s++];if(u.value===v){var f=u.name;if(!o.has(f)){var p=n.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*['"]?$/,"$1"),d=a[p]||a[p.toLowerCase()];o.set(f,d),t.push($("attr",d,r,p))}i.push(u)}}for(c=i.length,s=0;s<c;){var h=i[s++];/^id$/i.test(h.name)?e.removeAttribute(h.name):e.removeAttributeNode(h)}var g=e.nodeName;if(/^script$/i.test(g)){var m=document.createElement(g);for(c=a.length,s=0;s<c;)m.setAttributeNode(a[s++].cloneNode(!0));m.textContent=e.textContent,e.parentNode.replaceChild(m,e)}}var H=document.importNode,O=String.prototype.trim,W=new WeakMap,B=new WeakMap;function F(e,t){var n=function(e){return e.join(g).replace(S,j).replace(A,M)}(t),r=e.transform;r&&(n=r(n));var a=o(n,e.type);!function(e){var t=e.childNodes,n=t.length;for(;n--;){var r=t[n];1!==r.nodeType&&0===O.call(r.textContent).length&&e.removeChild(r)}}(a);var i=[];!function e(t,n,r,o){for(var a=t.childNodes,i=a.length,l=0;l<i;){var c=a[l];switch(c.nodeType){case w:var s=o.concat(l);R(c,n,r,s),e(c,n,r,s);break;case m:c.textContent===v&&(r.shift(),n.push(b.test(t.nodeName)?$("text",t,o):$("any",c,o.concat(l))));break;case y:b.test(t.nodeName)&&D.call(c.textContent)===g&&(r.shift(),n.push($("text",t,o)))}l++}}(a,i,t.slice(0),[]);var l={content:a,updates:function(n){for(var r=[],o=i.length,a=0;a<o;){var l=i[a++],c=_(n,l.path);switch(l.type){case"any":r.push(e.any(c,[]));break;case"attr":r.push(e.attribute(c,l.name,l.node));break;case"text":r.push(e.text(c)),c.textContent=""}}return function(){var e=arguments.length,a=e-1,i=1;if(o!==a)throw new Error(a+" values instead of "+o+"\n"+t.join(", "));for(;i<e;)r[i-1](arguments[i++]);return n}}};return W.set(t,l),l}function G(e){return function(t){var n=B.get(e);return null!=n&&n.template===t||(n=function(e,t){var n=W.get(t)||F(e,t),r=H.call(document,n.content,!0),o={content:r,template:t,updates:n.updates(r)};return B.set(e,o),o}(e,t)),n.updates.apply(null,arguments),n.content}}var V=function(){var e=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,t=/([^A-Z])([A-Z]+)/g;return function(e,t){return"ownerSVGElement"in e?function(e,t){var n;t?n=t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),n=e.getAttributeNode("style"));return n.value="",e.setAttributeNode(n),r(n,!0)}(e,t):r(e.style,!1)};function n(e,t,n){return t+"-"+n.toLowerCase()}function r(r,o){var a,i;return function(l){var c,s,u,f;switch(typeof l){case"object":if(l){if("object"===a){if(!o&&i!==l)for(s in i)s in l||(r[s]="")}else o?r.value="":r.cssText="";for(s in c=o?{}:r,l)u="number"!=typeof(f=l[s])||e.test(s)?f:f+"px",!o&&/^--/.test(s)?c.setProperty(s,u):c[s]=u;a="object",o?r.value=function(e){var r,o=[];for(r in e)o.push(r.replace(t,n),":",e[r],";");return o.join("")}(i=c):i=l;break}default:i!=l&&(a="string",i=l,o?r.value=l||"":r.cssText=l||"")}}}}();const Z=(e,t)=>e.nodeType===r?1/t<0?t?e.remove(!0):e.lastChild:t?e.valueOf(!0):e.firstChild:e,z=(e,t)=>{let n;return r=>{n!==r&&(n=r,e[t]!==r&&(e[t]=r,null==r&&e.removeAttribute(t)))}},q=/^(?:form|list)$/i,P=[].slice,I=(e,t)=>e.ownerDocument.createTextNode(t);function J(e){return this.type=e,G(this)}function K(e){return e(this)}J.prototype={attribute(e,t,n){switch(t){case"class":t="className";case"data":case"props":return z(e,t);case"style":return V(e,n,"ownerSVGElement"in e);case"ref":return(e=>t=>{t.current=e})(e);default:return"on"===t.slice(0,2)?((e,t)=>{let n,r=t.slice(2);return t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{n!==t&&(n&&e.removeEventListener(r,n,!1),n=t,t&&e.addEventListener(r,t,!1))}})(e,t):t in e&&!("ownerSVGElement"in e||q.test(t))?z(e,t):((e,t)=>{let n,r=!1;return o=>{n!==o&&(n=o,t.value!==o&&(null==o?(r&&(r=!1,e.removeAttributeNode(t)),t.value=o):(t.value=o,r||(r=!0,e.setAttributeNode(t)))))}})(e,n.cloneNode(!0))}},any(e,t){const r={node:Z,before:e},a="ownerSVGElement"in e?"svg":"html";let i,l=!1;const c=s=>{switch(typeof s){case"string":case"number":case"boolean":l?i!==s&&(i=s,t[0].textContent=s):(l=!0,i=s,t=d(e.parentNode,t,[I(e,s)],r));break;case"function":c(s(e));break;case"object":case"undefined":if(null==s){l=!1,t=d(e.parentNode,t,[],r);break}default:if(l=!1,i=s,n(s))if(0===s.length)t.length&&(t=d(e.parentNode,t,[],r));else switch(typeof s[0]){case"string":case"number":case"boolean":c(String(s));break;case"function":c(s.map(K,e));break;case"object":n(s[0])&&(s=s.concat.apply([],s));default:t=d(e.parentNode,t,s,r)}else(e=>"ELEMENT_NODE"in e)(s)?t=d(e.parentNode,t,11===s.nodeType?P.call(s.childNodes):[s],r):"text"in s?c(String(s.text)):"any"in s?c(s.any):"html"in s?t=d(e.parentNode,t,P.call(o([].concat(s.html).join(""),a).childNodes),r):"length"in s&&c(P.call(s))}};return c},text(e){let t;const n=r=>{if(t!==r){t=r;const o=typeof r;"object"===o&&r?"text"in r?n(String(r.text)):"any"in r?n(r.any):"html"in r?n([].concat(r.html).join("")):"length"in r&&n(P.call(r).join("")):"function"===o?n(r(e)):e.textContent=null==r?"":r}};return n}};const Q=new WeakMap,U=new WeakMap;let X=null;const Y=re("html"),ee=re("svg");function te(e,t){return e.nodeType===r?e.valueOf(t):e}function ne(e,t){return function(){const n=e(null);return null===n.current&&(n.current=t.for(n)),te(n.current.apply(null,arguments),!1)}}function re(e){const t=new WeakMap;return n.for=((n,r)=>{const o=t.get(n)||function(e){const n={$:null};return t.set(e,n),n}(n);return null==r&&(r="$"),o[r]||function(t,n){let r=null;const o=new J(e);return t[n]=function(){const e=o.apply(null,arguments);return r||(r=ae(e))}}(o,r)}),n;function n(){const t=arguments;return X?new ie(e,t):new J(e).apply(null,t)}}function oe(e){const{i:t,length:r,stack:o}=X,{type:a,args:i}=e,l=t<r;if(X.i++,function e(t,r){for(const{length:o}=t;r<o;r++){const o=t[r];o&&(o instanceof ie?t[r]=oe(o):n(o)&&(t[r]=e(o,0)))}return t}(i,1),l){const{tagger:e,tpl:n,kind:r,wire:l}=o[t];if(a===r&&n===i[0])return e.apply(null,i),l}const c=new J(a),s={tagger:c,tpl:i[0],kind:a,wire:ae(c.apply(null,i))};return l?o[t]=s:X.length=o.push(s),t<1&&(X.update=!0),s.wire}function ae(e){const n=e.childNodes,{length:r}=n;return 1===r?n[0]:r?new t(n):e}function ie(e,t){this.type=e,this.args=t}return e.hook=(e=>({html:ne(e,Y),svg:ne(e,ee)})),e.render=function(e,t){const{forced:n,value:r}=function(e,t){const n=X;(X=Q.get(e)||function(e){const t={i:0,length:0,stack:[],update:!1};return Q.set(e,t),t}(e)).i=0;let r={forced:!1,value:t.call(this)};if(r.value instanceof ie){r.value=oe(r.value);const{i:e,length:t,stack:n}=X;e<t&&(X.length=e,n.splice(e)),X.update&&(X.update=!1,r.forced=!0)}return X=n,r}.call(this,e,t),o=U.get(e);return(n||o!==r)&&(U.set(e,r),function(e,t){e.textContent="",e.appendChild(t)}(e,te(r,!0))),e},e.html=Y,e.svg=ee,e}({});
