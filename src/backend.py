from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration
from textblob import TextBlob
from typing import Any

THRESHOLD = 0.3


class Analyzer:

    def find_sentiment(self, input_text: str) -> float:
        analyzed_text = TextBlob(input_text)
        return analyzed_text.sentiment.polarity


class Bot_Response:
    model: Any
    tokenizer: Any

    def __init__(self, model_name: str):
        self.model = BlenderbotForConditionalGeneration.from_pretrained(model_name)
        self.tokenizer = BlenderbotTokenizer.from_pretrained(model_name)

    def generate(self, input_text: str, chat_history: []):
        sentiment_analyzer = Analyzer()
        sentiment = sentiment_analyzer.find_sentiment(input_text)

        if sentiment > THRESHOLD:
            tone = "respond with an uplifting tone."
        elif sentiment < -THRESHOLD:
            tone = "respond with empathy and support."
        else:
            tone = "respond in a helpful and understanding tone."

        prompt = (f"You are a mental health assistant bot. Here is the user's "
                  f"message: '{input_text}'. {tone} Here is the "
                  f"previous conversation: {chat_history}")

        # give the input, return the output and decode the response
        model_input = self.tokenizer([input_text], return_tensors='pt')
        model_output = self.model.generate(**model_input)
        response = self.tokenizer.batch_decode(model_output, skip_special_tokens=True)[0]
        return response


class MindMate:
    def __init__(self, response_generator: Bot_Response):
        self.bot = response_generator

    def process_input(self, user_input: str, chat_history: list) -> dict:
        response = self.bot.generate(user_input, chat_history)
        chat_history.append({"sender": "Bot", "message": response})
        return {"response": response}


app = Flask(__name__)
CORS(app, resources={r"/mindmate": {"origins": "http://localhost:3000"}})


@app.route('/mindmate', methods=['POST'])
def mindmate():
    data = request.json
    user_input = data.get('user_Input', '')
    chat_history = data.get('chat_history', [])

    response_generator = Bot_Response("facebook/blenderbot-400M-distill")
    mindmate_bot = MindMate(response_generator)

    result = mindmate_bot.process_input(user_input, chat_history)

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
