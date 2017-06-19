(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("FluidImageMask", [], factory);
	else if(typeof exports === 'object')
		exports["FluidImageMask"] = factory();
	else
		root["FluidImageMask"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Handles the document mousemove event by calling a series of provided callback
 * functions on animation frame or set Timeout to apply throttling to the
 * default event.
 * @TODO (lydiajack) Move to single throttled event handler.
 * @class
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MouseMoveHandler = function () {
  function MouseMoveHandler() {
    _classCallCheck(this, MouseMoveHandler);

    /**
     * @public {!Array<Function>}
     */
    this.callbacks = [];

    /**
     * @public {boolean}
     */
    this.active = false;

    /**
     * @public {?Function}
     */
    this.timer = null;

    /**
     * @public {boolean}
     */
    this.throttleDelay = 64;
  }

  /**
   * Throttled mousemove event called on animation frame or as a fallback on
   * set timeout.
   * @event throttleMousemove
   * @public
   */


  _createClass(MouseMoveHandler, [{
    key: 'throttleMousemove',
    value: function throttleMousemove(event) {
      if (!this.active) {
        this.active = true;
        if (window.requestAnimationFrame) {
          //console.log(event);
          window.requestAnimationFrame(this.runCallbacks.bind(this, event));
        } else {
          this.timer = setTimeout(this.runCallbacks.bind(this, event), this.throttleDelay);
        }
      }
    }

    /**
     * Iterates over and calls each function in the array of callback functions.
     * Updates active state once all functions have been called.
     * @public
     */

  }, {
    key: 'runCallbacks',
    value: function runCallbacks(event) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var callback = _step.value;

          callback(event);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.active = false;
    }

    /**
     * Adds a callback function to the callback stack.
     * @param {!Function}
     * @public
     */

  }, {
    key: 'addCallback',
    value: function addCallback(callback) {
      if (!this.callbacks.length) {
        this.bindMousemove();
      }
      this.callbacks.push(callback);
    }

    /**
     * Removes a callback function from the callback stack.
     * @param {!Function}
     * @public
     */

  }, {
    key: 'removeCallback',
    value: function removeCallback(callback) {
      var index = this.callbacks.indexOf(callback);
      if (index >= 0) {
        this.callbacks.splice(1, index);
      }
    }

    /**
     * Adds the throttled mousemove event to the window object.
     * @param {!Function}
     * @fires throttleMousemove
     * @public
     */

  }, {
    key: 'bindMousemove',
    value: function bindMousemove() {
      window.addEventListener('mousemove', this.throttleMousemove.bind(this));
    }

    /**
     * Removes the throttled mousemove event from the window object.
     * @param {!Function}
     * @public
     */

  }, {
    key: 'unbindMousemove',
    value: function unbindMousemove() {
      window.removeEventListener('mousemove', this.throttleMousemove.bind(this));
    }
  }]);

  return MouseMoveHandler;
}();

exports.default = MouseMoveHandler;
;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Handles the window resize event by calling a series of provided callback
 * functions on animation frame or set Timeout to apply throttling.
 * @TODO (lydiajack) Move to single throttled event handler.
 * @class
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResizeHandler = function () {
  function ResizeHandler() {
    _classCallCheck(this, ResizeHandler);

    /**
     * @public {!Array<Function>}
     */
    this.callbacks = [];

    /**
     * @public {boolean}
     */
    this.active = false;

    /**
     * @public {?Function}
     */
    this.timer = null;

    /**
     * @public {boolean}
     */
    this.throttleDelay = 64;
  }

  /**
   * Throttled resize event called on animation frame or as a fallback on
   * set timeout.
   * @event throttleResize
   * @public
   */


  _createClass(ResizeHandler, [{
    key: 'throttleResize',
    value: function throttleResize(event) {
      if (!this.active) {
        this.active = true;
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(this.runCallbacks.bind(this, event));
        } else {
          this.timer = setTimeout(this.runCallbacks.bind(this, event), this.throttleDelay);
        }
      }
    }

    /**
     * Iterates over and calls each function in the array of callback functions.
     * Updates active state once all functions have been called.
     * @public
     */

  }, {
    key: 'runCallbacks',
    value: function runCallbacks(event) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var callback = _step.value;

          callback(event);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.active = false;
    }

    /**
     * Adds a callback function to the callback stack.
     * @param {!Function}
     * @public
     */

  }, {
    key: 'addCallback',
    value: function addCallback(callback) {
      if (!this.callbacks.length) {
        this.bindResize();
      }
      this.callbacks.push(callback);
    }

    /**
     * Removes a callback function from the callback stack.
     * @param {!Function}
     * @public
     */

  }, {
    key: 'removeCallback',
    value: function removeCallback(callback) {
      var index = this.callbacks.indexOf(callback);
      if (index >= 0) {
        this.callbacks.splice(1, index);
      }
    }

    /**
     * Adds the throttled resize event to the window object.
     * @fires throttleResize
     * @public
     */

  }, {
    key: 'bindResize',
    value: function bindResize() {
      window.addEventListener('resize', this.throttleResize.bind(this));
    }

    /**
     * Removes the throttled resize event from the window object.
     * @public
     */

  }, {
    key: 'unbindResize',
    value: function unbindResize() {
      window.removeEventListener('resize', this.throttleResize.bind(this));
    }
  }]);

  return ResizeHandler;
}();

exports.default = ResizeHandler;
;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a background layer.
 * @class
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BackgroundLayer = function () {
  function BackgroundLayer(backgroundOptions) {
    _classCallCheck(this, BackgroundLayer);

    /**
      * @public {!HTMLElement}
      */
    this.targetEl = backgroundOptions.targetEl;

    /**
     * @public {!string}
     */
    this.filePath = backgroundOptions.filePath || '';

    /**
     * @public {!Array<string>}
     */
    this.layerClassList = backgroundOptions.layerClass || [];

    /**
     * Set of functions to call once the image is loaded and the background
     * layer has been added to the dom.
     * @public {!Array<Function>}
     */
    this.completeCallbacks = [];

    /**
      * @public {?Image}
      */
    this.image = null;

    /**
     * @public {?HTMLElement<div>}
     */
    this.layerEl = null;

    /**
     * @const {boolean}
     */
    this.readyState = false;

    /**
     * @const @enum {string}
     */
    this.layerElAttribute = {
      HEIGHT: '100%',
      WIDTH: '100%',
      OVERFLOW: 'hidden',
      POSITION: 'relative',
      VISIBILITY: 'hidden'
    };

    /**
      * @const @enum {string}
      */
    this.imageElAttribute = {
      HEIGHT: 0,
      WIDTH: 0,
      POSITION: 'absolute'
    };

    /**
      * @const @enum {string}
      */
    this.layeClassName = {
      DEFAULT_CLASS: 'fluid-image-mask-background'
    };

    /**
      * @const @enum {string}
      */
    this.measurementSuffix = {
      PIXEL: 'px'
    };
  }

  /**
   * Creates a new image instance and loads the resource to display as the
   * background.
   * @public
   */


  _createClass(BackgroundLayer, [{
    key: 'loadImage',
    value: function loadImage() {
      this.image = new Image();
      this.image.onload = this.imageLoaded.bind(this);
      this.image.src = this.filePath;
    }

    /**
     * Updates the dom elements for the background layer and image.
     * @public
     */

  }, {
    key: 'imageLoaded',
    value: function imageLoaded() {
      this.createDom();
      this.addDom();
      this.scaleImage();
      this.backgroundLayerReady();
    }

    /**
     * Updates the background layers ready state and calls any provided callback
     * functions.
     * @public
     */

  }, {
    key: 'backgroundLayerReady',
    value: function backgroundLayerReady() {
      this.readyState = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.completeCallbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var callback = _step.value;

          callback();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Creates the necesssary dom elements for the background layer.
     * @TODO (lydiajack) Move dom attribute setting to util.
     * @public
     */

  }, {
    key: 'createDom',
    value: function createDom() {
      this.layerEl = document.createElement('div');
      this.layerEl.style.position = this.layerElAttribute.POSITION;
      this.layerEl.style.height = this.layerElAttribute.HEIGHT;
      this.layerEl.style.width = this.layerElAttribute.WIDTH;
      this.layerEl.style.overflow = this.layerElAttribute.OVERFLOW;
      this.layerEl.style.visibility = this.layerElAttribute.VISIBILITY;
      this.updateLayerClasslist();

      this.image.style.position = this.imageElAttribute.POSITION;
      this.image.height = this.imageElAttribute.HEIGHT;
      this.image.width = this.imageElAttribute.WIDTH;
      this.layerEl.append(this.image);
    }

    /**
     * Adds the dom elements for the background layer to the target element.
     * @public
     */

  }, {
    key: 'addDom',
    value: function addDom() {
      this.targetEl.append(this.layerEl);
    }

    /**
     * Scales the background image to fit the window.
     * @public
     */

  }, {
    key: 'scaleImage',
    value: function scaleImage() {
      var imagePos = this.calcImagePos();
      this.image.height = imagePos.height;
      this.image.width = imagePos.width;
      this.image.style.left = imagePos.left + this.measurementSuffix.PIXEL;
      this.image.style.top = imagePos.top + this.measurementSuffix.PIXEL;
    }

    /**
     * Calculates the image size and offset to scale and center the image relative
     * to the background layer.
     * @return {!Object<string, Number>} height, width, left, top size and
     *     positions to apply to the image so it fills the wrapper element.
     * @public
     */

  }, {
    key: 'calcImagePos',
    value: function calcImagePos() {
      var targetRatio = Math.max(this.layerEl.clientWidth / this.image.naturalWidth, this.layerEl.clientHeight / this.image.naturalHeight),
          imagePos = {};
      imagePos.height = Math.ceil(this.image.naturalHeight * targetRatio);
      imagePos.width = Math.ceil(this.image.naturalWidth * targetRatio);
      imagePos.left = imagePos.width > this.layerEl.clientWidth ? -Math.floor((imagePos.width - this.layerEl.clientWidth) / 2) : 0;
      imagePos.top = imagePos.height > this.layerEl.clientHeight ? -Math.floor((imagePos.height - this.layerEl.clientHeight) / 2) : 0;
      return imagePos;
    }

    /**
     * Gets the layers main dom element.
     * @return {!HTMLElement}
     */

  }, {
    key: 'getLayerEl',
    value: function getLayerEl() {
      return this.layerEl;
    }

    /**
     * Updates the layer elements classlist based on the class list config.
     * @public
     */

  }, {
    key: 'updateLayerClasslist',
    value: function updateLayerClasslist() {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.layerClassList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var className = _step2.value;

          this.layerEl.classList.add(className);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.layerEl.classList.add(this.layeClassName.DEFAULT_CLASS);
    }

    /**
     * Adds a callback to the layer's ready callback stack.
     * @param {!Function} callback
     * @public
     */

  }, {
    key: 'addReadyCallback',
    value: function addReadyCallback(callback) {
      this.completeCallbacks.push(callback);
    }

    /**
     * Removes a callback from the layer's ready callback stack.
     * @param {!Function} callback
     * @public
     */

  }, {
    key: 'removeReadyCallback',
    value: function removeReadyCallback(callback) {
      this.completeCallbacks.splice(this.completeCallbacks.indexOf(callback), 1);
    }

    /**
     * Performs necessary updates when the window is resized.
     * @param {Object} event Browser event object.
     * @listens resize
     */

  }, {
    key: 'onWindowResize',
    value: function onWindowResize(event) {
      this.scaleImage();
    }
  }]);

  return BackgroundLayer;
}();

exports.default = BackgroundLayer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a masking layer.
 * @class
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaskingLayer = function () {
  function MaskingLayer(maskOptions) {
    _classCallCheck(this, MaskingLayer);

    /**
      * @public {!HTMLElement}
      */
    this.targetEl = maskOptions.targetEl;

    /**
      * @public {Number}
      */
    this.maskWidth = maskOptions.width;

    /**
     * @public {Number}
     */
    this.maskHeight = maskOptions.height;
  }

  /**
   * Adds the clip path mask to the target layer.
   * @TODO (lydiajack) Move dom attribute setting to util.
   * @public
   */


  _createClass(MaskingLayer, [{
    key: 'addMask',
    value: function addMask() {
      var maskStyle = 'inset(' + this.calcMaskSize() + ')';
      this.targetEl.style.clipPath = maskStyle;
      this.targetEl.style['-webkit-clip-path'] = maskStyle;
      this.targetEl.style.visibility = 'visible';
    }
  }, {
    key: 'calcMaskSize',


    /**
     * Calculates the default inset dimensions of the mask.
     * @public
     */
    value: function calcMaskSize() {
      var xInset = (this.targetEl.clientWidth - this.maskWidth) / 2,
          yInset = (this.targetEl.clientHeight - this.maskHeight) / 2;
      return yInset + 'px ' + xInset + 'px';
    }

    /**
     * Works out the inset dimensions of the mask.
     * @TODO (lydiajack) Refactor position calculation.
     * @TODO (lydiajack) Move dom attribute setting to util.
     * @TODO (lydiajack) Add fallback for clip-path.
     * @public
     */

  }, {
    key: 'updateMaskPosition',
    value: function updateMaskPosition(clientX, clientY) {
      var topInset = clientY - this.maskHeight / 2,
          rightInset = this.targetEl.clientWidth - clientX - this.maskWidth / 2,
          bottomInset = this.targetEl.clientHeight - clientY - this.maskHeight / 2,
          leftInset = clientX - this.maskWidth / 2;

      var maskStyle = 'inset(' + topInset + 'px ' + rightInset + 'px ' + bottomInset + 'px ' + leftInset + 'px)';
      this.targetEl.style.clipPath = maskStyle;
      this.targetEl.style['-webkit-clip-path'] = maskStyle;
    }

    /**
     * Updates the mask position based on mouse position.
     * @param {Object} event Browser event object.
     * @listens mousemove
     */

  }, {
    key: 'updateMaskMousemove',
    value: function updateMaskMousemove(event) {
      this.updateMaskPosition(event.clientX, event.clientY);
    }
  }]);

  return MaskingLayer;
}();

exports.default = MaskingLayer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _backgroundLayer = __webpack_require__(2);

var _backgroundLayer2 = _interopRequireDefault(_backgroundLayer);

var _maskingLayer = __webpack_require__(3);

var _maskingLayer2 = _interopRequireDefault(_maskingLayer);

var _resizeHandler = __webpack_require__(1);

var _resizeHandler2 = _interopRequireDefault(_resizeHandler);

var _mousemoveHandler = __webpack_require__(0);

var _mousemoveHandler2 = _interopRequireDefault(_mousemoveHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates a background layer, a masking layer and event handlers that manage
 * scaling of the background image on resize and movement of the mask layer
 * based on mouse pointer position.
 * @class
 */
var FluidImageMask = function () {

  /**
   * Builds the layers based on the configuration settings.
   * @constructor
   */
  function FluidImageMask(config) {
    _classCallCheck(this, FluidImageMask);

    /**
     * An instance of background layer.
     * @public {?BackgroundLayer}
     */
    this.backgroundLayer = null;

    /**
     * An instance of mask layer.
     * @public {?MaskingLayer}
     */
    this.maskingLayer = null;

    /**
     * An rinstance of resize handler.
     * @public {?ResizeHandler}
     */
    this.resizeHandler = null;

    /**
     * An instance of mousemove handler.
     * @public {?MousemoveHandler}
     */
    this.mousemoveHandler = null;

    /**
     * @public {!HTMLElement}
     */
    this.targetEl = config.targetEl;

    /**
     * @public {string}
     */
    this.filePath = config.filePath || '';

    /**
     * @public {Number}
     */
    this.maskWidth = config.maskWidth || 0;

    /**
     * @public {Number}
     */
    this.maskHeight = config.maskHeight || 0;
  }

  /**
   * Creates the layers based on the configuration settings.
   * @public
   */


  _createClass(FluidImageMask, [{
    key: 'create',
    value: function create() {
      if (this.targetEl) {
        this.createLayers();
        this.addResizeEvent();
      } else {
        console.info('No target container was found for the Fluid Image Mask');
      }
    }

    /**
     * Creates instances of background and masking layers. Binds a
     * callback to the background image load function which will then place
     * the mask.
     * @public
     */

  }, {
    key: 'createLayers',
    value: function createLayers() {
      this.backgroundLayer = new _backgroundLayer2.default({
        'targetEl': this.targetEl,
        'filePath': this.filePath
      });
      this.backgroundLayer.addReadyCallback(this.backgroundReady.bind(this));
      this.backgroundLayer.loadImage();
    }

    /**
     * On background ready callback to begin masking.
     * @public
     */

  }, {
    key: 'backgroundReady',
    value: function backgroundReady() {
      this.maskingLayer = new _maskingLayer2.default({
        'targetEl': this.backgroundLayer.getLayerEl(),
        'width': this.maskWidth,
        'height': this.maskHeight
      });
      this.maskingLayer.addMask();
      this.addMousemoveEvent();
    }

    /**
     * Adds the required resize event to apply scaling to a background layer.
     * @public
     */

  }, {
    key: 'addResizeEvent',
    value: function addResizeEvent() {
      if (!this.resizeHandler) {
        this.resizeHandler = new _resizeHandler2.default();
      }
      this.resizeHandler.addCallback(this.backgroundLayer.onWindowResize.bind(this.backgroundLayer));
    }

    /**
     * Adds the required mousemove event to position the mask.
     * @public
     */

  }, {
    key: 'addMousemoveEvent',
    value: function addMousemoveEvent() {
      if (!this.mousemoveHandler) {
        this.mousemoveHandler = new _mousemoveHandler2.default();
      }
      this.mousemoveHandler.addCallback(this.maskingLayer.updateMaskMousemove.bind(this.maskingLayer));
    }
  }]);

  return FluidImageMask;
}();

exports.default = FluidImageMask;


module.exports = FluidImageMask;

/***/ })
/******/ ]);
});
//# sourceMappingURL=fluid-image-mask.js.map