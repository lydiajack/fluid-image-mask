'use strict';

/**
 * Creates a background layer.
 * @class
 */
export default class BackgroundLayer {

  constructor(backgroundOptions) {
  	/**
     * @public {!HTMLElement}
     */
    this.targetEl = backgroundOptions.targetEl;

    /**
     * @public {!string}
     */
    this.filePath = backgroundOptions.filePath ||  '';

    /**
     * @public {!Array<string>}
     */
    this.layerClassList = backgroundOptions.layerClass  || [];

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
		  DEFAULT_CLASS: 'fluid-image-mask-background',
	  };

	  /**
     * @const @enum {string}
     */
    this.measurementSuffix = {
		  PIXEL: 'px',
	  };
  }

  /**
   * Creates a new image instance and loads the resource to display as the
   * background.
   * @public
   */
  loadImage() {
  	this.image = new Image();
  	this.image.onload = this.imageLoaded.bind(this);
  	this.image.src = this.filePath;
  }

  /**
   * Updates the dom elements for the background layer and image.
   * @public
   */
  imageLoaded() {
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
  backgroundLayerReady() {
  	this.readyState = true;
  	for (const callback of this.completeCallbacks) {
		  callback();
		}
  }

  /**
   * Creates the necesssary dom elements for the background layer.
   * @TODO (lydiajack) Move dom attribute setting to util.
   * @public
   */
  createDom() {
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
  addDom() {
  	this.targetEl.append(this.layerEl);
  }

  /**
   * Scales the background image to fit the window.
   * @public
   */
  scaleImage() {
  	let imagePos = this.calcImagePos();
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
  calcImagePos() {
    let targetRatio = Math.max(
    	    (this.layerEl.clientWidth / this.image.naturalWidth), 
          (this.layerEl.clientHeight / this.image.naturalHeight)),
        imagePos = {};
    imagePos.height = Math.ceil(this.image.naturalHeight * targetRatio);
    imagePos.width = Math.ceil(this.image.naturalWidth * targetRatio);
    imagePos.left = imagePos.width > this.layerEl.clientWidth ?
        - Math.floor((imagePos.width - this.layerEl.clientWidth) / 2) : 0;
    imagePos.top = imagePos.height > this.layerEl.clientHeight ? 
        - Math.floor((imagePos.height - this.layerEl.clientHeight) / 2) : 0;
    return imagePos;
  }

  /**
   * Gets the layers main dom element.
   * @return {!HTMLElement}
   */
  getLayerEl() {
  	return this.layerEl;
  }

  /**
   * Updates the layer elements classlist based on the class list config.
   * @public
   */
  updateLayerClasslist() {
  	for (const className of this.layerClassList) {
		  this.layerEl.classList.add(className);
		}
		this.layerEl.classList.add(this.layeClassName.DEFAULT_CLASS);
  }

  /**
   * Adds a callback to the layer's ready callback stack.
   * @param {!Function} callback
   * @public
   */
  addReadyCallback(callback) {
  	this.completeCallbacks.push(callback);
  }

  /**
   * Removes a callback from the layer's ready callback stack.
   * @param {!Function} callback
   * @public
   */
  removeReadyCallback(callback) {
  	this.completeCallbacks.splice(this.completeCallbacks.indexOf(callback), 1);
  }

  /**
   * Performs necessary updates when the window is resized.
   * @param {Object} event Browser event object.
   * @listens resize
   */
  onWindowResize(event) {
    this.scaleImage();
  }
}
