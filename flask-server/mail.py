import ssl
from email.message import EmailMessage
import smtplib                                     


def sendMail():
    sender = 'alenvincans1@gmail.com'
    password = 'fmjylydbfwgrjjhm'
    receiver = 'alenvincans1@gmail.com'

    subject = 'Informācija Par Pasutījumu'
    body = """ Jūsu pasūtījums ir veiksmīgi saņemts un drīz būs gatavs! """

    em = EmailMessage()
    em['From'] = sender
    em['To'] = receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(sender, password)
        smtp.sendmail(sender, receiver, em.as_string())
