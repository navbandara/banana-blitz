// question-generator.js

function randInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp0to9(n){
  return Math.max(0, Math.min(9, n));
}

export function generateQuestion(level){
  // Always ensure answer 0–9
  if(level === "easy"){
    // a + ? = c
    const a = randInt(0, 9);
    const missing = randInt(0, 9);
    const c = a + missing;
    return {
      text: `${a} + ? = ${c}`,
      answer: missing
    };
  }

  if(level === "moderate"){
    // a × ? = c (keep small)
    const missing = randInt(0, 9);
    const a = randInt(2, 9);
    const c = a * missing;
    return {
      text: `${a} × ? = ${c}`,
      answer: missing
    };
  }

  // hard
  // (a ÷ b) + ? = c   OR   (a + ?) × b = c
  const type = randInt(1,2);

  if(type === 1){
    const b = randInt(2, 6);
    const q = randInt(1, 9);
    const a = b * q; // makes division clean
    const missing = randInt(0, 9);
    const c = q + missing;
    return {
      text: `(${a} ÷ ${b}) + ? = ${c}`,
      answer: missing
    };
  }else{
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