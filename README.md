# Fluid Image Mask
Fluid Image Mask is a JavaScript feature which displays a mask over an img
element. The mask position is fluid and can move based on user interaction.

## Installation

Add the library script in your HTML document:

```html
<script src="js/fluid-image-mask/fluid-image-mask.js"></script>
```

## Usage

Fluid Image Mask is designed to use a class pattern.

Basic creation:

```javascript
  var fim = new FluidImageMask({
    'targetEl': document.body,
    'filePath': 'assets/some-image-path.jpg',
    'maskWidth': '300',
    'maskHeight': '300'
  });
  fim.create();
```

## Grunt tasks

The following Grunt tasks can be used for working on the library.

- grunt serve
- grunt serve:prod
- grunt dev
- grunt test
- grunt dist


### Grunt serve task

The Grunt serve task without a target will serve the example usage of the
library with bundled but unoptimised JavaScript and is intended for development
only.

` $ grunt serve`

The Grunt serve task with the prod target will serve the example usage of the
library with compiled and optimised JavaScript. It will also compile the
distribution code.

` $ grunt serve:prod`


### Grunt dev task

The Grunt dev task can be used to clean and rebundle the JavaScript to the
examples directory.

` $ grunt dev`


### Grunt test task

The Grunt test task will run all tests for the library's dist output. The
output will be comp[iled to the test directory.

` $ grunt test`


### Grunt dist task

The Grunt dist task will clean and reproduce the library's distribution code to
the dist directory.

` $ grunt dist`


## Browser Support

Fluid Image Mask is currently reliant on clip-path. Future releases will be
aiming to resolve this and support the most recent version of all major
browsers. For current clip-path support please see:
https://caniuse.com/#search=clip-path

## Release Notes

## About the Author

This project was begun to extend my knowledge of Compiling and Distributing a
JavaScript feature and to progress my use of JavaScript ES6 patterns.




