import { isArray, isElement, isObject } from './type';
import { style } from './style';
import { toCamelCase } from './toCamelCase';

export function factory(tag: any, props: any, ns?: string) {
    if (!tag) {
        return;
    }
    let elem: any;
    if (isElement(tag)) {
        elem = tag;
    } else if (typeof tag === 'string') {
        if (tag.charAt(0) === '<') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(tag, 'text/html');
            elem = doc.firstChild;
        } else if (typeof ns === 'string') {
            elem = document.createElementNS(ns, tag);
        } else {
            elem = document.createElement(tag);
        }
    } else {
        throw new Error('invalid tag type: ' + typeof tag);
    }
    if (isObject(props)) {
        Object.keys(props).forEach(function (key) {
            if (key === 'style') {
                if (isObject(props.style)) {
                    style(elem, props.style);
                }
            } else if (key === 'dataset') {
                if (isObject(props.dataset)) {
                    Object.keys(props.dataset).forEach(key => {
                        elem.dataset[key] = props.dataset[key];
                    });
                }
            } else if (key === 'parent' && isElement(props.parent)) {
                props.parent.appendChild(elem);
            } else if (key === 'children') {
                if (isArray(props.children)) {
                    props.children.forEach(function (child: any) {
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
}

export function setChildren(props: any, children: any) {
    if (props && Array.isArray(children) && children.length) {
        if (Array.isArray(props.children)) {
            props.children = props.children.concat(children);
        } else {
            props.children = children;
        }
    }
    return props;
}
