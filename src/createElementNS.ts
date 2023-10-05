import { factory, setChildren } from './factory';

export function createElementNS(
    ns: string,
    element: string,
    props: any,
    ...children: any[]
) {
    return factory(element, setChildren(props, children), ns);
}
