import { Howler, Howl } from 'howler';
import Konva from 'konva';

// Create a new Howl with audio track
const audioTrack = new Howl({
  src: ['music.mp3']
});

// Create analyser node and connect it to master gain
const analyser = Howler.ctx.createAnalyser();
// Connect the masterGain -> analyser (disconnecting masterGain -> destination)
Howler.masterGain.connect(analyser);
// Connect the analyser -> destination
analyser.connect(Howler.ctx.destination);
// Set the analyser fftSize to 256, this
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);


function addNode(obj, layer) {
    var node = new Konva.Circle({
        x: obj.x,
        y: obj.y,
        radius: obj.radius,
        id: obj.id,
        fill: 'white',
        opacity: obj.opacity
    });
    node.on('click', function(){
      itemClickHandler(obj.id, document.getElementById('panel'));
    });
    layer.add(node);
}

function itemClickHandler(id, el){
  el.innerHTML = id;
}

document.addEventListener('DOMContentLoaded', (e) => {
  // // Set up canvas and canvas context
  const WIDTH = 800;
  const HEIGHT = 400;

  // Get control elements
  let playButton = document.getElementById('play');
  let stopButton = document.getElementById('stop');

  // Add event listeners to control buttons
  playButton.addEventListener('click', () => {
    audioTrack.play();
    // animation = window.requestAnimationFrame(draw);
    anim.start();
  });
  stopButton.addEventListener('click', () => {
    audioTrack.stop();
    window.cancelAnimationFrame(animation);
  });

  // Set up Konva canvas
  // create stage
  var stage = new Konva.Stage({
    container: 'container',
    width: WIDTH,
    height: HEIGHT
  });

  // create layer
  var layer = new Konva.Layer();

  let itemHeight = HEIGHT / 8;
  let diameter = itemHeight / 2;
  let radius = diameter / 2;
  let x = diameter;
  let y = diameter;
  var centerX = x;
  var centerY = y;

  dataArray.forEach((item, index) => {
    // let opacity = (dataUnit > 0.6) ? 0.6 : dataUnit;
    addNode({
      x: centerX,
      y: centerY,
      id: index,
      radius: radius,
      opacity: 1
    }, layer)

    // Update coordinates
    if (index !== 0 && (index % 8) === 0) {
      centerY = y;
      centerX += x * 5;
    } else {
      centerY += y * 2;
    }
  });

  stage.add(layer);

  let animation;

  // Callback for getAnimationFrame()

  var anim = new Konva.Animation(function(frame) {
    var time = frame.time,
        timeDiff = frame.timeDiff,
        frameRate = frame.frameRate;
    // update stuff
    analyser.getByteFrequencyData(dataArray);
    // console.log(dataArray);

    let circles = layer.find('Circle');

    circles.forEach((circle, index) => {
      let dataValue = dataArray[index] / 255;
      circle.scale({x: dataArray[index] / 255, y: dataValue});
      circle.opacity(dataValue);
    });
  }, layer);
});
