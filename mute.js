import { initBackgroundMusic, toggleMute, isMuted } from './sound.js';

// Ensure music is initialized (this is a no-op if already initialized)
initBackgroundMusic();

// Create the mute button dynamically
const muteBtn = document.createElement('button');
muteBtn.className = 'muteBtn';
muteBtn.innerHTML = isMuted() ? '🔇' : '🔊';
muteBtn.title = isMuted() ? 'Unmute Music' : 'Mute Music';

// Append it to the body
document.body.appendChild(muteBtn);

// Handle click events
muteBtn.addEventListener('click', () => {
  const currentMutedState = toggleMute();
  muteBtn.innerHTML = currentMutedState ? '🔇' : '🔊';
  muteBtn.title = currentMutedState ? 'Unmute Music' : 'Mute Music';
});
