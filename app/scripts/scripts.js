import { Howler, Howl } from 'howler';

// Create a new Howl with audio track
const audioTrack = new Howl({
  src: ['music2.mp3']
});

// Create analyser node and connect it to master gain
const analyser = Howler.ctx.createAnalyser();
// Connect the masterGain -> analyser (disconnecting masterGain -> destination)
Howler.masterGain.connect(analyser);
// Connect the analyser -> destination
analyser.connect(Howler.ctx.destination);

analyser.fftSize = 64;
var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);
var dataArray = new Uint8Array(bufferLength);

document.addEventListener('DOMContentLoaded', (e) => {
  // Set up canvas and canvas context
  const canvas = document.getElementById('canvas');
  const WIDTH = 460;
  const HEIGHT = 255;
  let canvasCtx = canvas.getContext('2d');

  // Get control elements
  let playButton = document.getElementById('play');
  let stopButton = document.getElementById('stop');

  let animation;

  const draw = (timestamp) => {
    analyser.getByteFrequencyData(dataArray);
    // console.log(dataArray);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2;
    var barHeight;
    var x = barWidth / 2;

    var centerY = (canvas.height / 4) - x;

    for(var i = 0; i < bufferLength; i++) {

      if (i == 8){
        centerY += centerY;
        var x = barWidth / 2;
      } else if (i == 16){
        centerY += centerY / 2;
        var x = barWidth / 2;
      } else if (i == 24){
        centerY += centerY / 3;
        var x = barWidth / 2;
      }

      barHeight = dataArray[i];

      // canvasCtx.fillStyle = 'rgba(255,255,255,0.5)';
      // canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

      var radius = ( barWidth / 2 ) + (barHeight / 20);
      var opacity = barHeight / 255;
      if (opacity < 0.3) {
        opacity = 0.3;
      }

      canvasCtx.beginPath();
      canvasCtx.arc(x, centerY, radius /2, 0, 2 * Math.PI, false);
      canvasCtx.fillStyle = 'rgba(255,255,255,' + opacity + ')';
      canvasCtx.fill();
      canvasCtx.lineWidth = 0;
      canvasCtx.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
      canvasCtx.stroke();

      x += barWidth * 2;
    }

    animation = window.requestAnimationFrame(draw);
  };

  // Add event listeners
  playButton.addEventListener('click', () => {
    audioTrack.play();
    animation = window.requestAnimationFrame(draw);
  });
  stopButton.addEventListener('click', () => {
    audioTrack.stop();
    window.cancelAnimationFrame(animation);
  });

});
