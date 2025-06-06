async function translateText() {
  const input = document.getElementById("inputText").value.trim();
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  if (!input) {
    alert("Please enter some text.");
    return;
  }

  const apiKey = "AIzaSyCpfJEnL7GQl6CBzJhPxdgxoiD34Tqjp1U"; 

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await fetch(url, {
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

    if (data.data && data.data.translations.length > 0) {
      document.getElementById("output").innerText = data.data.translations[0].translatedText;
    } else {
      document.getElementById("output").innerText = "Translation failed.";
    }
  } catch (err) {
    console.error("Translation error:", err);
    document.getElementById("output").innerText = "Error connecting to Google Translate.";
  }
}

function copyText() {
  const text = document.getElementById("output").innerText;
  if (!text) return alert("Nothing to copy.");
  navigator.clipboard.writeText(text).then(() => alert("Copied!"));
}

function speakText() {
  const text = document.getElementById("output").innerText;
  if (!text) return alert("Nothing to speak.");
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
