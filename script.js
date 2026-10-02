const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

function updateCounts() {
  const text = noteText.value;
  const len = text.length;

  // Character counter text and styles
  charCount.textContent = `${len} / 200 characters`;
  charCount.classList.remove("warning", "over");

  if (len > 200) {
    charCount.classList.add("over");
  } else if (len > 180) {
    charCount.classList.add("warning");
  }

  // Word count logic
  const trimmedText = text.trim();
  const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
  wordCount.textContent = `${words} words`;
}

// Input event listener
noteText.addEventListener("input", () => {
  updateCounts();
  localStorage.setItem("noteDraft", noteText.value);
});

// Clear button logic
clearBtn.addEventListener("click", () => {
  noteText.value = "";
  localStorage.removeItem("noteDraft");
  updateCounts();
});

// Keydown event for Escape key
noteText.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    noteText.value = "";
    localStorage.removeItem("noteDraft");
    updateCounts();
  }
});

// Theme toggle logic
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  localStorage.setItem("themePreference", isDark ? "dark" : "light");
});

// Restore state on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedDraft = localStorage.getItem("noteDraft");
  if (savedDraft !== null) {
    noteText.value = savedDraft;
  }

  const savedTheme = localStorage.getItem("themePreference");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
  } else {
    themeToggle.textContent = "Dark mode";
  }

  updateCounts();
});
