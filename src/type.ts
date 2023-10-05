export function type(obj: any) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

export function isString(obj: any) {
    return type(obj) === 'String';
}

export function isObject(obj: any) {
    return type(obj) === 'Object';
}

export function isArray(obj: any) {
    return Array.isArray(obj);
}

export function isElement(obj: any) {
    return typeof HTMLElement === 'object'
        ? obj instanceof HTMLElement
        : typeof SVGElement === 'object'
        ? obj instanceof SVGElement
        : obj &&
          typeof obj === 'object' &&
          obj !== null &&
          obj.nodeType === 1 &&
          typeof obj.nodeName === 'string';
}
