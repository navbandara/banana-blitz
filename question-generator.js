// This file generates random math problems dynamically based on the selected difficulty level.

// Generates a random integer between the specified minimum and maximum values.
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Creates a math equation with a missing value for the player to solve based on difficulty.
export function generateQuestion(level) {
  if (level === "easy") {
    const a = randInt(0, 9);
    const missing = randInt(0, 9);
    const c = a + missing;

    return {
      text: `${a} + ? = ${c}`,
      answer: missing
    };
  }

  if (level === "moderate") {
    const missing = randInt(0, 9);
    const a = randInt(2, 9);
    const c = a * missing;

    return {
      text: `${a} × ? = ${c}`,
      answer: missing
    };
  }

  const type = randInt(1, 2);

  if (type === 1) {
    const b = randInt(2, 6);
    const q = randInt(1, 9);
    const a = b * q;
    const missing = randInt(0, 9);
    const c = q + missing;

    return {
      text: `(${a} ÷ ${b}) + ? = ${c}`,
      answer: missing
    };
  } else {
    const b = randInt(2, 6);
    const a = randInt(0, 9);
    const missing = randInt(0, 9);
    const c = (a + missing) * b;

    return {
      text: `(${a} + ?) × ${b} = ${c}`,
      answer: missing
    };
  }
}