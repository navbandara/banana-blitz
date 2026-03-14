// This file contains a collection of utility functions used throughout the application.

// Retrieves a DOM element by its ID.
export function qs(id) {
  return document.getElementById(id);
}

// Saves a value to localStorage after converting it to JSON.
export function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Retrieves and parses a JSON value from localStorage, returning a fallback if necessary.
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

// Redirects the user to the login page if they are not authenticated.
export function requireAuth(user) {
  if (!user) {
    location.href = "login.html";
  }
}