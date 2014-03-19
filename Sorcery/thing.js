$(document).ready( function () {
  
  var clickyThing = {
    timeoutID: 0,
    stage: new PIXI.Stage(0xCCCCCC, true),
    HDFrame: new PIXI.Sprite.fromImage('HDframe1.png'),
    imageWidth: 0,
    imageHeight: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    scale: 1,
    initialize: function () {
      var assetsToLoader = ["frame.json"],
          self = this,
          currentFrame = 1;

      self.loader = new PIXI.AssetLoader(assetsToLoader);

      self.loader.onComplete = onAssetsLoaded;

      // Get canvas height/width
      self.resizeCanvas();

      var renderer = PIXI.autoDetectRenderer(self.canvasWidth, self.canvasHeight);

      self.loader.load();

      // Assets loaded

      self.scale = self.canvasWidth/self.imageWidth;

      self.scaleAssets();

      var numFrames = 5;

      window.onresize = self.resizeCanvas;

      document.body.appendChild(renderer.view);

      function onAssetsLoaded () {
        
        var frames = [];
        var frame;

        for (var x = 0; x < numFrames; x++) {
          frame = PIXI.Texture.fromFrame("frame"+(x+1)+".png");
          frames.push(frame);
        }

        // Set the base width and height of the image from the image sequence
        self.imageWidth = frames[0].width;
        self.imageHeight = frames[0].height;

        //make a tuckIn variable holding the frames as a PIXI MovieClip
        self.tuckIn = new PIXI.MovieClip(frames);
        self.tuckIn.stop();

        self.stage.addChildAt(self.tuckIn, 0);
        self.stage.addChildAt(self.HDFrame, 1);

        createPointer(self.canvasWidth * .1, self.canvasHeight /2);
        //window.setInterval(animate, 1000);
        requestAnimFrame(animate);
      }

      function animate () {
        requestAnimFrame(animate);

        renderer.render(self.stage);
      }

      function createPointer(x, y) {
        var point = PIXI.Texture.fromImage('pointer.png');
        // create our little bunny friend..
        var pointer = new PIXI.Sprite(point);

        // enable the bunny to be interactive.. this will allow it to respond to mouse and touch events
        pointer.interactive = true;
        // this button mode will mean the hand cursor appears when you rollover the bunny with your mouse
        pointer.buttonMode = true;

        
        // make it a bit bigger, so its easier to touch
        pointer.scale.x = pointer.scale.y = self.scale;
        // center the bunnys anchor point
        pointer.anchor.x = 0.3;
        pointer.anchor.y = 0.5;

        // use the mousedown and touchstart
        pointer.mousedown = pointer.touchstart = function(data)
        {
          // stop the default event...
          data.originalEvent.preventDefault();

          // store a reference to the data
          // The reason for this is because of multitouch
          // we want to track the movement of this particular touch
          this.data = data;
          this.alpha = 0.5;
          this.dragging = true;
        };

        // set the events for when the mouse is released or a touch is released
        pointer.mouseup = pointer.mouseupoutside = pointer.touchend = pointer.touchendoutside = function(data)
        {
          this.alpha = 1;
          this.dragging = false;
          // set the interaction data to null
          this.data = null;

        };

        // set the callbacks for when the mouse or a touch moves
        pointer.mousemove = pointer.touchmove = function(data)
        {
          if(this.dragging)
          {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x;

            if (self.HDFrame !== undefined) {
              self.removeHD();
            }

            /* Clear the timeout when the pointer is dragged
               Set it again after so that the HDFrame loads while the pointer is still
            */
            window.clearTimeout(self.timeoutID);
            self.timeoutID = window.setTimeout(function () {
              console.log('working')
              self.startLoading(currentFrame+1);
            } , 500);

            currentFrame = Math.floor((this.position.x/self.canvasWidth) * numFrames);
            self.tuckIn.gotoAndStop(currentFrame);
            self.stage.addChildAt(self.tuckIn, 0);
          }
        }

        // move the sprite to its designated position
        pointer.position.x = x;
        pointer.position.y = y;

        // add it to the stage
        self.stage.addChildAt(pointer, 2);
      }



    },
    scaleAssets: function () {
      // Just sets all scalable PIXI items to the scale

      var c = null;

      for (var x = 0; x < this.stage.children.length; x++) {
        c = this.stage.getChildAt(x);
        c.scale = self.scale;
      }
      //this.tuckIn.scale = this.scale;//.x = self.tuckIn.scale.y = self.scale;
      //this.HDFrame.scale = this.scale;//.x = self.HDFrame.scale.y = self.scale;
      //this.HDFrame.scale = this.scale;
    },
    startLoading: function (curFrame) {
      this.HDFrame = new PIXI.Sprite.fromImage('HDframe' + curFrame + '.png');
      this.stage.addChildAt(this.HDFrame, 1);
    },
    stopLoading: function () {

    },
    removeHD: function () {
      this.stage.removeChild(this.HDFrame);
      this.HDFrame = undefined;
    },
    resizeCanvas: function () {
      this.canvasWidth = $(window).innerWidth();
      this.canvasHeight = $(window).innerHeight();
    }
  }

  clickyThing.initialize();

  //var thing = $.extend(true, {}, clickyThing);
  //thing.initialize();
  //var bob = $.extend(true, {}, clickyThing);
  //bob.initialize();

});