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

// Background music setup
let bgMusic = null;

// Use a free API / public domain audio URL
// Example using a public domain chiptune track from an open source library:
const BG_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=8-bit-arcade-138828.mp3"; 

export function initBackgroundMusic() {
  if (bgMusic) return;

  bgMusic = new Audio(BG_MUSIC_URL);
  bgMusic.loop = true;
  bgMusic.volume = 0.3; // keep it subtle so the sound effects are louder

  // check if we have a saved time in sessionStorage
  const savedTime = sessionStorage.getItem("bgMusicTime");
  if (savedTime) {
    bgMusic.currentTime = parseFloat(savedTime);
  }

  // Every second, save the current time so it persists across page loads
  setInterval(() => {
    if (bgMusic && !bgMusic.paused) {
      sessionStorage.setItem("bgMusicTime", bgMusic.currentTime);
    }
  }, 1000);

  // Play immediately (browsers might block this until user interaction)
  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.warn("Autoplay was prevented. Waiting for user interaction.", error);
    });
  }
}

// Ensure audio plays when the user interacts with the page (fixes autoplay policies)
document.addEventListener("click", () => {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}, { once: true });