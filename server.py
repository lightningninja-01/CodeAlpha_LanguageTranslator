from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

API_KEY = "AIzaSyCpfJEnL7GQl6CBzJhPxdgxoiD34Tqjp1U"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    input_text = data["q"]
    source = data["source"]
    target = data["target"]

    url = f"https://translation.googleapis.com/language/translate/v2?key={API_KEY}"
    payload = {
        "q": input_text,
        "source": source,
        "target": target,
        "format": "text"
    }

    try:
        response = requests.post(url, json=payload)
        result = response.json()
        translated_text = result["data"]["translations"][0]["translatedText"]
        return jsonify({"translatedText": translated_text})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
