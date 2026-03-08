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
  if(!s) return; // no such sound registered
  try{
    s.currentTime = 0;
    s.play();
  }catch(e){
    // ignore errors thrown if browser prevents autoplay
  }
}