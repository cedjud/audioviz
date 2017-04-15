import { Howler, Howl } from 'howler';
import sampleRefs from './sampleRefs.js';

class Track {
  constructor(id){
    this.beats = [false, false, false, false, false, false, false, false];
    // this.beats = createRandomBoolArray(8);
    this.soundId = id;
    this.sound = new Howl({
        src: ['./dist/' + sampleRefs[id].name ]
      });
    }
}

function createRandomBoolArray(length){
  let randomArray = [];
  for (let i = 0; i < length; i++){
    let rand  = Math.round(Math.random());
    randomArray.push(rand / 1 === 0);
  }
  return randomArray;
}

export default Track;
