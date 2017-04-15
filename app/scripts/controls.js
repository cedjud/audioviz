import sampleRefs from './sampleRefs.js';

const initControls = (s) => {
  let soundSelect = document.getElementById('soundSelect');

  sampleRefs.forEach(sample => {
    soundSelect.innerHTML += `<option value="${sample.id}">${sample.name}</option>`;
  });

  document.getElementById('addTrack').addEventListener('click', () => {
    const sound = soundSelect.value;
    s.addGroup(s.layer, s.layer.children.length, sound - 1);
    console.log(`add track with sound: ${sound - 1}`);
  });

  document.getElementById('removeTrack').addEventListener('click', () => {
    const sound = soundSelect.value;
    s.removeGroup(sound);
    console.log(`remove track with sound: ${sound}`);
  });

  document.getElementById('play').addEventListener('click', () => {
    s.sequenceAnimationStart();
    // console.log(s);
  });

  document.getElementById('stop').addEventListener('click', () => {
    s.sequenceAnimationStop();
    // console.log(s);
  });
}

export default initControls;
