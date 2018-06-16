



# JDOM.js

_lightweight dom builder_

---







##### installation

```
npm install jdom

```

#### usage

_intended usage with webpack or browserify_

```
import {
   createElement, updateElement,
   DIV, SPAN, SCRIPT, STYLE, // ...etc
   on, once, off, dispatch,
   currentScript,
   style,
   isObject, isArray, isElement
} from 'jdom';
```

---






__createElement__ (_string_ __tag__, _object_ __props__, _string_ __ns__);

_create dom/svg elements_

##### example
```
 const container = createElement('div', {
     id: 'myDiv',
     className: 'myClass',
     style: {
         color: 'red'
     },
     dataset: {
         foo: 'bar'
     },
     click: () => {
         container.style.color = 'blue';
     }
 });
```








---






__createSvgElement__ (_string_ __tag__, _object_ __props__);

_create dom/svg elements_

##### example
```
 const container = createSvgElement('svg', {
     id: 'mySvg',
     children: [
         createSvgElement('path', {
             d: 'M10 10'
         })
     ]
 });
```







---






__updateElement__ (_HTMLElement_ __elem__, _object_ __props__);

_update dom elements_

##### example
```
 const element = document.getElementById('asdf');
 const container = updateElement(element, {
     style: {
         color: 'blue'
     }
 })
```







---






__DOM FACTORY METHODS__

_syntactic sugar_

elements: 'link', 'meta', 'style', 'title', 'address', 'article', 'aside', 'footer', 'header', 'h1','h2','h3', 'h4','h5','h6', 'hgroup', 'nav', 'section', 'blockquote', 'dd', 'dir', 'div', 'dl', 'figcaption', 'figure', 'hr', 'li', 'main', 'ol', 'p', 'pre', 'ul', 'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kdb', 'mark', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'tt', 'u', 'var', 'wbr', 'area', 'audio', 'img', 'map', 'track', 'video', 'applet', 'embed', 'iframe', 'noembed', 'object', 'param', 'picture', 'source', 'canvas', 'noscript', 'script', 'del', 'ins', 'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details', 'dialog', 'menu', 'menuitem', 'summary', 'content', 'element', 'shadow', 'slot', 'template'

##### example
```
import {DIV, SCRIPT, SPAN} from 'jdom';

 const div = DIV({
     id: 'myDiv',
     children: [
         'injecting script',
         SCRIPT({src: 'http://some.url'}),
         'done'
     ],
     parent: document.body
 });

 SPAN({parent: div, children: ['!!!!']);
```






---






__SVG FACTORY METHODS__

_syntactic sugar_

elements: 'a', 'altGyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'discard', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hatch', 'hatchpath', 'hkern', 'image', 'line', 'linearGradient', 'marker', 'mask', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'set', 'solidcolor', 'stop', 'style', 'svg', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'unknown', 'use', 'view', 'vkern'

##### example
```
import {SVG, RECT, CIRCLE} from 'jdom';

 SVG({
     id: 'mySVG',
     width: 200,
     height: 200,
     viewBox: '0 0 200 200',
     children: [
         RECT({
             fill : 'red',
             x:5,
             y:5,
             width: 190,
             height: 190
         }),
         CIRCLE({
             fill: 'yellow',
             cx: 100,
             cy:100,
             r:80
         })
     ],
     parent: document.body
 });
```







---






#### event management

* __on__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__, _object_ __options__)
* __once__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__, _object_ __options__)
* __off__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__, _object_ __options__)
* __dispatch__ (_HTMLElement_ __elem__, _string_ __event__);

##### example
```
 const a = document.getElementById('aDiv');
 const mouseover = () => {
     a.style.backgroundColor = 'red';
 }
 on(a, 'mouseover', mouseover);
 once(a, 'click', () => {
     off(a, 'mouseover', mouseover);
 });
 window.setTimeout(() => {
     dispatch(a, 'click');
 }, 2000);
```






---






__currentScript__ ()

_get the currently executing script_

##### example

```
const thisScript = currentScript();
console.log(thisScript.src);
```






---






__style__ (_HTMLElement_ __elem__, _object_ __props__)

_update element style_

##### example
```
 const a = document.getElementById('aDiv');
 style(a, {
     color: 'green',
     backgroundColor: 'red'
 })
```







---






__QueryList ($)__ (_string_/_element_/_nodelist_/_array_/_function_ __selector__)

##### example
```
 const $a = $('#aDiv');
 $a.on('click', () => {
     if ($a.hasClass('foo')) {
         $a.removeClass('foo').addClass('bar');
     } else {
         $a.removeClass('bar').addClass('foo');
     }
 });
 $a.dispatch('click');
```







## utilities

* __type (_object_ __obj__)
    * returns element class name by Object.toString
    * example: if Object.toString('asdf') === '[object String]' then 'String'
* __isObject__ (_object_ __obj__)
* __isArray__ (_object_ __obj__)
* __isElement__ (_object_ __obj__)
* __toCamelCase__ (_string_ __str__)
* __setChildren (_object_ _obj_, _array_ _children_))




