from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends
from models.contact import ContactMessage, ContactMessageCreate
from services.email_service import email_service
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])

# Dependency to get database
async def get_database() -> AsyncIOMotorDatabase:
    from server import db
    return db

@router.post("", response_model=ContactMessage)
async def create_contact_message(
    message: ContactMessageCreate, 
    background_tasks: BackgroundTasks,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Crée un nouveau message de contact et envoie un email
    """
    try:
        # Créer l'objet message
        contact_msg = ContactMessage(**message.dict())
        
        # Sauvegarder dans MongoDB
        await db.contact_messages.insert_one(contact_msg.dict())
        
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
        
        logger.info(f"Nouveau message de contact créé: {contact_msg.id}")
        return contact_msg
        
    except Exception as e:
        logger.error(f"Erreur lors de la création du message de contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'envoi du message")

@router.get("/messages")
async def get_contact_messages(db: AsyncIOMotorDatabase = Depends(get_database)):
    """
    Récupère tous les messages de contact (pour admin)
    """
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(100)
        return messages
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la récupération des messages")