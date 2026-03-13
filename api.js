// api.js - handles all the external data fetching for the game (Banana API & Open Trivia DB)

// banana puzzle
const BANANA_API_URL = "https://marcconrad.com/uob/banana/api.php?out=json";

// ping open trivia db for math questions
const OPENTDB_MATH =
  "https://opentdb.com/api.php?amount=1&category=19&type=multiple";

// grabs a fresh puzzle, returning the image url and the correct number to solve it
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

// fetches a puzzle but gives us base64 data directly instead of a link
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

// pulling a bonus puzzle just for fun, includes a little message text
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

// gets a random multiple choice math question from open trivia db
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