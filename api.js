// This file manages all external API calls for fetching game puzzles and trivia questions.

// Base URL for fetching banana-related math puzzles.
const BANANA_API_URL = "https://marcconrad.com/uob/banana/api.php?out=json";

// Base URL for fetching random multiple-choice math questions.
const OPENTDB_MATH =
  "https://opentdb.com/api.php?amount=1&category=19&type=multiple";

// Fetches a new banana puzzle and returns its image URL along with the correct numerical answer.
export async function fetchBananaPuzzle() {
  try {

    const res = await fetch(BANANA_API_URL);

    if (!res.ok) throw new Error("Banana API request failed");

    const data = await res.json();

    return {
      image: data.question,          // puzzle image URL
      answer: Number(data.solution), // correct answer
      ok: true
    };

  } catch (error) {

    console.warn("Banana API error:", error);

    return {
      image: null,
      answer: null,
      ok: false
    };

  }
}

// Retrieves a banana puzzle in base64 format instead of a standard image link.
export async function fetchBananaPuzzleBase64() {
  try {

    const res = await fetch(
      "https://marcconrad.com/uob/banana/api.php?out=json&base64=yes"
    );

    if (!res.ok) throw new Error("Banana API base64 request failed");

    const data = await res.json();

    return {
      image: data.question,
      answer: Number(data.solution),
      ok: true
    };

  } catch (error) {

    console.warn("Banana Base64 API error:", error);

    return {
      image: null,
      answer: null,
      ok: false
    };

  }
}

// Fetches a bonus banana puzzle and includes a fun introductory message.
export async function fetchBananaBonus() {
  try {

    const res = await fetch(BANANA_API_URL);

    if (!res.ok) throw new Error("Banana bonus failed");

    const data = await res.json();

    return {
      message: "🍌 Banana Puzzle Loaded!",
      puzzleImage: data.question,
      correctAnswer: Number(data.solution),
      ok: true
    };

  } catch {

    return {
      message: "🍌 Banana Bonus: Bananas are berries!",
      puzzleImage: null,
      correctAnswer: null,
      ok: false
    };

  }
}

// Fetches a random multiple-choice math question from the Open Trivia Database.
export async function fetchMathMCQ() {
  try {

    const res = await fetch(OPENTDB_MATH);

    if (!res.ok) throw new Error("Math API request failed");

    const data = await res.json();

    if (!data.results || !data.results[0])
      throw new Error("No math questions found");

    return {
      ok: true,
      item: data.results[0]
    };

  } catch (error) {

    console.warn("Math API error:", error);

    return {
      ok: false,
      item: null
    };

  }
}