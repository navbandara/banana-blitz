// sound.js - simple sound manager for game effects

// preload a handful of audio clips mapped by logical names
const sounds = {
  click: new Audio("assets/sfx/click.wav"),
  correct: new Audio("assets/sfx/correct.mp3"),
  wrong: new Audio("assets/sfx/wrong.wav"),
  timeup: new Audio("assets/sfx/timeup.wav"),
};

// play a sound by name; resets playback so it can be replayed quickly
export function playSound(name){
  const s = sounds[name];
  if(!s){
    console.warn("playSound: no such sound", name);
    return; // no such sound registered
  }
  console.log("playSound called for", name, s);
  s.currentTime = 0;
  const promise = s.play();
  if(promise && promise.catch){
    promise.catch(e => {
      console.warn("audio play failed", name, e);
    });
  }
}