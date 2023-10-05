
// const { $, DOM, SVG } = window.jdom;
// const test = window.test = {}
// test.createElements = () => {
// }

// test.updateElement = () => {
//     const div = DOM.DIV({id: 'a'});
//     jdom.updateElement(div, {id: 'b'});
//     return div.id === 'b';
// }

// test.setStyle = () => {
//     const div = DOM.DIV({id: 'a'});
//     jdom.style(div, {
//         color: 'red'
//     });
//     return div.style.color === 'red';
// }

// test.createSvgElements = () =>  {
//     const svg = SVG.svg();
//     jdom.svgElements.forEach(elem => {
//         SVG[elem]({
//             parent: svg,
//             id: elem
//         });
//     });
//     return jdom.svgElements.every(elem => {
//         return $('#' + elem, svg).length === 1;
//     });
// }

// let svg;

// test.createSvgDocument = () => {
//     svg = SVG.svg({
//         parent: document.body,
//         width: 200,
//         height: 100,
//         children: [
//             SVG.RECT({
//                 x: 0,
//                 y: 0,
//                 width: 100,
//                 height: 100,
//                 fill: 'red'
//             }),
//             SVG.RECT({
//                 x: 100,
//                 y: 0,
//                 width: 100,
//                 height: 100,
//                 fill: 'blue'
//             }),
//             SVG.CIRCLE({
//                 cx: 100,
//                 cy: 50,
//                 r: 50,
//                 fill: 'green',
//                 'fill-opacity': 0.75,
//                 children: [
//                     SVG.animateTransform({
//                         attributeName: 'transform',
//                         attributeType: 'XML',
//                         type: 'scale',
//                         from: '1',
//                         to: '0.5',
//                         dur: '3s',
//                         repeatCount: 'indefinite'
//                     })
//                 ]
//             })
//         ]
//     });
//     return svg.childNodes.length === 3;
// }

// test.updateSvgDocument = () => {
//     const $svg = $(svg);
//     $svg.style({border: '2px solid red'});
//     return svg.style.border === '2px solid red';
// }

// test.removeSvgDocument = () => {
//     svg.remove();
//     delete svg;
//     return $('svg').length === 0;
// }

// test.selector = () => {
//     const div = DOM.DIV({
//         id: 'a',
//         parent: document.body
//     });
//     const $div = $('#a');
//     return $div[0].id === 'a';
// }
// })