import { createElement } from './createElement';
import { type } from './type';
import { style } from './style';
import { on, off, once, dispatch } from './events';
import { isElement } from './type';

export class QueryList extends Array {
    constructor(selector: any, context: any) {
        super();
        var scope = this;
        scope.length = 0;
        if (isElement(selector)) {
            scope[0] = selector;
            scope.length = 1;
        } else {
            const objectType = type(selector);
            if (objectType === 'String') {
                if (selector.charAt(0) === '<') {
                    scope[0] = createElement(selector);
                    scope.length = 1;
                } else {
                    if (!context) {
                        context = document;
                    }
                    var nodelist = context.querySelectorAll(selector);
                    Array.prototype.forEach.call(
                        nodelist,
                        function (node, index) {
                            scope[index] = node;
                        },
                    );
                    scope.length = nodelist.length;
                }
            } else if (
                objectType === 'NodeList' ||
                objectType === 'HTMLCollection'
            ) {
                Array.prototype.forEach.call(selector, function (node, index) {
                    scope[index] = node;
                });
                scope.length = selector.length;
            } else if (
                objectType === 'Array' ||
                selector instanceof QueryList
            ) {
                var index = 0;
                selector.forEach(function (node: any) {
                    if (isElement(node)) {
                        scope[index] = node;
                        index++;
                    }
                });
                scope.length = index;
            } else if (objectType === 'Function') {
                if (document.readyState === 'complete') {
                    selector();
                } else {
                    var ready = window.setInterval(function () {
                        if (document.readyState === 'complete') {
                            window.clearInterval(ready);
                            selector();
                        }
                    }, 10);
                }
            } else {
                throw new Error(
                    'QueryList: invalid selector type: ' + objectType,
                );
            }
        }
        return scope;
    }

    on(event: string, handler: (event: Event) => void, options: any) {
        const scope = this;
        scope.forEach(elem => {
            on(elem, event, handler, options);
        });
        return scope;
    }

    once(event: string, handler: (event: Event) => void, options: any) {
        const scope = this;
        scope.forEach(elem => {
            once(elem, event, handler, options);
        });
        return scope;
    }

    off(event: string, handler: (event: Event) => void, options: any) {
        const scope = this;
        scope.forEach(elem => {
            off(elem, event, handler, options);
        });
        return scope;
    }

    style(obj: any) {
        const scope = this;
        scope.forEach(elem => {
            style(elem, obj);
        });
        return scope;
    }

    dispatch(event: string) {
        const scope = this;
        scope.forEach(elem => {
            dispatch(elem, event);
        });
        return scope;
    }
}

// QueryList.prototype.filter = Array.prototype.filter;
// QueryList.prototype.forEach = Array.prototype.forEach;
// QueryList.prototype.map = Array.prototype.map;
// QueryList.prototype.pop = Array.prototype.pop;
// QueryList.prototype.push = Array.prototype.push;
// QueryList.prototype.shift = Array.prototype.shift;
// QueryList.prototype.slice = Array.prototype.slice;
// QueryList.prototype.some = Array.prototype.some;
// QueryList.prototype.splice = Array.prototype.splice;
// QueryList.prototype.unshift = Array.prototype.unshift;

export function $(selector: any, context: any) {
    return new QueryList(selector, context);
}
