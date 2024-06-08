import sys
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(formData):
    # Email configuration
    smtp_server = 'smtp.gmail.com' 
    smtp_port = 587  
    smtp_user = 'picklerecipe@gmail.com'  
    smtp_password = "uxfowoziuyyhesni"  #change later for security reasons

    # Recipient email
    to_email = 'iamrobotraymond@gmail.com'  # Replace with the recipient's email

    # Create the email message
    subject = "Recipe for my leftovers"
    body = f"""
    You have received a new form submission:

    Email: {formData['email']}
    Ingredients: {formData['ingredients']}
    Times: {formData['times']}
    Difficulty: {formData['difficulty']}
    """

    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

if __name__ == '__main__':
    formData = json.loads(sys.argv[1])
    send_email(formData)