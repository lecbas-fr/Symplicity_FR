import os
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import aiosmtplib

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get('SMTP_HOST', '')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.smtp_user = os.environ.get('SMTP_USER', '')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '')
        self.from_email = os.environ.get('SMTP_FROM_EMAIL', self.smtp_user)
        self.to_email = os.environ.get('CONTACT_EMAIL', 'contact@symplicity.fr')
        
    async def send_contact_email(self, name: str, email: str, phone: str, company: str, subject: str, message: str):
        """
        Envoie un email de notification pour un nouveau message de contact
        """
        try:
            # Vérifier si les variables SMTP sont configurées
            if not all([self.smtp_host, self.smtp_user, self.smtp_password]):
                logger.warning("Variables SMTP non configurées - Email non envoyé")
                return False

            # Créer le message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"[Contact Symplicity] {subject}"
            msg['From'] = self.from_email
            msg['To'] = self.to_email
            msg['Reply-To'] = email

            # Corps du message en HTML
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #7ed957; border-bottom: 2px solid #7ed957; padding-bottom: 10px;">
                            Nouveau message de contact
                        </h2>
                        
                        <div style="margin: 20px 0;">
                            <p><strong>Nom :</strong> {name}</p>
                            <p><strong>Email :</strong> {email}</p>
                            {f'<p><strong>Téléphone :</strong> {phone}</p>' if phone else ''}
                            {f'<p><strong>Entreprise :</strong> {company}</p>' if company else ''}
                            <p><strong>Sujet :</strong> {subject}</p>
                        </div>
                        
                        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #555;">Message :</h3>
                            <p style="white-space: pre-wrap;">{message}</p>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                        
                        <p style="font-size: 12px; color: #888;">
                            Ce message a été envoyé depuis le formulaire de contact de symplicity.fr
                        </p>
                    </div>
                </body>
            </html>
            """

            # Version texte
            text_body = f"""
            Nouveau message de contact
            
            Nom: {name}
            Email: {email}
            {f'Téléphone: {phone}' if phone else ''}
            {f'Entreprise: {company}' if company else ''}
            Sujet: {subject}
            
            Message:
            {message}
            
            ---
            Ce message a été envoyé depuis le formulaire de contact de symplicity.fr
            """

            msg.attach(MIMEText(text_body, 'plain'))
            msg.attach(MIMEText(html_body, 'html'))

            # Envoyer l'email
            await aiosmtplib.send(
                msg,
                hostname=self.smtp_host,
                port=self.smtp_port,
                username=self.smtp_user,
                password=self.smtp_password,
                start_tls=True
            )
            
            logger.info(f"Email envoyé avec succès pour le contact de {name} ({email})")
            return True
            
        except Exception as e:
            logger.error(f"Erreur lors de l'envoi de l'email: {str(e)}")
            return False

email_service = EmailService()