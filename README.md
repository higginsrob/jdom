



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
const {
   createElement, updateElement,
   DIV, SPAN, SCRIPT, STYLE, // ...etc
   $, $$,
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
     id: 'a',
     style: {
         color: 'red'
     },
     click: () => {
         this.style.color = 'blue';
     }
 })
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

_syntastic sugar_

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

_syntastic sugar_

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






#### aliases

##### example
```
const b = $('#b');
const c = $$('.c');
```






---






#### event management

* __on__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__)
* __once__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__)
* __off__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__)
* __dispatch__ (_HTMLElement_ __elem__, _string_ __event__);

##### example
```
 const someDiv = document.getElementById('someDiv');
 on(someDiv, 'mouseover', () => {
     someDiv.style.backgroundColor = 'red';
 });
 once(someDiv, 'click', () => {
     someDiv.parentNode.removeChild(someDiv);
 });
 off(someDiv, 'click', someFunction);
 dispatch(someDiv, 'click');
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
 const someDiv = document.getElementById('someDiv');
 style(someDiv, {
     color: 'green',
     backgroundColor: 'red'
 })
```







---






## utilities

* __isObject__ (_object_ __obj__)
* __isArray__ (_object_ __obj__)
* __isElement__ (_object_ __obj__)
* __toCamelCase__ (_string_ __str__)







---









