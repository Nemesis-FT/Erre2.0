import requests

from erre2.configuration import BOT_KEY, BOT_CHANNEL


def telegram_send_message(message):
    try:
        requests.post(f"https://api.telegram.org/bot{BOT_KEY}/sendMessage?chat_id=@{BOT_CHANNEL}&text={message}&parse_mode=html")
    except Exception as e:
        pass
