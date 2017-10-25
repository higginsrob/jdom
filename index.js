var createElement = module.exports = function createElement(tag, props, ns) {
    var elem = typeof ns === 'string'
        ? document.createElementNS(ns, tag)
        : document.createElement(tag);
    if (isObject(props)) {
        Object.keys(props).forEach(function(key) {
            if (key === 'style') {
                style(elem, props.style);
            } else if (key === 'dataset') {
                if (isObject(props.dataset)){
                    Object.keys(props.dataset).forEach((key) => {
                        elem.dataset[key] = props.dataset[key];
                    });
                }
            } else if (key === 'parent' && props.parent instanceof HTMLElement) {
                props.parent.appendChild(elem);
            } else if (key === 'children') {
                if (Array.isArray(props.children)) {
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

module.exports.VIDEO = function VIDEO(props) {
    return createElement('video', props);
}

module.exports.IFRAME = function IFRAME(props) {
    return createElement('iframe', props);
}

// SVG
var defaultNameSpace = 'http://www.w3.org/2000/svg';

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

module.exports.currentScript = function currentScript() {
	if (document.currentScript) {
		return document.currentScript;
	}
	var scripts = document.getElementsByTagName('script');
	return scripts[scripts.length - 1];
};

module.exports.style = function style(elem, props) {
    if (elem && isObject(props)){
        Object.keys(props).forEach((key) => {
            if (elem.style) {
                elem.style[key] = props[key];
            }
        });
    }
}

function toCamelCase (str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

function isObject(obj) {
    return Object.prototype.toString.call(obj).slice(8,-1) === 'Object';
}

