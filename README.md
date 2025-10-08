# JDOM.js [![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhigginsrob%2Fjdom%2Fbadge&style=flat)](https://actions-badge.atrox.dev/higginsrob/jdom/goto) [![npm version](https://badge.fury.io/js/jdom.svg)](https://badge.fury.io/js/jdom)

A lightweight JavaScript DOM builder library that provides a functional approach to creating and manipulating DOM elements. Zero dependencies, modern ES6+ support, and comprehensive DOM/SVG element creation.

## Features

-   🚀 **Zero Dependencies** - Lightweight and fast
-   🎯 **Functional API** - Clean, composable element creation
-   🌐 **Complete DOM Support** - All HTML elements with proper attributes
-   🎨 **Full SVG Support** - Create complex SVG graphics with ease
-   🔧 **Event Handling** - Built-in event management utilities
-   📱 **Modern JavaScript** - ES6+ compatible with UMD builds
-   🧪 **Well Tested** - Comprehensive test suite with Puppeteer

## Installation

```bash
npm install --save jdom
```

## Import

### ES6 Modules

```javascript
import {domFactory, svgFactory, on, once, off, dispatch, style, $} from 'jdom';
```

### CommonJS

```javascript
const {
    domFactory,
    svgFactory,
    on,
    once,
    off,
    dispatch,
    style,
    $,
} = require('jdom');
```

### UMD (Browser)

```html
<script src="https://unpkg.com/jdom@3.2.5/dist/jdom.js"></script>
<script>
    const {domFactory, svgFactory} = window.jdom;
</script>
```

## Quick Start

### Creating DOM Elements

```javascript
const {DIV, SPAN, BUTTON, INPUT} = domFactory;

// Simple element
const myDiv = DIV({
    parent: document.body,
    id: 'myDiv',
    className: 'container',
    textContent: 'Hello World!',
});

// Element with styles and events
const button = BUTTON({
    parent: myDiv,
    textContent: 'Click me!',
    style: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    click: () => alert('Button clicked!'),
    mouseover: e => (e.target.style.backgroundColor = '#0056b3'),
});

// Complex nested structure
const form = DIV({
    parent: document.body,
    className: 'form-container',
    children: [
        DIV({
            className: 'form-group',
            children: [
                'Name: ',
                INPUT({
                    type: 'text',
                    placeholder: 'Enter your name',
                    dataset: {field: 'name'},
                }),
            ],
        }),
        BUTTON({
            textContent: 'Submit',
            type: 'submit',
        }),
    ],
});
```

### Creating SVG Graphics

```javascript
const {svg, rect, circle, path, text} = svgFactory;

// Simple SVG with shapes
const mySVG = svg({
    parent: document.body,
    id: 'mySVG',
    width: 300,
    height: 200,
    viewBox: '0 0 300 200',
    style: {border: '1px solid #ccc'},
    children: [
        // Background rectangle
        rect({
            fill: '#f0f8ff',
            x: 0,
            y: 0,
            width: 300,
            height: 200,
        }),
        // Colored circle
        circle({
            fill: '#ff6b6b',
            stroke: '#333',
            strokeWidth: 2,
            cx: 100,
            cy: 100,
            r: 50,
        }),
        // Text label
        text({
            x: 100,
            y: 180,
            textAnchor: 'middle',
            fill: '#333',
            fontSize: '16px',
            textContent: 'Interactive SVG',
        }),
    ],
});

// Interactive SVG elements
circle({
    parent: mySVG,
    fill: '#4ecdc4',
    cx: 200,
    cy: 100,
    r: 30,
    style: {cursor: 'pointer'},
    click: function() {
        this.setAttribute('fill', '#ff9f43');
    },
});
```

## API Reference

### Core Functions

#### `domFactory`

Object containing all HTML element creators (DIV, SPAN, INPUT, etc.)

```javascript
const {DIV, SPAN, INPUT, BUTTON} = domFactory;
```

#### `svgFactory`

Object containing all SVG element creators (svg, circle, rect, path, etc.)

```javascript
const {svg, circle, rect, path, text} = svgFactory;
```

#### `createElement(tag, props, ...children)`

Low-level element creation function

```javascript
const div = createElement('div', {id: 'test'}, 'Hello World');
```

#### `style(element, styles)`

Apply CSS styles to an element

```javascript
const element = document.getElementById('myDiv');
style(element, {
    color: 'green',
    backgroundColor: 'lightblue',
    padding: '10px',
    borderRadius: '4px',
});
```

### High-Level Components

#### `Inputs(inputConfigs)`

Create a form container with multiple input fields

```javascript
const formContainer = Inputs([
    {
        type: 'text',
        name: 'username',
        placeholder: 'Enter username',
        description: 'Username',
        required: true,
    },
    {
        type: 'email',
        name: 'email',
        placeholder: 'Enter email',
        description: 'Email Address',
    },
    {
        type: 'select',
        name: 'country',
        description: 'Country',
        options: [
            {value: 'us', text: 'United States'},
            {value: 'uk', text: 'United Kingdom'},
            {value: 'ca', text: 'Canada'},
        ],
    },
    {
        type: 'checkbox',
        name: 'newsletter',
        description: 'Subscribe to newsletter',
    },
]);

document.body.appendChild(formContainer);
```

#### `ButtonGroup(buttonConfigs)`

Create a group of buttons

```javascript
const buttonGroup = ButtonGroup([
    {
        text: 'Save',
        type: 'submit',
        onClick: () => console.log('Save clicked'),
    },
    {
        text: 'Cancel',
        type: 'button',
        onClick: () => console.log('Cancel clicked'),
    },
    {
        text: 'Reset',
        type: 'reset',
    },
]);

document.body.appendChild(buttonGroup);
```

### Utility Functions

#### Type Checking

```javascript
// Check element types
if (isElement(myDiv)) {
    console.log('It is a DOM element');
}

if (isObject(myConfig)) {
    console.log('It is a plain object');
}

if (isArray(myList)) {
    console.log('It is an array');
}

// Get type of any value
console.log(type(myVariable)); // 'String', 'Number', 'Object', etc.
```

#### Class Manipulation

```javascript
const element = document.getElementById('myElement');

// Check for class
if (hasClass(element, 'active')) {
    console.log('Element has active class');
}

// Add class
addClass(element, 'highlight');

// Remove class
removeClass(element, 'old-style');
```

#### HTML String Parsing

```javascript
// Create elements from HTML strings
const element = createElement('<div>Hello World</div>');
const complexElement = createElement(`
    <div class="card">
        <h2>Title</h2>
        <p>Content</p>
    </div>
`);
```

#### Current Script Detection

```javascript
// Get the currently executing script tag
const currentScript = currentScript();
console.log('Current script src:', currentScript.src);
```

### Event Handling

#### `on(element, event, handler, options)`

Add event listener to element

```javascript
const button = BUTTON({textContent: 'Click me'});
on(button, 'click', () => console.log('Clicked!'));
```

#### `once(element, event, handler, options)`

Add event listener that only fires once

```javascript
once(button, 'click', () => console.log('First click only'));
```

#### `off(element, event, handler, options)`

Remove event listener

```javascript
off(button, 'click', myHandler);
```

#### `dispatch(element, event)`

Trigger an event on element

```javascript
dispatch(button, 'click');
```

### jQuery-like Selector: `$(selector)`

The `$` function provides a jQuery-like interface for element selection and manipulation.

```javascript
// Select elements
const $divs = $('div');
const $byId = $('#myId');
const $byClass = $('.myClass');

// Chainable operations
$('#myButton')
    .addClass('active')
    .style({color: 'red'})
    .on('click', () => console.log('Clicked!'));

// Conditional class management
const $element = $('#myElement');
if ($element.hasClass('foo')) {
    $element.removeClass('foo').addClass('bar');
} else {
    $element.removeClass('bar').addClass('foo');
}

// Trigger events
$element.dispatch('click');
```

#### QueryList Methods

**Event Methods:**

-   `on(event, handler)` - Add event listener
-   `once(event, handler)` - Add one-time event listener
-   `off(event, handler)` - Remove event listener
-   `dispatch(event)` - Trigger event

**Style Methods:**

-   `style(styles)` - Apply CSS styles
-   `hasClass(className)` - Check if class exists
-   `addClass(className)` - Add CSS class
-   `removeClass(className)` - Remove CSS class

**Array Methods:**

-   `filter()`, `forEach()`, `map()`, `pop()`, `push()`
-   `shift()`, `slice()`, `some()`, `splice()`, `unshift()`

## Element Properties

When creating elements, you can specify various properties:

```javascript
const element = DIV({
    // Basic attributes
    id: 'myId',
    className: 'my-class',
    textContent: 'Hello World',

    // Styles
    style: {
        color: 'blue',
        fontSize: '16px',
        padding: '10px',
    },

    // Data attributes
    dataset: {
        userId: '123',
        action: 'save',
    },

    // Event handlers (any DOM event)
    click: () => console.log('Clicked'),
    mouseover: e => console.log('Mouse over'),

    // Parent element (auto-append)
    parent: document.body,

    // Child elements/text
    children: ['Some text', SPAN({textContent: 'Nested element'}), 'More text'],
});
```

### Advanced Usage

#### Custom Element Factories

```javascript
// Create custom element factory
const MyComponent = props =>
    DIV({
        className: 'my-component',
        style: {
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        children: [
            DIV({className: 'header', textContent: props.title}),
            DIV({className: 'content', children: props.children}),
        ],
    });

// Use custom component
const widget = MyComponent({
    title: 'My Widget',
    children: ['Some content here'],
});
```

#### SVG Animations and Interactions

```javascript
const {svg, circle, animate} = svgFactory;

const animatedSVG = svg({
    width: 200,
    height: 200,
    children: [
        circle({
            cx: 100,
            cy: 100,
            r: 50,
            fill: 'blue',
            children: [
                animate({
                    attributeName: 'r',
                    values: '50;80;50',
                    dur: '2s',
                    repeatCount: 'indefinite',
                }),
            ],
        }),
    ],
});
```

## Development

```bash
# Install dependencies
npm install

# Start development server (with live demo)
npm start

# Build for production
npm run build

# Run tests
npm test

# Format code
npm run prettier
```

The development server includes a comprehensive test page with examples of all JDOM.js features.
