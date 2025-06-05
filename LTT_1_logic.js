async function translateText() {
  const input = document.getElementById("inputText").value;
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  const res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: JSON.stringify({
      q: input,
      source: source,
      target: target,
      format: "text"
    }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await res.json();
  document.getElementById("outputText").innerText = data.translatedText;
}

function copyText() {
  const text = document.getElementById("outputText").innerText;
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}

function speakText() {
  const text = document.getElementById("outputText").innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
