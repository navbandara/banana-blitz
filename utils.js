// utils.js - common helper functions for the game

// query selector shortcut: gets element by ID
export function qs(id){ return document.getElementById(id); }

// persist a value in localStorage (JSON-encoded)
export function saveLocal(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

// retrieve a value from localStorage, with optional fallback
export function loadLocal(key, fallback=null){
  const v = localStorage.getItem(key);
  if(!v) return fallback;
  try { return JSON.parse(v); } catch { return fallback; }
}

// redirect unauthenticated users to the login page
export function requireAuth(user){
  if(!user){
    alert("Please login first!");
    // navigate away so protected pages are not shown
    location.href = "login.html";
  }
}