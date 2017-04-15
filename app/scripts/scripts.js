// import Sequencer from './sequencer.js';
// import VisCanvas from './VisCanvas.js';
import initControls from './controls.js';
// OLD ABOVE / NEW BELOW
import SequencerCanvas from './SequencerCanvas.js';

document.addEventListener('DOMContentLoaded', (e) => {
  // let numTracks = 0;
  // let bars = 2;
  // let bpm = 120;
  // let masterGain = 0.8;
  // let tracks = [];
  //
  // const sequencer = new Sequencer(bars, numTracks, tracks, bpm, masterGain);
  // initControls(sequencer);

  /** New start
  The way this program will work.
  1. The SequencerCanvas - the Parent Component.
  The SequencerCanvas object makes use of Konva and Konva's Animation object.
   - It will draw a Layer containing Groups representing individual Tracks.
   - Each Track will have a specific Howl representing a sound.
   - Groups will contain Nodes representing the Beats in each Track.
   - The User will be free to add and remove Tracks at any time.
   - The User can start and stop playback
  2. The Konva Animation object
  The animation object will be used for metering the time.
   - It will tick at the given BPM (60000 / ms).
   - Each tick will increment the currentBeat until the total number of
     Beats, as indicated by the number of Bars (Bar = 4 Beats), is reached. Once
     the total number of Beats is reached currentBeat is reset to 0.
   - There will be a visual indication of the currentBeat by manipulating Nodes.
   - If the Beat in a track at the position of currentBeat is set to Active, the
     Howl associated with the Beat's parent Track will be played.
  3. The Track
  A Konva Group with a Howl and an array of Beats, possibly an array containing
  the Nodes' active values.
  4. The Beat.
  A Konva Node with a value representing it's active state. This state shoule be
  togglable.

  */
  const Sequencer = new SequencerCanvas();
  initControls(Sequencer);
});
