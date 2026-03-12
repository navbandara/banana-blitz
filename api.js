// service URLs used by the game
const BANANA_API_URL = "https://marcconrad.com/uob/banana/api.php"; // banana fact
const OPENTDB_MATH = "https://opentdb.com/api.php?amount=1&category=19&type=multiple"; // math quiz

// fetch a banana trivia fact (fallback on error)
export async function fetchBananaBonus(){
  try{
    const res = await fetch(BANANA_API_URL);
    if(!res.ok) throw new Error("Banana API fail");
    const data = await res.json();
    return {
      fact: data.fact || "Bananas are berries!",
      ok: true
    };
  }catch{
    return {
      fact: "Banana Bonus: Bananas are berries (botanically). 🍌",
      ok: false
    };
  }
}

// get a single math multiple-choice question
export async function fetchMathMCQ(){
  try{
    const res = await fetch(OPENTDB_MATH);
    if(!res.ok) throw new Error("Math API fail");
    const data = await res.json();
    if(!data.results || !data.results[0]) throw new Error("No results");
    return { ok:true, item:data.results[0] };
  }catch{
    return { ok:false, item:null };
  }
}