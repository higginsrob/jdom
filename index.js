// # JDOM.js
//
// _lightweight dom builder_
//
// ---
//
// ##### installation
//
// ```
// npm install jdom
//
// ```
//
// #### usage
//
// _intended usage with webpack or browserify_
//
// ```
// const {
//    createElement, updateElement,
//    DIV, SPAN, SCRIPT, STYLE, // ...etc
//    on, once, off, dispatch,
//    currentScript,
//    style,
//    isObject, isArray, isElement
// } from 'jdom';
// ```
//
// ---
// __createElement__ (_string_ __tag__, _object_ __props__, _string_ __ns__);
//
// _create dom/svg elements_
//
// ##### example
// ```
//  const container = createElement('div', {
//      id: 'a',
//      style: {
//          color: 'red'
//      },
//      click: () => {
//          this.style.color = 'blue';
//      }
//  })
// ```
//
const createElement = module.exports = function createElement(tag, props, ns) {
    const elem = isElement(tag)
        ? tag
        : typeof ns === 'string'
            ? document.createElementNS(ns, tag)
            : document.createElement(tag);
    if (isObject(props)) {
        Object.keys(props).forEach(function(key) {
            if (key === 'style') {
                if (isObject(props.style)) {
                    style(elem, props.style);
                }
            } else if (key === 'dataset') {
                if (isObject(props.dataset)){
                    Object.keys(props.dataset).forEach((key) => {
                        elem.dataset[key] = props.dataset[key];
                    });
                }
            } else if (key === 'parent' && props.parent instanceof HTMLElement) {
                props.parent.appendChild(elem);
            } else if (key === 'children') {
                if (isArray(props.children)) {
                    props.children.forEach(function(child) {
                        if (child instanceof SVGElement || child instanceof HTMLElement) {
                            elem.appendChild(child);
                        } else if (typeof child === 'string') {
                            elem.appendChild(document.createTextNode(child));
                        }
                    });
                }
            } else if (typeof props[key] === 'function') {
                elem.addEventListener(key, props[key]);
            } else if (typeof ns === 'string') {
                elem.setAttributeNS(null, key, props[key]);
            } else {
                elem[toCamelCase(key)] = props[key];
            }
        });
    } else if (typeof props === 'string') {
        elem.innerHTML = props;
    }
    return elem;
}
// ---
// __updateElement__ (_HTMLElement_ __elem__, _object_ __props__);
//
// _update dom elements_
//
// ##### example
// ```
//  const element = document.getElementById('asdf');
//  const container = updateElement(element, {
//      style: {
//          color: 'blue'
//      }
//  })
// ```
//
module.exports.updateElement = createElement;
// ---
// __DOM FACTORY METHODS__
//
// _syntastic sugar_
//
// ##### example
// ```
// import {DIV, SCRIPT, SPAN} from 'jdom';
//
//  const div = DIV({
//      id: 'myDiv',
//      children: [
//          'injecting script',
//          SCRIPT({src: 'http://some.url'}),
//          'done'
//      ],
//      parent: document.body
//  });
//
//  SPAN({parent: div, children: ['!!!!']);
// ```
//
module.exports.META = function META(props) {
    return createElement('meta', props);
}
module.exports.SCRIPT = function SCRIPT(props) {
    return createElement('script', props);
}
module.exports.BR = function BR(props) {
    return createElement('br', props);
}
module.exports.STYLE = function STYLE(props) {
    return createElement('style', props);
}
module.exports.DIV = function DIV(props) {
    return createElement('div', props);
}
module.exports.SPAN = function SPAN(props) {
    return createElement('span', props);
}
module.exports.A = function A(props) {
    return createElement('a', props);
}
module.exports.I = function I(props) {
    return createElement('i', props);
}
module.exports.IMG = function IMG(props) {
    return createElement('img', props);
}
module.exports.INPUT = function IMG(props) {
    return createElement('input', props);
}
module.exports.BUTTON = function IMG(props) {
    return createElement('button', props);
}
module.exports.VIDEO = function VIDEO(props) {
    return createElement('video', props);
}
module.exports.CANVAS = function CANVAS(props) {
    return createElement('canvas', props);
}
module.exports.IFRAME = function IFRAME(props) {
    return createElement('iframe', props);
}
module.exports.LABEL = function LABEL(props) {
    return createElement('LABEL', props);
}
// ---
// __SVG FACTORY METHODS__
//
// _syntastic sugar_
//
// ##### example
// ```
// import {SVG, RECT, CIRCLE} from 'jdom';
//
//  SVG({
//      id: 'mySVG',
//      width: 200,
//      height: 200,
//      viewBox: '0 0 200 200',
//      children: [
//          RECT({
//              fill : 'red',
//              x:5,
//              y:5,
//              width: 190,
//              height: 190
//          }),
//          CIRCLE({
//              fill: 'yellow',
//              cx: 100,
//              cy:100,
//              r:80
//          })
//      ],
//      parent: document.body
//  });
// ```
//
const defaultNameSpace = 'http://www.w3.org/2000/svg';

module.exports.SVG = function SVG(props) {
    return createElement('svg', props, defaultNameSpace);
}
module.exports.DEFS = function DEFS(props) {
    return createElement('defs', props, defaultNameSpace);
}
module.exports.G = function G(props) {
    return createElement('g', props, defaultNameSpace);
}
module.exports.CIRCLE = function CIRCLE(props) {
    return createElement('circle', props, defaultNameSpace);
}
module.exports.RECT = function RECT(props) {
    return createElement('rect', props, defaultNameSpace);
}
module.exports.PATH = function PATH(props) {
    return createElement('path', props, defaultNameSpace);
}
module.exports.TEXT = function TEXT(props) {
    return createElement('text', props, defaultNameSpace);
}
module.exports.ANIMATE = function ANIMATE(props) {
    return createElement('animate', props, defaultNameSpace);
}
module.exports.ANIMATETRANSFORM = function ANIMATETRANSFORM(props) {
    return createElement('animateTransform', props, defaultNameSpace);
}
// ---
// #### event management
//
// * __on__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__)
// * __once__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__)
// * __off__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__)
// * __dispatch__ (_HTMLElement_ __elem__, _string_ __event__);
//
// ##### example
// ```
//  const someDiv = document.getElementById('someDiv');
//  on(someDiv, 'mouseover', () => {
//      someDiv.style.backgroundColor = 'red';
//  });
//  once(someDiv, 'click', () => {
//      someDiv.parentNode.removeChild(someDiv);
//  });
//  off(someDiv, 'click', someFunction);
//  dispatch(someDiv, 'click');
// ```
module.exports.on = (element, event, handler) => {
    element.addEventListener(event, handler);
};
module.exports.once = (element, event, handler) => {
    element.addEventListener(event, handler, {once: true});
};
module.exports.off = (element, event, handler) => {
    element.removeEventListener(event, handler);
};
module.exports.dispatch = (elem, event) => {
    const evt = new Event(event);
    elem.dispatchEvent(evt);
};
// ---
// __currentScript__ ()
//
// _get the currently executing script_
//
// ##### example
//
// ```
// const thisScript = currentScript();
// console.log(thisScript.src);
// ```
module.exports.currentScript = function currentScript() {
    if (document.currentScript) {
        return document.currentScript;
    }
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
};
// ---
// __style__ (_HTMLElement_ __elem__, _object_ __props__)
//
// _update element style_
//
// ##### example
// ```
//  const someDiv = document.getElementById('someDiv');
//  style(someDiv, {
//      color: 'green',
//      backgroundColor: 'red'
//  })
// ```
//
const style = module.exports.style = function style(elem, props) {
    if (isElement(elem) && isObject(props)){
        Object.keys(props).forEach((key) => {
            elem.style[key] = props[key];
        });
    }
}
// ---
// ## utilities
//
// * __isObject__ (_object_ __obj__)
// * __isArray__ (_object_ __obj__)
// * __isElement__ (_object_ __obj__)
// * __toCamelCase__ (_string_ __str__)
//
const isObject = module.exports.isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj).slice(8,-1) === 'Object';
}
const isArray = module.exports.isArray = function isArray(obj) {
    return Array.isArray(obj);
}
const isElement = module.exports.isElement = function isElement(obj){
    return (
        typeof HTMLElement === "object"
            ? obj instanceof HTMLElement
            : obj
                && typeof obj === "object"
                && obj !== null && obj.nodeType === 1
                && typeof obj.nodeName==="string"
    );
}
const toCamelCase = module.exports.toCamelCase = function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}
// ---

