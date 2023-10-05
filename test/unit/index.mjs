import { $ } from '../../src';
import { describe, before, it } from 'node:test';
// import assert from 'node:assert/strict';
import Browser from 'zombie';

console.log($('body'));

const port = process.env.NODE_PORT || 8080;

describe('JDOM', () => {

    Browser.localhost('localhost', port);
    const browser = new Browser();

    before(done => {
        browser.visit('/index.html').then(() => {
            console.log('visit');
            browser.on('loaded', done)
        });
    });

    describe('Demo Page', async () => {
        it('should load', async () => {
            browser.assert.success();
        });
    });

    // describe('Create / Update Element', async ctx => {
    //     it.only('should create elements', () => {
    //         browser.assert.evaluate('window.test.createElements()');
    //     });

    //     it('should create svg elements', () => {
    //         browser.assert.evaluate('window.test.createSvgElements()');
    //     });

    //     it('should update an elements style', () => {
    //         browser.assert.evaluate('window.test.setStyle()');
    //     });
    // });

    // await ctx.test('Create / Manipulate SVG', async ctx => {
    //     beforeEach(() => {
    //         browser.assert.evaluate('window.test.createSvgDocument()');
    //     });

    //     afterEach(() => {
    //         browser.assert.evaluate('window.test.removeSvgDocument()');
    //     });

    //     ctx.test('should manipulate SVG document', () => {
    //         browser.assert.evaluate('window.test.updateSvgDocument()');
    //     });
    // });

    // ctx.test('Selector', ctx => {
    //     ctx.test('should select an element', () => {
    //         browser.assert.evaluate('window.test.selector()');
    //     });
    // });
});
