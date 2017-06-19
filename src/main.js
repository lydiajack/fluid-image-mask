'use strict';

import BackgroundLayer from './Layer/background-layer';
import MaskingLayer from './Layer/masking-layer';
import ResizeHandler from './Event/resize-handler';
import MousemoveHandler from './Event/mousemove-handler';


/**
 * Creates a background layer, a masking layer and event handlers that manage
 * scaling of the background image on resize and movement of the mask layer
 * based on mouse pointer position.
 * @class
 */
export default class FluidImageMask {

  /**
   * Builds the layers based on the configuration settings.
   * @constructor
   */
  constructor(opt_config) {
    let config = opt_config || {};

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
    this.targetEl = config.targetEl || document.body;

    /**
     * @public {string}
     */
    this.filePath = config.filePath ||
        'https://unsplash.it/1920/1280';

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
  create() {
    this.createBackgroundLayer();
  }

  /**
   * Creates a background layer instance. Adds a function to be called once the
   * background image has loaded then loads the background layer.
   * @public
   */
  createBackgroundLayer() {
    this.backgroundLayer = new BackgroundLayer({
      'targetEl': this.targetEl,
      'filePath': this.filePath
    });
    this.backgroundLayer.addReadyCallback(this.createMaskLayer.bind(this));
    this.backgroundLayer.loadImage();
  }

  /**
   * Creates a mask layer instance.
   * Adds resize and mousemove handlers.
   * @public
   */
  createMaskLayer() {
    console.log('ready');
    this.maskingLayer = new MaskingLayer({
      'targetEl': this.backgroundLayer.getLayerEl(),
      'width': this.maskWidth,
      'height': this.maskHeight,
    });
    this.maskingLayer.addMask();
    this.addResizeEvent();
    this.addMousemoveEvent();
  }

  /**
   * Adds the required resize event to apply scaling to a background layer.
   * @public
   */
  addResizeEvent() {
    if (!this.resizeHandler) {
      this.resizeHandler = new ResizeHandler();
    }
    this.resizeHandler.addCallback(
      this.backgroundLayer.onWindowResize.bind(this.backgroundLayer));
  }

  /**
   * Adds the required mousemove event to position a mask.
   * @public
   */
  addMousemoveEvent() {
    if (!this.mousemoveHandler) {
      this.mousemoveHandler = new MousemoveHandler();
    }
    this.mousemoveHandler.addCallback(
      this.maskingLayer.updateMaskMousemove.bind(this.maskingLayer));
  }
}

module.exports = FluidImageMask;