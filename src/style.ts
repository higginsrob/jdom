import { isElement, isObject } from './type';

export function style(elem: HTMLElement, props: any) {
    if (isElement(elem) && isObject(props)) {
        Object.keys(props).forEach((key: string) => {
            elem.style[key as any] = props[key];
        });
    }
}
