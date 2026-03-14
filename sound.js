// This file manages background music and sound effects to prevent redundant loading.

// Preloads all game sound effects for immediate playback.
const sounds = {
  click: new Audio("assets/sfx/click.wav"),
  correct: new Audio("assets/sfx/correct.mp3"),
  wrong: new Audio("assets/sfx/wrong.wav"),
  timeup: new Audio("assets/sfx/timeup.wav"),
};

// Plays a specified sound effect and instantly restarts it if it is already playing.
export function playSound(name){
  const s = sounds[name];
  if(!s){
    console.warn("playSound: no such sound", name);
    return; // Returns early if the requested sound does not exist.
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

// Variables for managing the background music track.
let bgMusic = null;

// The public domain URL used for the background arcade music.
const BG_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=8-bit-arcade-138828.mp3"; 

export function isMuted() {
  return localStorage.getItem("bgMusicMuted") === "true";
}

export function toggleMute() {
  const current = isMuted();
  const newState = !current;
  localStorage.setItem("bgMusicMuted", newState);
  if (bgMusic) {
    bgMusic.muted = newState;
  }
  return newState;
}

export function initBackgroundMusic() {
  if (bgMusic) return;

  bgMusic = new Audio(BG_MUSIC_URL);
  bgMusic.loop = true;
  bgMusic.volume = 0.3; // Lowers the music volume so it does not overpower the sound effects.
  bgMusic.muted = isMuted();

  // Resumes background music from its last saved timestamp if available.
  const savedTime = sessionStorage.getItem("bgMusicTime");
  if (savedTime) {
    bgMusic.currentTime = parseFloat(savedTime);
  }

  // Saves the current music playback time every second to maintain continuity across pages.
  setInterval(() => {
    if (bgMusic && !bgMusic.paused) {
      sessionStorage.setItem("bgMusicTime", bgMusic.currentTime);
    }
  }, 1000);

  // Attempts to auto-play background music, handling potential browser restrictions.
  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.warn("Autoplay was prevented. Waiting for user interaction.", error);
    });
  }
}

// Starts music on the first user interaction to bypass browser auto-play policies.
document.addEventListener("click", () => {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}, { once: true });