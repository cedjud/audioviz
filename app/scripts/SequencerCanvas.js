import { Howler, Howl } from 'howler';
import Konva from 'konva';
import sampleRefs from './sampleRefs.js';

class SequencerCanvas {
  constructor(){
    this.bpm = 120;
    this.bpmInMs = 60000 / this.bpm;
    this.tracks = [];
    this.layer = new Konva.Layer();
    this.stage = new Konva.Stage({
      container: 'container',
      width: 800,
      height: 400
    });
    this.sequence = null;
    this.stage.add(this.layer);
  }

  addNode(group, value, posX, posY, isActive){
    let node = new Konva.Circle({
      x: posX,
      y: value / 4,
      radius: value / 4,
      fill: 'white',
      opacity: .5,
      active: isActive
    });
    node.on('click', () => {
      node.attrs.active = node.attrs.active ? false : true;
      node.attrs.fill = node.attrs.active ? 'red' : 'white';
      this.layer.draw();
    });
    group.add(node);
  }

  addLabel(posX, posY, sound, group){
    var simpleText = new Konva.Text({
      x: posX,
      // y: posY,
      text: group.attrs.id + " / " + sampleRefs[sound].name,
      fontSize: 12,
      fill: 'white'
    });
    simpleText.on('click', () => {
      this.removeGroup(sound);
    });

    group.add(simpleText);
  }


  addGroup(layer, id, sound){
    if (this.tracks.indexOf(sound) == -1){

      this.tracks.push(sound);
      let value = (this.stage.getHeight() / 8);
      let posX = (value * 2) + 150;
      let posY = value * (id + 1);

      let group = new Konva.Group({
        id: sound,
        fill: 'blue',
        y: posY,
        sound: new Howl({
            src: ['./dist/' + sampleRefs[sound].name ]
          }),
      });

      this.addLabel(value, posY - 5, sound, group);

      for (let i = 0; i < 8; i++){
        this.addNode(group, value / 2, posX, posY, false);
        posX = posX + (value);
      }
      layer.add(group);
      this.layer.draw();
    } else {
      console.log('No duplicates');
    }
  }

  removeGroup(sound){
    if (this.tracks.indexOf(sound) != -1){
      this.layer.children.forEach((child) =>{
        if (child.attrs.id === sound){
          child.destroy();
          this.layer.draw();
        }
      });
      this.tracks.splice(this.tracks.indexOf(sound), 1);
    } else {
      console.log('track not found');
    }
  }

  sequenceAnimation(sequence){
    let tick = 0;
    let beat = 0;
    this.sequence = new Konva.Animation((frame) => {
      let time = Math.floor(frame.time / this.bpmInMs);
      if (time > tick){
        this.layer.find("Circle").forEach((circle) => {
          circle.scale({x:1,y:1});
        });
        let tracks = this.layer.children;
        tracks.forEach((track) => {
          track.children[beat + 1].scale({x: 2, y: 2});
          if (track.children[beat + 1].attrs.active){
            track.attrs.sound.play();
          }
        });
        // Increment ticker and beat
        tick++;
        beat = (beat >= 7) ? 0 : beat + 1;
        console.log(beat);
      }
    }, this.layer);
  }

  sequenceAnimationStart(){
    this.sequenceAnimation(this.sequence);
    this.sequence.start();
  }

  sequenceAnimationStop(){
    this.sequence.stop();
  }
}

export default SequencerCanvas;
