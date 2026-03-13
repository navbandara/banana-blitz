// sound.js - super basic sound player so we don't reload audio files every click

// load these up right away
const sounds = {
  click: new Audio("assets/sfx/click.wav"),
  correct: new Audio("assets/sfx/correct.mp3"),
  wrong: new Audio("assets/sfx/wrong.wav"),
  timeup: new Audio("assets/sfx/timeup.wav"),
};

// fire off a sound. if it's already playing, restart it immediately
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