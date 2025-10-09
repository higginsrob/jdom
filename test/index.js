/* global describe, it, before, after, beforeEach, afterEach */

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config')();
const puppeteer = require('puppeteer');

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(webpackConfig.devServer || {}, compiler);
let browser, page;

describe('JDOM Headless Browser Testing\n', function() {
    before(async function() {
        this.timeout(30000);

        // Start webpack dev server
        await new Promise((resolve, reject) => {
            compiler.hooks.done.tap('done', () => {
                resolve();
            });

            server.start().catch(reject);
        });

        // Launch Puppeteer browser
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        page = await browser.newPage();
        await page.goto('http://localhost:8080/index.html');
    });

    describe('Demo Page', function() {
        it('should load', async function() {
            const title = await page.title();
            console.log('Page title:', title);
            // Page should be loaded successfully (no specific assertion needed)
        });
    });

    describe('Create / Update Element', function() {
        it('should create elements', async function() {
            const result = await page.evaluate(() => {
                return window.createElements();
            });
            if (!result) throw new Error('createElements() returned false');
        });

        it('should create svg elements', async function() {
            const result = await page.evaluate(() => {
                return window.createSvgElements();
            });
            if (!result) throw new Error('createSvgElements() returned false');
        });

        it('should update an elements style', async function() {
            const result = await page.evaluate(() => {
                return window.setStyle();
            });
            if (!result) throw new Error('setStyle() returned false');
        });
    });

    describe('Create / Manipulate SVG', function() {
        beforeEach(async function() {
            const result = await page.evaluate(() => {
                return window.createSvgDocument();
            });
            if (!result) throw new Error('createSvgDocument() returned false');
        });

        afterEach(async function() {
            await page.evaluate(() => {
                return window.removeSvgDocument();
            });
        });

        it('should manipulate SVG document', async function() {
            const result = await page.evaluate(() => {
                return window.updateSvgDocument();
            });
            if (!result) throw new Error('updateSvgDocument() returned false');
        });
    });

    describe('Selector', function() {
        it('should select an element', async function() {
            const result = await page.evaluate(() => {
                return window.selector();
            });
            if (!result) throw new Error('selector() returned false');
        });

        it('should add a class name to an element', async function() {
            const result = await page.evaluate(() => {
                return window.addClass();
            });
            if (!result) throw new Error('addClass() returned false');
        });

        it('should remove a class name from an element', async function() {
            const result = await page.evaluate(() => {
                return window.removeClass();
            });
            if (!result) throw new Error('removeClass() returned false');
        });
    });

    after(async function() {
        if (browser) {
            await browser.close();
        }
        if (server) {
            await server.stop();
        }
    });
});
