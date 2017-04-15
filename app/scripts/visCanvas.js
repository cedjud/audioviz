class VisCanvas {
  constructor(){
    this.width = 800;
    this.height = 400;
    this.layer = new Konva.Layer();
    this.stage = new Konva.Stage({
      container: 'container',
      width: this.width,
      height: this.height
    });
    // this.bpm = 500; // This should somehow calculate bpm
    this.animation;
  }

  addNode(obj, layer) {
    var node = new Konva.Circle({
      x: obj.x,
      y: obj.y,
      radius: obj.radius,
      id: obj.id,
      fill: 'white',
      opacity: obj.opacity
    });
    layer.add(node);
  }

  addTrack(){
    // this should add a track, creating a new Track object and adding it's
    // visualisation to the canvas
  }

  drawLayer(numTracks){
    // create layer
    // var layer = this.layer;
    this.layer.destroyChildren();

    // configuration values for circles
    let itemHeight = this.height / 8;
    let diameter = itemHeight / 2;
    let radius = diameter / 2;
    let center = diameter;
    var centerX = center;
    var centerY = center;

    // draw each track
    for (var i = 0; i < numTracks; i++){

      // Set centerX to inital value for the first dot in each track
      centerX = center;

      // Set centerY to double previous value for each track to make each track
      // appear below each other
      centerY += center * 2;

      // draw track
      this.drawTrack(centerX, centerY, center, i, radius);
    }
    this.stage.add(this.layer);
    this.layer.find('Circle').forEach( circle => {
      console.log(circle.attrs.id);
      if (circle.attrs.id.split('-')[1] == 1 % 1){
        console.log('div by 8');
      }
    });
  }

  drawTrack(centerX, centerY, center, i, radius){
    let group = new Konva.Group({});
    for (var j = 0; j < 2 * 4; j++){
      // Update x value to make the next dot appear further right
      centerX += center * 3;
      const beatNr = j + 1;

      this.addNode({
        x: centerX,
        y: centerY,
        id: i + '-' + j,
        radius: radius,
        fill: 'white',
        opacity: .5
      }, group);
    }
    this.layer.add(group);
  }

  startAnimation(){
    let animationTick = 0;
    let bpm = 500;
    let currentBeat = 0;
    this.animation = new Konva.Animation((frame) => {
      let frameTime = Math.floor(frame.time / bpm);
      if (frameTime > animationTick){
        animationTick = frameTime;
        let groups = this.layer.children;
        groups.forEach((group) => {
          group.children.forEach((circle) => {
            circle.scale({x: 1, y: 1});
          })
          group.children[currentBeat].scale({x: 1.2, y: 1.2});
        });
        if (animationTick % 8 === 0){
          currentBeat = 0;
        } else {
          currentBeat++;
        }
      }
    }, this.layer);

    this.animation.start();
  }
}

export default VisCanvas;
