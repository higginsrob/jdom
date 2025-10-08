# JDOM.js - Copilot Instructions

## Project Overview

JDOM.js is a lightweight JavaScript DOM builder library that provides a functional approach to creating and manipulating DOM elements. This is an NPM package with no external dependencies, open source under the MIT License, and hosted on GitHub at `higginsrob/jdom`.

## Key Project Information

-   **Package Name**: `jdom`
-   **Version**: 3.2.5
-   **Main Entry Point**: `index.js`
-   **License**: MIT License
-   **Author**: Rob Higgins <higginsrob@gmail.com>
-   **Repository**: https://github.com/higginsrob/jdom.git
-   **Build Target**: Static website for GitHub Pages deployment

## Architecture & File Structure

### Core Files

-   **`index.js`** - Main library file (798 lines) containing the core factory functions, DOM element creators, and utility functions
-   **`package.json`** - NPM configuration with scripts, dependencies, and project metadata
-   **`webpack.config.js`** - Webpack configuration for development server and production builds

### Configuration Files

-   **`.eslintrc`** - ESLint configuration with custom rules for code quality
-   **`.prettierrc.json`** - Prettier formatting configuration
-   **`.prettierignore`** - Files to ignore during formatting
-   **`.gitignore`** - Git ignore patterns

### Testing & Demo

-   **`test/index.js`** - Mocha test suite with headless browser testing using Zombie.js
-   **`test/template.html`** - HTML template for development server and testing
-   **`README/style.css`** - Styling for demo/documentation

### CI/CD & GitHub

-   **`.github/workflows/nodejs.yml`** - GitHub Actions CI pipeline
-   **`.github/prompts/init.prompt.md`** - Repository setup instructions

## Development Workflow

### Available NPM Scripts

-   `npm start` - Start webpack dev server for development
-   `npm run build` - Build production bundle (creates `dist/jdom.js`)
-   `npm test` - Run full test suite (builds, then runs mocha tests)
-   `npm run prettier` - Format all code files
-   `npm version` - Bump version (runs prettier first)

### Pre-commit Validation

The project uses Husky and lint-staged for pre-commit hooks:

1. **Prettier formatting** - Auto-formats JS, JSON, JSX, CSS, and MD files
2. **ESLint linting** - Enforces code quality rules during webpack build
3. **Git staging** - Automatically stages formatted files

### Testing Strategy

-   **Unit Tests**: Mocha-based tests in `test/index.js`
-   **Browser Testing**: Uses Zombie.js for headless browser testing
-   **Development Server**: Webpack dev server serves test template at localhost:8080
-   **CI Testing**: GitHub Actions runs tests on every push to any branch

## Build System

### Development Build

-   **Entry**: `index.js`
-   **Output**: In-memory bundle served by webpack-dev-server
-   **Features**: Source maps, ESLint pre-processing, live reloading
-   **Template**: Uses `test/template.html` for demo page

### Production Build

-   **Entry**: `index.js`
-   **Output**: `dist/jdom.js` (UMD format)
-   **Library Target**: UMD (Universal Module Definition)
-   **Library Name**: `jdom`
-   **Optimization**: Webpack production mode optimizations

## CI/CD Pipeline

### GitHub Actions Workflow (`.github/workflows/nodejs.yml`)

1. **Trigger**: Push to any branch
2. **Environment**: Ubuntu Latest with Node.js 16
3. **Steps**:
    - Checkout code
    - Setup Node.js
    - Install dependencies (`npm install`)
    - Run tests (`npm test`)

### GitHub Pages Deployment

-   **Target**: Static website hosting
-   **Source**: Production build output from `dist/` directory
-   **Trigger**: Push to main branch (needs to be configured)

## Core Library Features

### Factory Functions

-   `domFactory` - Creates DOM element factories (DIV, SPAN, etc.)
-   `svgFactory` - Creates SVG element factories
-   `createElement` - Core element creation function
-   `factory` - Low-level element factory with namespace support

### Utility Functions

-   `style(element, styles)` - Apply CSS styles to elements
-   `on/once/off/dispatch` - Event handling utilities
-   `$` - jQuery-like selector function

### Element Support

-   **DOM Elements**: Complete set of HTML elements (link, meta, div, span, etc.)
-   **SVG Elements**: Full SVG element support with proper namespacing
-   **Properties**: Automatic handling of attributes, styles, datasets, and events

## Validation Steps for Changes

1. **Linting**: Run `npm run prettier` to ensure code formatting
2. **Build Test**: Run `npm run build` to ensure production build works
3. **Unit Tests**: Run `npm test` to verify functionality
4. **Manual Testing**: Use `npm start` and visit localhost:8080 for browser testing
5. **CI Validation**: Push changes trigger automatic GitHub Actions testing

## Key Code Patterns

### Element Creation

```javascript
const {DIV, SPAN, SCRIPT} = domFactory;
const element = DIV({
    parent: document.body,
    id: 'myDiv',
    style: {color: 'red'},
    dataset: {foo: 'bar'},
    children: ['text', SPAN({children: ['nested']})],
    click: () => alert('clicked'),
});
```

### SVG Creation

```javascript
const {svg, rect, circle} = svgFactory;
const svgElement = svg({
    parent: document.body,
    children: [rect({width: 100, height: 50}), circle({r: 25})],
});
```

## Dependencies

### Development Dependencies

-   **Testing**: mocha, zombie (headless browser testing)
-   **Build Tools**: webpack, webpack-cli, webpack-dev-server, html-webpack-plugin
-   **Code Quality**: eslint, prettier, husky, lint-staged
-   **Babel**: babel-eslint for ES6+ support

### Runtime Dependencies

-   **None** - Zero external runtime dependencies for lightweight package

## Important Notes

-   The library is designed to be dependency-free for runtime usage
-   All DOM and SVG elements are dynamically generated and exported
-   The factory pattern allows for flexible element creation with properties, events, and children
-   Production builds create UMD modules suitable for various import systems
-   Testing relies on webpack-dev-server and headless browser automation
-   Code formatting and linting are enforced via pre-commit hooks

## Troubleshooting

-   **Build Issues**: Check webpack.config.js and ensure all dev dependencies are installed
-   **Test Failures**: Verify webpack-dev-server starts correctly and Zombie.js can access localhost:8080
-   **Formatting Issues**: Run `npm run prettier` to auto-fix code formatting
-   **CI Failures**: Check Node.js version compatibility and dependency installation
