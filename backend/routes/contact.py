from fastapi import APIRouter, HTTPException, BackgroundTasks
from models.contact import ContactMessageCreate, ContactResponse
from services.email_service import email_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("", response_model=ContactResponse)
async def create_contact_message(
    message: ContactMessageCreate, 
    background_tasks: BackgroundTasks
):
    """
    Envoie un email de contact (sans sauvegarde en base de données)
    """
    try:
        # Envoyer l'email en arrière-plan
        background_tasks.add_task(
            email_service.send_contact_email,
            name=message.name,
            email=message.email,
            phone=message.phone or "",
            company=message.company or "",
            subject=message.subject,
            message=message.message
        )
        
        logger.info(f"Nouveau message de contact reçu de: {message.name} ({message.email})")
        
        return ContactResponse(
            success=True,
            message="Votre message a été envoyé avec succès. Nous vous recontacterons dans les plus brefs délais."
        )
        
    except Exception as e:
        logger.error(f"Erreur lors de l'envoi du message de contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'envoi du message")