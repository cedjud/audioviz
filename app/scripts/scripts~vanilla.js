import { Howler, Howl } from 'howler';

// Create a new Howl with audio track
const audioTrack = new Howl({
  src: ['music3.mp3']
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
console.log(bufferLength);
let dataArray = new Uint8Array(bufferLength);

document.addEventListener('DOMContentLoaded', (e) => {
  // Set up canvas and canvas context
  const WIDTH = 800;
  const HEIGHT = 400;
  const canvas = document.getElementById('canvas');
  let canvasCtx = canvas.getContext('2d');

  // Get control elements
  let playButton = document.getElementById('play');
  let stopButton = document.getElementById('stop');

  // Add event listeners to control buttons
  playButton.addEventListener('click', () => {
    audioTrack.play();
    animation = window.requestAnimationFrame(draw);
  });
  stopButton.addEventListener('click', () => {
    audioTrack.stop();
    // var id2 = audioTrack.play();
    window.cancelAnimationFrame(animation);
  });

  // Define animation, the name of our getAnimationFrame()
  let animation;

  // Callback for getAnimationFrame()
  const draw = (timestamp) => {

    // Clear the canvas element
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    // Get the Byte Frequency data and assign it to dataArray.
    analyser.getByteFrequencyData(dataArray);
    // Output dataArray to the console.
    console.log(dataArray);

    // Get the width of each Item (circle including spacing)
    // var diameter = (WIDTH / bufferLength) * 3;
    const diameter = (HEIGHT / (bufferLength / 8));
    // var radius = diameter / 2;

    // Set the initial center points for the first circle at diameter. This adds
    // padding to the canvas element
    var x = diameter;
    var y = diameter;
    var centerX = x;
    var centerY = y;

    // Loop through each item in the dataArray
    dataArray.forEach((soundData, index) => {

      // define opacity
      let dataUnit = (soundData / 255);
      let opacity = (dataUnit > 0.6) ? 0.6 : dataUnit;

      let radius = (diameter / 4) * (dataUnit * 3) ;

      // Draw circle
      canvasCtx.beginPath();
      canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      canvasCtx.fillStyle = 'rgba(255,255,255,' + opacity + ')';
      canvasCtx.fill();

      // Update coordinates
      if (index !== 0 && (index % 8) === 0) {
        centerY = y;
        centerX += x * 5;
      } else {
        centerY += y * 2;
      }
    });

    animation = window.requestAnimationFrame(draw);
  };
});
