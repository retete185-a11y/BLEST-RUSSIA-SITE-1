import os
import requests

from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


BOT_TOKEN = os.environ.get("BOT_TOKEN")
ADMIN_CHAT_ID = os.environ.get("ADMIN_CHAT_ID")


@app.route("/")
def home():
    return "BLEST RUSSIA Backend работает!"


@app.route("/application", methods=["POST"])
def application():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "Нет данных"
        }), 400

    name = data.get("name", "").strip()
    nickname = data.get("nickname", "").strip()
    age = data.get("age", "")
    experience = data.get("experience", "").strip()
    device = data.get("device", "").strip()
    reason = data.get("reason", "").strip()
    time = data.get("time", "").strip()
    telegram = data.get("telegram", "").strip()

    if not all([
        name,
        nickname,
        age,
        experience,
        device,
        reason,
        time,
        telegram
    ]):
        return jsonify({
            "success": False,
            "message": "Заполнены не все поля"
        }), 400

    message = f"""
🧪 НОВАЯ ЗАЯВКА BLEST RUSSIA

👤 Имя: {name}
🎮 Игровой ник: {nickname}
🎂 Возраст: {age}
💻 Устройство: {device}
⏱ Время: {time}
📱 Telegram: {telegram}

🎮 Игровой опыт:
{experience}

💡 Почему хочет стать тестером:
{reason}
"""

    if not BOT_TOKEN or not ADMIN_CHAT_ID:
        return jsonify({
            "success": False,
            "message": "Telegram ещё не настроен"
        }), 500

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    response = requests.post(
        url,
        json={
            "chat_id": ADMIN_CHAT_ID,
            "text": message
        },
        timeout=10
    )

    if not response.ok:
        return jsonify({
            "success": False,
            "message": "Не удалось отправить заявку"
        }), 500

    return jsonify({
        "success": True,
        "message": "Заявка успешно отправлена"
    })


if __name__ == "__main__":
    app.run()
