!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("FluidImageMask",[],t):"object"==typeof exports?exports.FluidImageMask=t():e.FluidImageMask=t()}(this,function(){return function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};return t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,a){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;t.length>i;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();t.default=function(){function e(){a(this,e),this.callbacks=[],this.active=!1,this.timer=null,this.throttleDelay=64}return n(e,[{key:"throttleMousemove",value:function(e){this.active||(this.active=!0,window.requestAnimationFrame?window.requestAnimationFrame(this.runCallbacks.bind(this,e)):this.timer=setTimeout(this.runCallbacks.bind(this,e),this.throttleDelay))}},{key:"runCallbacks",value:function(e){var t=!0,i=!1,a=void 0;try{for(var n,l=this.callbacks[Symbol.iterator]();!(t=(n=l.next()).done);t=!0){(0,n.value)(e)}}catch(e){i=!0,a=e}finally{try{!t&&l.return&&l.return()}finally{if(i)throw a}}this.active=!1}},{key:"addCallback",value:function(e){this.callbacks.length||this.bindMousemove(),this.callbacks.push(e)}},{key:"removeCallback",value:function(e){var t=this.callbacks.indexOf(e);0>t||this.callbacks.splice(1,t)}},{key:"bindMousemove",value:function(){window.addEventListener("mousemove",this.throttleMousemove.bind(this))}},{key:"unbindMousemove",value:function(){window.removeEventListener("mousemove",this.throttleMousemove.bind(this))}}]),e}()},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;t.length>i;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();t.default=function(){function e(){a(this,e),this.callbacks=[],this.active=!1,this.timer=null,this.throttleDelay=64}return n(e,[{key:"throttleResize",value:function(e){this.active||(this.active=!0,window.requestAnimationFrame?window.requestAnimationFrame(this.runCallbacks.bind(this,e)):this.timer=setTimeout(this.runCallbacks.bind(this,e),this.throttleDelay))}},{key:"runCallbacks",value:function(e){var t=!0,i=!1,a=void 0;try{for(var n,l=this.callbacks[Symbol.iterator]();!(t=(n=l.next()).done);t=!0){(0,n.value)(e)}}catch(e){i=!0,a=e}finally{try{!t&&l.return&&l.return()}finally{if(i)throw a}}this.active=!1}},{key:"addCallback",value:function(e){this.callbacks.length||this.bindResize(),this.callbacks.push(e)}},{key:"removeCallback",value:function(e){var t=this.callbacks.indexOf(e);0>t||this.callbacks.splice(1,t)}},{key:"bindResize",value:function(){window.addEventListener("resize",this.throttleResize.bind(this))}},{key:"unbindResize",value:function(){window.removeEventListener("resize",this.throttleResize.bind(this))}}]),e}()},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;t.length>i;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();t.default=function(){function e(t){a(this,e),this.targetEl=t.targetEl,this.filePath=t.filePath||"",this.layerClassList=t.layerClass||[],this.completeCallbacks=[],this.image=null,this.layerEl=null,this.readyState=!1,this.layerElAttribute={HEIGHT:"100%",WIDTH:"100%",OVERFLOW:"hidden",POSITION:"relative",VISIBILITY:"hidden"},this.imageElAttribute={HEIGHT:0,WIDTH:0,POSITION:"absolute"},this.layeClassName={DEFAULT_CLASS:"fluid-image-mask-background"},this.measurementSuffix={PIXEL:"px"}}return n(e,[{key:"loadImage",value:function(){this.image=new Image,this.image.onload=this.imageLoaded.bind(this),this.image.src=this.filePath}},{key:"imageLoaded",value:function(){this.createDom(),this.addDom(),this.scaleImage(),this.backgroundLayerReady()}},{key:"backgroundLayerReady",value:function(){this.readyState=!0;var e=!0,t=!1,i=void 0;try{for(var a,n=this.completeCallbacks[Symbol.iterator]();!(e=(a=n.next()).done);e=!0){(0,a.value)()}}catch(e){t=!0,i=e}finally{try{!e&&n.return&&n.return()}finally{if(t)throw i}}}},{key:"createDom",value:function(){this.layerEl=document.createElement("div"),this.layerEl.style.position=this.layerElAttribute.POSITION,this.layerEl.style.height=this.layerElAttribute.HEIGHT,this.layerEl.style.width=this.layerElAttribute.WIDTH,this.layerEl.style.overflow=this.layerElAttribute.OVERFLOW,this.layerEl.style.visibility=this.layerElAttribute.VISIBILITY,this.updateLayerClasslist(),this.image.style.position=this.imageElAttribute.POSITION,this.image.height=this.imageElAttribute.HEIGHT,this.image.width=this.imageElAttribute.WIDTH,this.layerEl.append(this.image)}},{key:"addDom",value:function(){this.targetEl.append(this.layerEl)}},{key:"scaleImage",value:function(){var e=this.calcImagePos();this.image.height=e.height,this.image.width=e.width,this.image.style.left=e.left+this.measurementSuffix.PIXEL,this.image.style.top=e.top+this.measurementSuffix.PIXEL}},{key:"calcImagePos",value:function(){var e=Math.max(this.layerEl.clientWidth/this.image.naturalWidth,this.layerEl.clientHeight/this.image.naturalHeight),t={};return t.height=Math.ceil(this.image.naturalHeight*e),t.width=Math.ceil(this.image.naturalWidth*e),t.left=t.width>this.layerEl.clientWidth?-Math.floor((t.width-this.layerEl.clientWidth)/2):0,t.top=t.height>this.layerEl.clientHeight?-Math.floor((t.height-this.layerEl.clientHeight)/2):0,t}},{key:"getLayerEl",value:function(){return this.layerEl}},{key:"updateLayerClasslist",value:function(){var e=!0,t=!1,i=void 0;try{for(var a,n=this.layerClassList[Symbol.iterator]();!(e=(a=n.next()).done);e=!0){this.layerEl.classList.add(a.value)}}catch(e){t=!0,i=e}finally{try{!e&&n.return&&n.return()}finally{if(t)throw i}}this.layerEl.classList.add(this.layeClassName.DEFAULT_CLASS)}},{key:"addReadyCallback",value:function(e){this.completeCallbacks.push(e)}},{key:"removeReadyCallback",value:function(e){this.completeCallbacks.splice(this.completeCallbacks.indexOf(e),1)}},{key:"onWindowResize",value:function(e){this.scaleImage()}}]),e}()},function(e,t,i){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;t.length>i;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}();t.default=function(){function e(t){a(this,e),this.targetEl=t.targetEl,this.maskWidth=t.width,this.maskHeight=t.height}return n(e,[{key:"addMask",value:function(){var e="inset("+this.calcMaskSize()+")";this.targetEl.style.clipPath=e,this.targetEl.style["-webkit-clip-path"]=e,this.targetEl.style.visibility="visible"}},{key:"calcMaskSize",value:function(){return(this.targetEl.clientHeight-this.maskHeight)/2+"px "+(this.targetEl.clientWidth-this.maskWidth)/2+"px"}},{key:"updateMaskPosition",value:function(e,t){var i=t-this.maskHeight/2,a=this.targetEl.clientWidth-e-this.maskWidth/2,n=this.targetEl.clientHeight-t-this.maskHeight/2,l=e-this.maskWidth/2,s="inset("+i+"px "+a+"px "+n+"px "+l+"px)";this.targetEl.style.clipPath=s,this.targetEl.style["-webkit-clip-path"]=s}},{key:"updateMaskMousemove",value:function(e){this.updateMaskPosition(e.clientX,e.clientY)}}]),e}()},function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var i=0;t.length>i;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),s=i(2),r=a(s),o=i(3),u=a(o),h=i(1),c=a(h),d=i(0),f=a(d),y=function(){function e(t){n(this,e),this.backgroundLayer=null,this.maskingLayer=null,this.resizeHandler=null,this.mousemoveHandler=null,this.targetEl=t.targetEl,this.filePath=t.filePath||"",this.maskWidth=t.maskWidth||0,this.maskHeight=t.maskHeight||0}return l(e,[{key:"create",value:function(){this.targetEl?(this.createLayers(),this.addResizeEvent()):console.info("No target container was found for the Fluid Image Mask")}},{key:"createLayers",value:function(){this.backgroundLayer=new r.default({targetEl:this.targetEl,filePath:this.filePath}),this.backgroundLayer.addReadyCallback(this.backgroundReady.bind(this)),this.backgroundLayer.loadImage()}},{key:"backgroundReady",value:function(){this.maskingLayer=new u.default({targetEl:this.backgroundLayer.getLayerEl(),width:this.maskWidth,height:this.maskHeight}),this.maskingLayer.addMask(),this.addMousemoveEvent()}},{key:"addResizeEvent",value:function(){this.resizeHandler||(this.resizeHandler=new c.default),this.resizeHandler.addCallback(this.backgroundLayer.onWindowResize.bind(this.backgroundLayer))}},{key:"addMousemoveEvent",value:function(){this.mousemoveHandler||(this.mousemoveHandler=new f.default),this.mousemoveHandler.addCallback(this.maskingLayer.updateMaskMousemove.bind(this.maskingLayer))}}]),e}();t.default=y,e.exports=y}])});