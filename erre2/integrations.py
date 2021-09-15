import requests
import os


def telegram_send_message(message):
    botkey = os.getenv("BOT_KEY")
    botchannel = os.getenv("BOT_CHANNEL")
    if not botkey or not botchannel:
        return
    try:
        ans = requests.post("https://api.telegram.org/bot{}/sendMessage?chat_id=@{}&text={}&parse_mode=html".format(
            botkey, botchannel, message
        ))
        pass
    except Exception as e:
        pass
