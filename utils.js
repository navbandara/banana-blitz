// utils.js - handy little functions we use everywhere

// lazy way to grab elements by id
export function qs(id) {
  return document.getElementById(id);
}

// dump something into local storage (auto json stringifies)
export function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// yank something out of local storage (auto json parses). falls back if empty or broken
export function loadLocal(key, fallback = null) {
  const value = localStorage.getItem(key);

  if (value === null) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

// bounce them to login if they aren't signed in
export function requireAuth(user) {
  if (!user) {
    location.href = "login.html";
  }
}