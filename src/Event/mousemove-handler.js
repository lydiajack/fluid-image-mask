'use strict';

/**
 * Handles the document mousemove event by calling a series of provided callback
 * functions on animation frame or set Timeout to apply throttling to the
 * default event.
 * @TODO (lydiajack) Move to single throttled event handler.
 * @class
 */
export default class MouseMoveHandler {

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
   * Throttled mousemove event called on animation frame or as a fallback on
   * set timeout.
   * @event throttleMousemove
   * @public
   */
  throttleMousemove(event) {
    if (!this.active) {
      this.active = true;
      if (window.requestAnimationFrame) {
        //console.log(event);
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
      this.bindMousemove();
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
   * Adds the throttled mousemove event to the window object.
   * @param {!Function}
   * @fires throttleMousemove
   * @public
   */
  bindMousemove() {
    window.addEventListener('mousemove', this.throttleMousemove.bind(this));
  }

  /**
   * Removes the throttled mousemove event from the window object.
   * @param {!Function}
   * @public
   */
  unbindMousemove() {
    window.removeEventListener('mousemove', this.throttleMousemove.bind(this));
  }
};