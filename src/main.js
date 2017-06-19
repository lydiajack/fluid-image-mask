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
  constructor(config) {
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
  create() {
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
  createLayers() {
    this.backgroundLayer = new BackgroundLayer({
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
  backgroundReady() {
    this.maskingLayer = new MaskingLayer({
      'targetEl': this.backgroundLayer.getLayerEl(),
      'width': this.maskWidth,
      'height': this.maskHeight,
    });
    this.maskingLayer.addMask();
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
   * Adds the required mousemove event to position the mask.
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