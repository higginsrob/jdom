# JDOM.js [![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhigginsrob%2Fjdom%2Fbadge&style=flat)](https://actions-badge.atrox.dev/higginsrob/jdom/goto)

### Installation

```
npm install --save jdom

```

### Import

```
import { domFactory, svgFactory, style } from 'jdom';
```

---

### Compose DOM Example

##### example:

```
const {div, script, span} = domFactory;
const myDiv = div({
     parent: document.body
     id: 'myDiv',
     style: {
         color: 'red'
     },
     dataset: {
         foo: 'bar'
     },
     children: [
         'injecting script',
         script({src: 'http://some.url'}),
         'done'
     ],
     click: () => {
         alert('now');
     }
 });
 span({parent: myDiv, children: ['SomeText!!!!']);
```

---

### Compose SVG Example

##### example:

```
 const {svg, rect, circle} = svgFactory;

 svg({
     id: 'mySVG',
     width: 200,
     height: 200,
     viewBox: '0 0 200 200',
     children: [
         rect({
             fill : 'red',
             x:5,
             y:5,
             width: 190,
             height: 190
         }),
         circle({
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

### style (_HTMLElement_ **elem**, _object_ **props**)

_update element style_

##### example:

```
 const a = document.getElementById('aDiv');
 style(a, {
     color: 'green',
     backgroundColor: 'red'
 })
```

---

### QueryList(\$) (_string_/_element_/_nodelist_/_array_/_function_ **selector**)

##### example:

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

#### Querylist Event Methods

-   on
-   once
-   off
-   dispatch

#### Querylist Style Methods

-   style
-   hasClass
-   addClass
-   removeClass

#### Querylist Array Prototype Methods

-   filter
-   forEach
-   map
-   pop
-   push
-   shift
-   slice
-   some
-   splice
-   unshift
