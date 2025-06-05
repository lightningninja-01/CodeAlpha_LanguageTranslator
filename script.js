async function translateText() {
  const input = document.getElementById("inputText").value.trim();
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  if (!input) {
    alert("Please enter some text to translate.");
    return;
  }

  try {
    const response = await fetch("https://translate.astian.org/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: input,
        source: source,
        target: target,
        format: "text"
      })
    });

    const data = await response.json();

    if (data.translatedText) {
      document.getElementById("outputText").innerText = data.translatedText;
    } else {
      throw new Error("No translation returned from API.");
    }

  } catch (error) {
    console.error("Translation Error:", error);
    document.getElementById("outputText").innerText = "⚠️ Translation failed. Please try again.";
  }
}

function copyText() {
  const text = document.getElementById("outputText").innerText;
  if (!text) {
    alert("Nothing to copy!");
    return;
  }
  navigator.clipboard.writeText(text)
    .then(() => alert("Copied to clipboard!"))
    .catch(err => alert("Failed to copy."));
}

function speakText() {
  const text = document.getElementById("outputText").innerText;
  if (!text) {
    alert("Nothing to speak!");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
