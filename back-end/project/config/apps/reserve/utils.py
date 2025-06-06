from ghasedakpack import Ghasedak

def send_sms(receptor, message):
    # جایگزین کن با کلید API خودت
    api_key = "2e8fc9ccbb5e0a462c9e043dd7b2286f98f02c9bc78950fd41ab5c14ff72833apS8YcR48c8CuqQPB"
    
    sms = Ghasedak(api_key)
    
    response = sms.send(
        message=message,
        receptor=receptor,
        linenumber="30005088"
    )
    
    return response
