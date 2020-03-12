/*! (c) Andrea Giammarchi - ISC */
var lighterhtml=function(e,t){"use strict";var n={};try{n.WeakMap=WeakMap}catch(e){n.WeakMap=function(e,t){var n=t.defineProperty,r=t.hasOwnProperty,a=i.prototype;return a.delete=function(e){return this.has(e)&&delete e[this._]},a.get=function(e){return this.has(e)?e[this._]:void 0},a.has=function(e){return r.call(e,this._)},a.set=function(e,t){return n(e,this._,{configurable:!0,value:t}),this},i;function i(t){n(this,"_",{value:"_@ungap/weakmap"+e++}),t&&t.forEach(o,this)}function o(e){this.set(e[0],e[1])}}(Math.random(),Object)}var r=n.WeakMap,a=!1,i=function(t){var n,u=(n=(e.defaultView.navigator||{}).userAgent,/(Firefox|Safari)\/(\d+)/.test(n)&&!/(Chrom[eium]+|Android)\/(\d+)/.test(n)),c=!("raw"in t)||t.propertyIsEnumerable("raw")||!Object.isFrozen(t.raw);if(u||c){var l={},s=function(e){for(var t=".",n=0;n<e.length;n++)t+=e[n].length+"."+e[n];return l[t]||(l[t]=e)};if(c)i=s;else{var f=new r;i=function(e){return f.get(e)||function(e,t){return f.set(e,t),t}(e,s(e))}}}else a=!0;return o(t)};function o(e){return a?e:i(e)}var u,c="-"+Math.random().toFixed(6)+"%",l=!1;try{"content"in(u=e.createElement("template"))&&(u.innerHTML='<p tabindex="'+c+'"></p>',u.content.childNodes[0].getAttribute("tabindex")==c)||(c="_dt: "+c.slice(1,-1)+";",l=!0)}catch(e){}var s="\x3c!--"+c+"--\x3e",f=8,h=1,v=3,p=/^(?:style|textarea)$/i,d=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;function g(e){return e.join(s).replace(C,L).replace(N,A)}var y=" \\f\\n\\r\\t",m="[^"+y+"\\/>\"'=]+",b="["+y+"]+"+m,w="<([A-Za-z]+[A-Za-z0-9:._-]*)((?:",x="(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+m.replace("\\/","")+"))?)",N=new RegExp(w+b+x+"+)(["+y+"]*/?>)","g"),C=new RegExp(w+b+x+"*)(["+y+"]*/>)","g"),k=new RegExp("("+b+"\\s*=\\s*)(['\"]?)"+s+"\\2","gi");function A(e,t,n,r){return"<"+t+n.replace(k,E)+r}function E(e,t,n){return t+(n||'"')+c+(n||'"')}function L(e,t,n){return d.test(t)?e:"<"+t+n+"></"+t+">"}var j=Array.isArray,O=[].slice,S=function(t,n){return 111===t.nodeType?1/n<0?n?(a=(r=t).firstChild,i=r.lastChild,(o=e.createRange()).setStartAfter(a),o.setEndAfter(i),o.deleteContents(),a):t.lastChild:n?t.valueOf():t.firstChild:t;var r,a,i,o},T=function(e){var t="fragment",n="content"in a("template")?function(e){var t=a("template");return t.innerHTML=e,t.content}:function(e){var n=a(t),i=a("template"),o=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var u=RegExp.$1;i.innerHTML="<table>"+e+"</table>",o=i.querySelectorAll(u)}else i.innerHTML=e,o=i.childNodes;return r(n,o),n};return function(e,i){return("svg"===i?function(e){var n=a(t),i=a("div");return i.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",r(n,i.firstChild.childNodes),n}:n)(e)};function r(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function a(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}}(e),M=[].indexOf,_=function(e,t,n,r,a,i){for(var o=("selectedIndex"in t),u=o;r<a;){var c=e(n[r],1);if(t.insertBefore(c,i),o&&u&&c.selected){u=!u;var l=t.selectedIndex;t.selectedIndex=l<0?r:M.call(t.querySelectorAll("option"),c)}r++}},$=function(e,t){return e==t},H=function(e){return e},R=function(e,t,n,r,a,i,o){var u=i-a;if(u<1)return-1;for(;n-t>=u;){for(var c=t,l=a;c<n&&l<i&&o(e[c],r[l]);)c++,l++;if(l===i)return t;t=c+1}return-1},z=function(e,t,n,r,a){return n<r?e(t[n],0):0<n?e(t[n-1],-0).nextSibling:a},D=function(e,t,n,r){for(;n<r;)W(e(t[n++],-1))},F=function(e,t,n){for(var r=1,a=t;r<a;){var i=(r+a)/2>>>0;n<e[i]?a=i:r=i+1}return r},I=function(e,t,n,r,a,i,o,u,c,l,s,f,h){!function(e,t,n,r,a,i,o,u,c){for(var l=[],s=e.length,f=o,h=0;h<s;)switch(e[h++]){case 0:a++,f++;break;case 1:l.push(r[a]),_(t,n,r,a++,a,f<u?t(i[f],0):c);break;case-1:f++}for(h=0;h<s;)switch(e[h++]){case 0:o++;break;case-1:-1<l.indexOf(i[o])?o++:D(t,i,o++,o)}}(function(e,t,n,r,a,i,o){var u,c,l,s,f,h,v,p=n+i,d=[];e:for(u=0;u<=p;u++){if(u>50)return null;for(v=u-1,f=u?d[u-1]:[0,0],h=d[u]=[],c=-u;c<=u;c+=2){for(l=(s=c===-u||c!==u&&f[v+c-1]<f[v+c+1]?f[v+c+1]:f[v+c-1]+1)-c;s<i&&l<n&&o(r[a+s],e[t+l]);)s++,l++;if(s===i&&l===n)break e;h[u+c]=s}}var g=Array(u/2+p/2),y=g.length-1;for(u=d.length-1;u>=0;u--){for(;s>0&&l>0&&o(r[a+s-1],e[t+l-1]);)g[y--]=0,s--,l--;if(!u)break;v=u-1,f=u?d[u-1]:[0,0],(c=s-l)==-u||c!==u&&f[v+c-1]<f[v+c+1]?(l--,g[y--]=1):(s--,g[y--]=-1)}return g}(n,r,i,o,u,l,f)||function(e,t,n,r,a,i,o,u){var c=0,l=r<u?r:u,s=Array(l++),f=Array(l);f[0]=-1;for(var h=1;h<l;h++)f[h]=o;for(var v=a.slice(i,o),p=t;p<n;p++){var d=v.indexOf(e[p]);if(-1<d){var g=d+i;-1<(c=F(f,l,g))&&(f[c]=g,s[c]={newi:p,oldi:g,prev:s[c-1]})}}for(c=--l,--o;f[c]>o;)--c;l=u+r-c;var y=Array(l),m=s[c];for(--n;m;){for(var b=m,w=b.newi,x=b.oldi;n>w;)y[--l]=1,--n;for(;o>x;)y[--l]=-1,--o;y[--l]=0,--n,--o,m=m.prev}for(;n>=t;)y[--l]=1,--n;for(;o>=i;)y[--l]=-1,--o;return y}(n,r,a,i,o,u,c,l),e,t,n,r,o,u,s,h)},W=function(e){return(e.remove||function(){var e=this.parentNode;e&&e.removeChild(this)}).call(e)};var Z=function(e,t,n,r){r||(r={});for(var a=r.compare||$,i=r.node||H,o=null==r.before?null:i(r.before,0),u=t.length,c=u,l=0,s=n.length,f=0;l<c&&f<s&&a(t[l],n[f]);)l++,f++;for(;l<c&&f<s&&a(t[c-1],n[s-1]);)c--,s--;var h=l===c,v=f===s;if(h&&v)return n;if(h&&f<s)return _(i,e,n,f,s,z(i,t,l,u,o)),n;if(v&&l<c)return D(i,t,l,c),n;var p=c-l,d=s-f,g=-1;if(p<d){if(-1<(g=R(n,f,s,t,l,c,a)))return _(i,e,n,f,g,i(t[l],0)),_(i,e,n,g+p,s,z(i,t,c,u,o)),n}else if(d<p&&-1<(g=R(t,l,c,n,f,s,a)))return D(i,t,l,g),D(i,t,g+d,c),n;return p<2||d<2?(_(i,e,n,f,s,i(t[l],0)),D(i,t,l,c),n):p===d&&function(e,t,n,r,a,i){for(;r<a&&i(n[r],e[t-1]);)r++,t--;return 0===t}(n,s,t,l,c,a)?(_(i,e,n,f,s,z(i,t,c,u,o)),n):(I(i,e,n,f,s,d,t,l,c,p,u,a,o),n)},P=function(e,t,n,r,a){var i="importNode"in e,o=e.createDocumentFragment();return o.appendChild(e.createTextNode("g")),o.appendChild(e.createTextNode("")),(i?e.importNode(o,!0):o.cloneNode(!0)).childNodes.length<2?function e(t,n){for(var r=t.cloneNode(),a=t.childNodes||[],i=a.length,o=0;n&&o<i;o++)r.appendChild(e(a[o],n));return r}:i?e.importNode:function(e,t){return e.cloneNode(!!t)}}(e),V="".trim||function(){return String(this).replace(/^\s+|\s+/g,"")},q=l?function(e,t){var n=t.join(" ");return t.slice.call(e,0).sort(function(e,t){return n.indexOf(e.name)<=n.indexOf(t.name)?-1:1})}:function(e,t){return t.slice.call(e,0)};function G(e,t){for(var n=t.length,r=0;r<n;)e=e.childNodes[t[r++]];return e}function B(t,n,r,a){for(var i=t.attributes,o=[],u=[],f=q(i,r),h=f.length,v=0;v<h;){var p,d=f[v++],g=d.value===c;if(g||1<(p=d.value.split(s)).length){var y=d.name;if(o.indexOf(y)<0){o.push(y);var m=r.shift().replace(g?/^(?:|[\S\s]*?\s)(\S+?)\s*=\s*('|")?$/:new RegExp("^(?:|[\\S\\s]*?\\s)("+y+")\\s*=\\s*('|\")[\\S\\s]*","i"),"$1"),b=i[m]||i[m.toLowerCase()];if(g)n.push(K(b,a,m,null));else{for(var w=p.length-2;w--;)r.shift();n.push(K(b,a,m,p))}}u.push(d)}}v=0;for(var x=(0<(h=u.length)&&l&&!("ownerSVGElement"in t));v<h;){var N=u[v++];x&&(N.value=""),t.removeAttribute(N.name)}var C=t.nodeName;if(/^script$/i.test(C)){var k=e.createElement(C);for(h=i.length,v=0;v<h;)k.setAttributeNode(i[v++].cloneNode(!0));k.textContent=t.textContent,t.parentNode.replaceChild(k,t)}}function J(e,t){return{type:"any",node:e,path:t}}function K(e,t,n,r){return{type:"attr",node:e,path:t,name:n,sparse:r}}function Q(e,t){return{type:"text",node:e,path:t}}var U=new r;function X(e,t){var n=(e.convert||g)(t),r=e.transform;r&&(n=r(n));var a=T(n,e.type);te(a);var i=[];!function e(t,n,r,a){for(var i=t.childNodes,o=i.length,u=0;u<o;){var l=i[u];switch(l.nodeType){case h:var d=a.concat(u);B(l,n,r,d),e(l,n,r,d);break;case f:var g=l.textContent;if(g===c)r.shift(),n.push(p.test(t.nodeName)?Q(t,a):J(l,a.concat(u)));else switch(g.slice(0,2)){case"/*":if("*/"!==g.slice(-2))break;case"👻":t.removeChild(l),u--,o--}break;case v:p.test(t.nodeName)&&V.call(l.textContent)===s&&(r.shift(),n.push(Q(t,a)))}u++}}(a,i,t.slice(0),[]);var o={content:a,updates:function(n){for(var r=[],a=i.length,o=0,u=0;o<a;){var c=i[o++],l=G(n,c.path);switch(c.type){case"any":r.push({fn:e.any(l,[]),sparse:!1});break;case"attr":var s=c.sparse,f=e.attribute(l,c.name,c.node);null===s?r.push({fn:f,sparse:!1}):(u+=s.length-2,r.push({fn:f,sparse:!0,values:s}));break;case"text":r.push({fn:e.text(l),sparse:!1}),l.textContent=""}}return a+=u,function(){var e=arguments.length;if(a!==e-1)throw new Error(e-1+" values instead of "+a+"\n"+t.join("${value}"));for(var i=1,o=1;i<e;){var u=r[i-o];if(u.sparse){var c=u.values,l=c[0],s=1,f=c.length;for(o+=f-2;s<f;)l+=arguments[i++]+c[s++];u.fn(l)}else u.fn(arguments[i++])}return n}}};return U.set(t,o),o}var Y=[];function ee(t){var n=Y,r=te;return function(a){return n!==a&&(r=function(t,n){var r=U.get(n)||X(t,n);return r.updates(P.call(e,r.content,!0))}(t,n=a)),r.apply(null,arguments)}}function te(e){for(var t=e.childNodes,n=t.length;n--;){var r=t[n];1!==r.nodeType&&0===V.call(r.textContent).length&&e.removeChild(r)}}var ne=function(){var e=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,t=/([^A-Z])([A-Z]+)/g;return function(e,t){return"ownerSVGElement"in e?function(e,t){var n;t?n=t.cloneNode(!0):(e.setAttribute("style","--hyper:style;"),n=e.getAttributeNode("style"));return n.value="",e.setAttributeNode(n),r(n,!0)}(e,t):r(e.style,!1)};function n(e,t,n){return t+"-"+n.toLowerCase()}function r(r,a){var i,o;return function(u){var c,l,s,f;switch(typeof u){case"object":if(u){if("object"===i){if(!a&&o!==u)for(l in o)l in u||(r[l]="")}else a?r.value="":r.cssText="";for(l in c=a?{}:r,u)s="number"!=typeof(f=u[l])||e.test(l)?f:f+"px",!a&&/^--/.test(l)?c.setProperty(l,s):c[l]=s;i="object",a?r.value=function(e){var r,a=[];for(r in e)a.push(r.replace(t,n),":",e[r],";");return a.join("")}(o=c):o=u;break}default:o!=u&&(i="string",o=u,a?r.value=u||"":r.cssText=u||"")}}}}(),re=function(e,t){var n,r=!1,a=t.cloneNode(!0);return function(t){n!==t&&(n=t,a.value!==t&&(null==t?(r&&(r=!1,e.removeAttributeNode(a)),a.value=t):(a.value=t,r||(r=!0,e.setAttributeNode(a)))))}},ae=function(e,t){var n;return function(r){n!==r&&(n=r,e[t]!==r&&(null==r?(e[t]="",e.removeAttribute(t)):e[t]=r))}},ie=/^(?:form|list)$/i;function oe(e){return this.type=e,ee(this)}function ue(e){return e(this)}oe.prototype={attribute:function(e,t,n){var r="svg"===this.type;switch(t){case"class":if(r)return re(e,n);t="className";case"data":case"props":return ae(e,t);case"style":return ne(e,n,r);case"ref":return function(e){return function(t){t.current=e}}(e);default:return"."===t.slice(0,1)?function(e,t,n){return n?function(n){try{e[t]=n}catch(r){e.setAttribute(t,n)}}:function(n){e[t]=n}}(e,t.slice(1),r):"on"===t.slice(0,2)?function(e,t){var n,r=t.slice(2);return t.toLowerCase()in e&&(r=r.toLowerCase()),function(t){var a=j(t)?t:[t,!1];n!==a[0]&&(n&&e.removeEventListener(r,n,a[1]),(n=a[0])&&e.addEventListener(r,n,a[1]))}}(e,t):t in e&&!r&&!ie.test(t)?ae(e,t):re(e,n)}},any:function(e,t){var n,r={node:S,before:e},a=this.type,i=!1;return function o(u){switch(typeof u){case"string":case"number":case"boolean":i?n!==u&&(n=u,t[0].textContent=u):(i=!0,n=u,t=Z(e.parentNode,t,[function(e,t){return e.ownerDocument.createTextNode(t)}(e,u)],r));break;case"function":o(u(e));break;case"object":case"undefined":if(null==u){i=!1,t=Z(e.parentNode,t,[],r);break}default:if(i=!1,n=u,j(u))if(0===u.length)t.length&&(t=Z(e.parentNode,t,[],r));else switch(typeof u[0]){case"string":case"number":case"boolean":o(String(u));break;case"function":o(u.map(ue,e));break;case"object":j(u[0])&&(u=u.concat.apply([],u));default:t=Z(e.parentNode,t,u,r)}else!function(e){return"ELEMENT_NODE"in e}(u)?"text"in u?o(String(u.text)):"any"in u?o(u.any):"html"in u?t=Z(e.parentNode,t,O.call(T([].concat(u.html).join(""),a).childNodes),r):"length"in u&&o(O.call(u)):t=Z(e.parentNode,t,11===u.nodeType?O.call(u.childNodes):[u],r)}}},text:function(e){var t;return function n(r){if(t!==r){t=r;var a=typeof r;"object"===a&&r?"text"in r?n(String(r.text)):"any"in r?n(r.any):"html"in r?n([].concat(r.html).join("")):"length"in r&&n(O.call(r).join("")):"function"===a?n(r(e)):e.textContent=null==r?"":r}}}};var ce=Object.create,le=Object.freeze,se=Object.keys,fe=oe.prototype,he=new r,ve=function(e){return{html:pe("html",e),svg:pe("svg",e),render:function(t,n){var r="function"==typeof n?n():n,a=he.get(t)||ge(t),i=r instanceof be?de(e,a,r):r;return i!==a.wire&&(a.wire=i,t.textContent="",t.appendChild(i.valueOf())),t}}},pe=function(e,t){var n=new r;return a.for=function(e,r){var i,o=n.get(e)||function(e){var t=ce(null);return n.set(e,t),t}(e);return o[r]||(o[r]=(i={sub:[],stack:[],wire:null},function(){return de(t,i,a.apply(null,arguments))}))},a.node=function(){return de(t,{sub:[],stack:[],wire:null},a.apply(null,arguments)).valueOf()},a;function a(){return new be(e,function(e){for(var t=arguments.length,n=[o(e)],r=1;r<t;)n.push(arguments[r++]);return n}.apply(null,arguments))}},de=function(e,t,n){var r=t.sub,a=t.stack,i={a:0,aLength:r.length,i:0,iLength:a.length},o=ye(e,t,n,i),u=i.a,c=i.i,l=i.iLength;return u<i.aLength&&r.splice(u),c<l&&a.splice(c),o},ge=function(e){var t={sub:[],stack:[],wire:null};return he.set(e,t),t},ye=function(e,t,n,r){var a=t.stack,i=r.i,o=r.iLength,u=n.type,c=n.args,l=i===o;l&&(r.iLength=a.push({type:u,id:c[0],tag:null,wire:null})),r.i++,me(e,t,c,r);var s=a[i];return l||s.id!==c[0]||s.type!==u?(s.type=u,s.id=c[0],s.tag=new e(u),s.wire=function(e){var t=e.childNodes,n=t.length;if(n<2)return t[0];var r=O.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf:function(){if(t.length!==n)for(var a=0;a<n;)e.appendChild(r[a++]);return e}}}(s.tag.apply(null,c))):s.tag.apply(null,c),s.wire},me=function(e,t,n,r){for(var a=r.a,i=r.aLength,o=1,u=n.length,c=t.sub;o<u;o++){var l=n[o];if("object"==typeof l&&l)if(l instanceof be)n[o]=ye(e,t,l,r);else if(j(l)){for(var s=a+l.length;i<s;)i=c.push(null);for(var f=0,h=l.length;f<h;f++){var v=l[f];"object"==typeof v&&v&&v instanceof be&&(l[f]=de(e,c[a]||(c[a]={sub:[],stack:[],wire:null}),v)),a++}}a++}r.a=a,r.aLength=i};function be(e,t){this.type=e,this.args=t}le(be);var we=be,xe=ve(oe),Ne=xe.render,Ce=xe.html,ke=xe.svg;return t.Hole=we,t.custom=function(e){var t=ce(fe);return se(e).forEach(function(n){t[n]=e[n](t[n]||("convert"===n?g:String))}),n.prototype=t,ve(n);function n(){return oe.apply(this,arguments)}},t.html=Ce,t.render=Ne,t.svg=ke,t}(document,{});
