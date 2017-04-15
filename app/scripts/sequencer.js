import { Howler, Howl } from 'howler';
import sampleRefs from './sampleRefs.js';
import Konva from 'konva';

import VisCanvas from './VisCanvas.js';
import Track from './track.js';

class Sequencer {
  constructor(bars, numTracks, tracks, bpm, masterGain){
    this.interval = null;
    this.bars = bars;
    this.numTracks = 0;
    this.trackIds = [];
    this.tracks = tracks;
    this.bpm = bpm;
    this.masterGain = masterGain;
    this.vis = new VisCanvas();
    this.vis.drawLayer(this.numTracks);
  }

  ticker(){
    let beat = 1;
    this.interval = setInterval(() => {
      beat = (beat >= this.bars * 4) ? 1 : beat + 1;
      this.tracks.forEach((track) => {
        track.beats[beat - 1] ? track.sound.play() : null;
      });
    }, 60000 / this.bpm);
  }

  addTrack(id){
    const newTrack = new Track(id);
    this.trackIds.push(id);
    this.tracks.push(newTrack);
    this.numTracks = this.trackIds.length;
    this.vis.drawLayer(this.numTracks);
  }

  removeTrack(id){
    const index = this.trackIds.indexOf(id);

    this.tracks.splice(index, 1);
    this.trackIds.splice(index, 1);
    this.numTracks = this.trackIds.length;
    this.vis.drawLayer(this.numTracks);
  }

  playSequence(){
    this.ticker();
    this.vis.startAnimation();
  }

  stopSequence(){
    clearInterval(this.interval);
    this.vis.animation.stop();
    this.vis.animationTick = 0;
  }
}

export default Sequencer;
