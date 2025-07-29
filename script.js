const inputText = document.getElementById("inputText");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const densityResult = document.getElementById("densityResult");
const includeSpaces = document.getElementById("includeSpaces");
const setLimit = document.getElementById("setLimit");
const warning = document.getElementById("warning");

inputText.addEventListener("input", updateStats);
includeSpaces.addEventListener("change", updateStats);
setLimit.addEventListener("change", updateStats);

function updateStats() {
  const text = inputText.value;
  const include = includeSpaces.checked;
  const limitSet = setLimit.checked;
  const limit = 150;

  let charLen = include ? text.length : text.replace(/\s/g, '').length;
  let words = text.trim().split(/\s+/).filter(Boolean).length;
  let sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  charCount.textContent = charLen.toString().padStart(2, '0');
  wordCount.textContent = words.toString().padStart(2, '0');
  sentenceCount.textContent = sentences.toString().padStart(2, '0');

  // Warning
  if (limitSet && charLen > limit) {
    warning.classList.remove("hidden");
  } else {
    warning.classList.add("hidden");
  }

  // Letter density
  const letters = text.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const map = {};
  for (let l of letters) {
    map[l] = (map[l] || 0) + 1;
  }

  if (letters.length === 0) {
    densityResult.textContent = "No characters found. Start typing to see letter density.";
  } else {
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    densityResult.textContent = sorted.map(([char, count]) => `${char}: ${count}`).join(', ');
  }
}
