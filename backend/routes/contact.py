from fastapi import APIRouter, HTTPException, BackgroundTasks
from models.contact import ContactMessageCreate, ContactResponse
from services.email_service import email_service
import logging
import httpx
import os

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])

async def verify_turnstile_token(token: str) -> bool:
    """
    Vérifie le token Turnstile auprès de l'API Cloudflare
    """
    secret_key = os.environ.get('TURNSTILE_SECRET_KEY')
    
    if not secret_key or secret_key == 'votre-turnstile-secret-key':
        logger.warning("TURNSTILE_SECRET_KEY non configurée, validation ignorée")
        return True  # En dev, si pas configuré, on laisse passer
    
    turnstile_url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
    
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                turnstile_url,
                data={
                    "secret": secret_key,
                    "response": token
                }
            )
            response.raise_for_status()
            result = response.json()
            
            success = result.get("success", False)
            if not success:
                error_codes = result.get("error-codes", [])
                logger.warning(f"Turnstile validation échouée: {error_codes}")
            
            return success
            
    except httpx.TimeoutException:
        logger.error("Timeout lors de la vérification Turnstile")
        raise HTTPException(status_code=503, detail="Service de vérification temporairement indisponible")
    except Exception as e:
        logger.error(f"Erreur lors de la vérification Turnstile: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la vérification")

@router.post("", response_model=ContactResponse)
async def create_contact_message(
    message: ContactMessageCreate, 
    background_tasks: BackgroundTasks
):
    """
    Envoie un email de contact après vérification Turnstile
    """
    try:
        # Vérifier le token Turnstile
        if hasattr(message, 'turnstile_token') and message.turnstile_token:
            is_valid = await verify_turnstile_token(message.turnstile_token)
            if not is_valid:
                raise HTTPException(
                    status_code=400, 
                    detail="Échec de la vérification CAPTCHA. Veuillez réessayer."
                )
        else:
            logger.warning("Aucun token Turnstile fourni")
            # En production, vous voudrez peut-être rendre cela obligatoire
            # raise HTTPException(status_code=400, detail="Token CAPTCHA manquant")
        
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
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erreur lors de l'envoi du message de contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'envoi du message")