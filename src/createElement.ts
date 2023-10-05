import { factory, setChildren } from './factory';

export function createElement(elem: any, props?: any, ...children: any[]) {
    if (typeof elem === 'function') {
        return factory(new elem(props), setChildren(props, children));
    } else {
        return factory(elem, setChildren(props, children));
    }
}
