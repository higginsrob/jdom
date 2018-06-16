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
// import {
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
//      id: 'myDiv',
//      className: 'myClass',
//      style: {
//          color: 'red'
//      },
//      dataset: {
//          foo: 'bar'
//      },
//      click: () => {
//          container.style.color = 'blue';
//      }
//  });
// ```
//
const createElement = module.exports = function createElement(tag, props, ns) {
    if (!tag) {
        return;
    }
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
            } else if (key === 'parent' && isElement(props.parent)) {
                props.parent.appendChild(elem);
            } else if (key === 'children') {
                if (isArray(props.children)) {
                    props.children.forEach(function(child) {
                        if (isElement(child)) {
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
};
//
// ---
// __createSvgElement__ (_string_ __tag__, _object_ __props__);
//
// _create dom/svg elements_
//
// ##### example
// ```
//  const container = createSvgElement('svg', {
//      id: 'mySvg',
//      children: [
//          createSvgElement('path', {
//              d: 'M10 10'
//          })
//      ]
//  });
// ```
//
const defaultNameSpace = 'http://www.w3.org/2000/svg';
const createSvgElement = module.exports = function createSvgElement(tag, props) {
    return createElement(tag, props, defaultNameSpace);
};
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
// _syntactic sugar_
//
// elements: 'link', 'meta', 'style', 'title', 'address', 'article', 'aside', 'footer', 'header', 'h1','h2','h3', 'h4','h5','h6', 'hgroup', 'nav', 'section', 'blockquote', 'dd', 'dir', 'div', 'dl', 'figcaption', 'figure', 'hr', 'li', 'main', 'ol', 'p', 'pre', 'ul', 'a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kdb', 'mark', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'tt', 'u', 'var', 'wbr', 'area', 'audio', 'img', 'map', 'track', 'video', 'applet', 'embed', 'iframe', 'noembed', 'object', 'param', 'picture', 'source', 'canvas', 'noscript', 'script', 'del', 'ins', 'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details', 'dialog', 'menu', 'menuitem', 'summary', 'content', 'element', 'shadow', 'slot', 'template'
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

const domElements = module.exports.domElements = [
    'link',
    'meta',
    'style',
    'title',
    'address',
    'article',
    'aside',
    'footer',
    'header',
    'h1','h2','h3',
    'h4','h5','h6',
    'hgroup',
    'nav',
    'section',
    'blockquote',
    'dd',
    'dir',
    'div',
    'dl',
    'figcaption',
    'figure',
    'hr',
    'li',
    'main',
    'ol',
    'p',
    'pre',
    'ul',
    'a',
    'abbr',
    'b',
    'bdi',
    'bdo',
    'br',
    'cite',
    'code',
    'data',
    'dfn',
    'em',
    'i',
    'kdb',
    'mark',
    'q',
    'rp',
    'rt',
    'rtc',
    'ruby',
    's',
    'samp',
    'small',
    'span',
    'strong',
    'sub',
    'sup',
    'time',
    'tt',
    'u',
    'var',
    'wbr',
    'area',
    'audio',
    'img',
    'map',
    'track',
    'video',
    'applet',
    'embed',
    'iframe',
    'noembed',
    'object',
    'param',
    'picture',
    'source',
    'canvas',
    'noscript',
    'script',
    'del',
    'ins',
    'caption',
    'col',
    'colgroup',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
    'button',
    'datalist',
    'fieldset',
    'form',
    'input',
    'label',
    'legend',
    'meter',
    'optgroup',
    'option',
    'output',
    'progress',
    'select',
    'textarea',
    'details',
    'dialog',
    'menu',
    'menuitem',
    'summary',
    'content',
    'element',
    'shadow',
    'slot',
    'template'
];
const factory = module.exports.factory = {};
domElements.forEach(elem => {
    factory[elem] = function (props, ...children) {
        return createElement(elem, setChildren(props || {}, children));
    };
    factory[elem.toUpperCase()] = factory[elem];
});

// ---
// __SVG FACTORY METHODS__
//
// _syntactic sugar_
//
// elements: 'a', 'altGyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'discard', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'hatch', 'hatchpath', 'hkern', 'image', 'line', 'linearGradient', 'marker', 'mask', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script', 'set', 'solidcolor', 'stop', 'style', 'svg', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref', 'tspan', 'unknown', 'use', 'view', 'vkern'
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
const svgElements = module.exports.svgElements = [
    'a',
    'altGyph',
    'altGlyphDef',
    'altGlyphItem',
    'animate',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'circle',
    'clipPath',
    'color-profile',
    'cursor',
    'defs',
    'desc',
    'discard',
    'ellipse',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feDropShadow',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'filter',
    'font',
    'font-face',
    'font-face-format',
    'font-face-name',
    'font-face-src',
    'font-face-uri',
    'foreignObject',
    'g',
    'glyph',
    'glyphRef',
    'hatch',
    'hatchpath',
    'hkern',
    'image',
    'line',
    'linearGradient',
    'marker',
    'mask',
    'mesh',
    'meshgradient',
    'meshpatch',
    'meshrow',
    'metadata',
    'missing-glyph',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'script',
    'set',
    'solidcolor',
    'stop',
    'style',
    'svg',
    'switch',
    'symbol',
    'text',
    'textPath',
    'title',
    'tref',
    'tspan',
    'unknown',
    'use',
    'view',
    'vkern'
];
svgElements.forEach(elem => {
    factory[elem] = function (props, ...children) {
        return createSvgElement(elem, setChildren(props || {}, children));
    };
    factory[elem.toUpperCase()] = factory[elem];
});
// ---
// #### event management
//
// * __on__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__, _object_ __options__)
// * __once__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__, _object_ __options__)
// * __off__ (_HTMLElement_ __elem__, _string_ __event__, _function_ __handler__, _object_ __options__)
// * __dispatch__ (_HTMLElement_ __elem__, _string_ __event__);
//
// ##### example
// ```
//  const a = document.getElementById('aDiv');
//  const mouseover = () => {
//      a.style.backgroundColor = 'red';
//  }
//  on(a, 'mouseover', mouseover);
//  once(a, 'click', () => {
//      off(a, 'mouseover', mouseover);
//  });
//  window.setTimeout(() => {
//      dispatch(a, 'click');
//  }, 2000);
// ```
const on = module.exports.on = (element, event, handler, options) => {
    element.addEventListener(event, handler, options);
};
const once = module.exports.once = (element, event, handler, options) => {
    element.addEventListener(event, handler, Object.assign({once: true}, options));
};
const off = module.exports.off = (element, event, handler, options) => {
    element.removeEventListener(event, handler, options);
};
const dispatch = module.exports.dispatch = (elem, event) => {
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
//  const a = document.getElementById('aDiv');
//  style(a, {
//      color: 'green',
//      backgroundColor: 'red'
//  })
// ```
//
const style = module.exports.style = (elem, props) => {
    if (isElement(elem) && isObject(props)){
        Object.keys(props).forEach((key) => {
            elem.style[key] = props[key];
        });
    }
};
// ---
// __QueryList ($)__ (_string_/_element_/_nodelist_/_array_/_function_ __selector__)
//
// ##### example
// ```
//  const $a = $('#aDiv');
//  $a.on('click', () => {
//      if ($a.hasClass('foo')) {
//          $a.removeClass('foo').addClass('bar');
//      } else {
//          $a.removeClass('bar').addClass('foo');
//      }
//  });
//  $a.dispatch('click');
// ```
//
const QueryList = module.exports.QueryList = class QueryList {
    constructor(selector, context) {
        var scope = this;
        scope.length = 0;
        if (isElement(selector)){
            scope[0] = selector;
            scope.length = 1;
        } else {
            const objectType = type(selector);
            if (objectType === 'String'){
                if (!context) {
                    context = document;
                };
                var nodelist = context.querySelectorAll(selector);
                Array.prototype.forEach.call(nodelist, function(node, index){
                    scope[index] = node;
                });
                scope.length = nodelist.length;
            } else if (objectType === 'NodeList' || objectType === 'HTMLCollection'){
                Array.prototype.forEach.call(selector, function(node, index){
                    scope[index] = node;
                });
                scope.length = selector.length;
            } else if (objectType === 'Array' || selector instanceof QueryList){
                var index = 0;
                selector.forEach(function(node){
                    if (isElement(node)){
                        scope[index] = node;
                        index++;
                    }
                });
                scope.length = index;
            } else if (objectType === 'Function'){
                if (document.readyState === 'complete'){
                    selector();
                } else {
                    var ready = window.setInterval(function() {
                        if (document.readyState === 'complete') {
                            window.clearInterval(ready);
                            selector();
                        }
                    }, 10);
                }
            } else {
                throw new Error('QueryList: invalid selector type: ' + objectType);
            }
        }
        return scope;
    }
    on(event, handler, options) {
        const scope = this;
        scope.forEach(elem => {
            on(elem, event, handler, options);
        });
        return scope;
    }
    once(event, handler, options) {
        const scope = this;
        scope.forEach(elem => {
            once(elem, event, handler, options);
        });
        return scope;
    }
    off(event, handler, options) {
        const scope = this;
        scope.forEach(elem => {
            off(elem, event, handler, options);
        });
        return scope;
    }
    style(obj) {
        const scope = this;
        scope.forEach(elem => {
            style(elem, obj);
        });
        return scope;
    }
    dispatch(event) {
        const scope = this;
        scope.forEach(elem => {
            dispatch(elem, event);
        });
        return scope;
    }
    hasClass(str, strict) {
        const arrFun = !!strict ? 'every' : 'some';
        return this[arrFun](elem => {
            return hasClass(elem, str);
        });
    }
    addClass(str) {
        const scope = this;
        scope.forEach(elem => {
            addClass(elem, str);
        });
        return scope;
    }
    removeClass(str) {
        const scope = this;
        scope.forEach(elem => {
            removeClass(elem, str);
        });
        return scope;
    }
};
QueryList.prototype.filter = Array.prototype.filter;
QueryList.prototype.forEach = Array.prototype.forEach;
QueryList.prototype.map = Array.prototype.map;
QueryList.prototype.pop = Array.prototype.pop;
QueryList.prototype.push = Array.prototype.push;
QueryList.prototype.shift = Array.prototype.shift;
QueryList.prototype.slice = Array.prototype.slice;
QueryList.prototype.some = Array.prototype.some;
QueryList.prototype.splice = Array.prototype.splice;
QueryList.prototype.unshift = Array.prototype.unshift;
module.exports.$ = function (selector, context) {
    return new QueryList(selector, context);
};
// ## utilities
//
// * __type (_object_ __obj__)
//     * returns element class name by Object.toString
//     * example: if Object.toString('asdf') === '[object String]' then 'String'
// * __isObject__ (_object_ __obj__)
// * __isArray__ (_object_ __obj__)
// * __isElement__ (_object_ __obj__)
// * __toCamelCase__ (_string_ __str__)
// * __setChildren (_object_ _obj_, _array_ _children_))
//
const type = module.exports.type = function(obj) {
    return Object.prototype.toString.call(obj).slice(8,-1);
};
const isObject = module.exports.isObject = function isObject(obj) {
    return type(obj) === 'Object';
};
const isArray = module.exports.isArray = function isArray(obj) {
    return Array.isArray(obj);
};
const isElement = module.exports.isElement = function isElement(obj){
    return obj instanceof SVGElement || obj instanceof HTMLElement;
};
const hasClass = module.exports.hasClass = function(elem, className) {
    if (isElement(elem) && typeof className === 'string') {
        return new RegExp('(\\s|^)'+ className +'(\\s|$)').test(elem.className);
    }
};
const addClass = module.exports.addClass = function(elem, className) {
    if (isElement(elem) && typeof className === 'string') {
        if (new RegExp('(\\s|^)'+ className +'(\\s|$)').test(elem.className) !== true){
            elem.className += (elem.className ? ' ' : '') + className;
        }
    }
    return this;
};
const removeClass = module.exports.addClass = function(elem, className) {
    if (isElement(elem) && typeof className === 'string') {
        if (new RegExp('(\\s|^)'+ className +'(\\s|$)').test(elem.className)){
            elem.className = elem.className.replace(new RegExp('(\\s|^)'+ className +'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
        }
    }
    return this;
};
const toCamelCase = module.exports.toCamelCase = function(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
};
const setChildren = module.exports.setChildren = function(props, children) {
    if (Array.isArray(children) && Array.isArray(props.children)) {
        props.children = props.children.concat(children);
    } else if (Array.isArray(children)) {
        props.children = children;
    }
    return props;
};
