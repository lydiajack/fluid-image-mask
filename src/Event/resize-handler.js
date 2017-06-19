'use strict';

/**
 * Handles the window resize event by calling a series of provided callback
 * functions on animation frame or set Timeout to apply throttling.
 * @TODO (lydiajack) Move to single throttled event handler.
 * @class
 */
export default class ResizeHandler {

  constructor() {
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
    this.throttleDelay = 64 ;
  }

  /**
   * Throttled resize event called on animation frame or as a fallback on
   * set timeout.
   * @event throttleResize
   * @public
   */
  throttleResize(event) {
    if (!this.active) {
      this.active = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(this.runCallbacks.bind(this, event));
      } else {
        this.timer = setTimeout(this.runCallbacks.bind(this, event),
            this.throttleDelay);
      }
    }
  }

  /**
   * Iterates over and calls each function in the array of callback functions.
   * Updates active state once all functions have been called.
   * @public
   */
  runCallbacks(event) {
    for (const callback of this.callbacks) {
      callback(event);
    }
    this.active = false;
  }

  /**
   * Adds a callback function to the callback stack.
   * @param {!Function}
   * @public
   */
  addCallback(callback) {
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
  removeCallback(callback) {
    let index = this.callbacks.indexOf(callback);
    if (index >= 0) {
      this.callbacks.splice(1, index);
    }
  }

  /**
   * Adds the throttled resize event to the window object.
   * @fires throttleResize
   * @public
   */
  bindResize() {
    window.addEventListener('resize', this.throttleResize.bind(this));
  }

  /**
   * Removes the throttled resize event from the window object.
   * @public
   */
  unbindResize() {
    window.removeEventListener('resize', this.throttleResize.bind(this));
  }
};