import ssl
from email.message import EmailMessage
import smtplib                                     

sender = 'alenvincans1@gmail.com'
password = 'fmjylydbfwgrjjhm'
reciever = 'alenvincans1@gmail.com'

subject = 'Order INFO'
body = """ Your Order has been successfully received """

em = EmailMessage()
em['From'] = sender
em['To'] = reciever
em['Subject'] = subject
em.set_content(body)

context = ssl.create_default_context()

with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
    smtp.login(sender, password)
    smtp.sendmail(sender, reciever, em.as_string())
