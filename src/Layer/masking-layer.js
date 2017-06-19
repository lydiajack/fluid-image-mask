'use strict';

/**
 * Creates a masking layer.
 * @class
 */
export default class MaskingLayer {

  constructor(maskOptions) {
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
  addMask() {
  	let maskStyle = 'inset(' + this.calcMaskSize() + ')';
    this.targetEl.style.clipPath = maskStyle;
    this.targetEl.style['-webkit-clip-path'] = maskStyle;
    this.targetEl.style.visibility = 'visible';
  };

  /**
   * Calculates the default inset dimensions of the mask.
   * @public
   */
  calcMaskSize() {
  	let xInset = (this.targetEl.clientWidth - this.maskWidth) / 2,
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
  updateMaskPosition(clientX, clientY) {
  	let topInset = clientY - (this.maskHeight / 2),
  	    rightInset = ((this.targetEl.clientWidth - clientX) -
  	    	  (this.maskWidth / 2)),
  	    bottomInset = ((this.targetEl.clientHeight - clientY) -
  	    	  (this.maskHeight / 2)),
  	    leftInset = clientX - (this.maskWidth / 2);

  	let maskStyle = 'inset(' + topInset + 'px ' + rightInset + 'px ' +
  		  bottomInset + 'px ' + leftInset + 'px)';
    this.targetEl.style.clipPath = maskStyle;
    this.targetEl.style['-webkit-clip-path'] = maskStyle;
  }

  /**
   * Updates the mask position based on mouse position.
   * @param {Object} event Browser event object.
   * @listens mousemove
   */
  updateMaskMousemove(event) {
    this.updateMaskPosition(event.clientX, event.clientY);
  }
}
