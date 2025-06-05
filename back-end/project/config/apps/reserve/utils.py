# reservation/utils.py

import requests

def send_sms(receptor, message):
    url = "https://api.ghasedak.me/v2/sms/send/simple"
    headers = {
        "apikey": "YOUR_API_KEY"
    }
    data = {
        "message": message,
        "receptor": receptor,
        "linenumber": "30005088"
    }

    response = requests.post(url, headers=headers, data=data)
    return response.json()
