import { createElement } from './createElement';
import domElements from './domElements.json';

const factory: any = {};

domElements.forEach((element: string) => {
    factory[element] = function (props: any, ...children: any[]) {
        return createElement(element, props, ...children);
    };
    factory[element.toUpperCase()] = factory[element];
    factory[element.toLowerCase()] = factory[element];
});

export const domFactory = factory;