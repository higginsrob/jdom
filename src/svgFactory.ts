import { createElementNS } from './createElementNS';
import svgElements from './svgElements.json';

export const defaultNameSpace = 'http://www.w3.org/2000/svg';

const factory: any = {};

svgElements.forEach((elementName: string) => {
    factory[elementName] = function (props: any, ...children: any[]) {
        return createElementNS(
            defaultNameSpace,
            elementName,
            props,
            ...children,
        );
    };
    factory[elementName] = factory[elementName];
    factory[elementName.toUpperCase()] = factory[elementName];
    factory[elementName.toLowerCase()] = factory[elementName];
});

export const svgFactory = factory;