function start() {

  var width = 800,
      height = 600;

  var stage = new PIXI.Stage(0xCCCCCC);
  var renderer = PIXI.autoDetectRenderer(
      width,
      height,
      document.getElementById('thingamcbob')
    );

  renderer.render(stage);
}