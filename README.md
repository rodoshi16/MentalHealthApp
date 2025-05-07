# 🧠 MindMate – A Mental Health Chatbot

**MindMate** is an intelligent, sentiment-aware mental health chatbot that engages users with empathetic, uplifting, and supportive responses. It uses NLP (via Facebook's BlenderBot), sentiment analysis (via TextBlob), and a React interface to help users feel heard and understood.


---

## 🚀 Features

- 🤖 AI-generated responses using `facebook/blenderbot-400M-distill`
- 💬 Real-time chatting with contextual awareness
- 🌈 Sentiment-based tone adjustment (uplifting, supportive, or neutral)
- 🎨 Visually appealing React frontend

---

## 🛠️ Tech Stack

**Backend:**
- Python
- Flask
- Flask-CORS
- Transformers (`BlenderBot`)
- TextBlob

**Frontend:**
- React JS
- CSS for styling

---

## 🧪 How It Works

1. **User inputs a message** on the React frontend.
2. Message is sent via POST to the Flask backend (`/mindmate`).
3. The backend:
   - Analyzes sentiment using TextBlob.
   - Adjusts the response tone accordingly.
   - Generates a response with Facebook's BlenderBot.
4. The response is displayed back in the chat UI.

---

## 💻 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/mindmate.git
cd mindmate

2. Set Up the Backend

📦 Install Dependencies
cd backend
pip install flask flask-cors transformers textblob
python -m textblob.download_corpora

🚀 Run the Flask Server
python app.py
