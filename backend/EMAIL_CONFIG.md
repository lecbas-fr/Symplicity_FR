# Configuration du système d'envoi d'emails

## Variables d'environnement requises

Pour activer l'envoi d'emails depuis le formulaire de contact, vous devez configurer les variables d'environnement suivantes dans le fichier `/app/backend/.env` :

### Configuration SMTP

```env
# Serveur SMTP
SMTP_HOST=smtp.votre-serveur.com
SMTP_PORT=587

# Identifiants SMTP
SMTP_USER=votre-email@example.com
SMTP_PASSWORD=votre-mot-de-passe-smtp

# Email d'expédition (optionnel, par défaut = SMTP_USER)
SMTP_FROM_EMAIL=noreply@symplicity.fr

# Email qui recevra les messages de contact
CONTACT_EMAIL=contact@symplicity.fr
```

## Fournisseurs SMTP recommandés

### 1. Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=mot-de-passe-application
```
**Note**: Vous devez créer un "mot de passe d'application" dans votre compte Google.

### 2. Office 365 / Outlook
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=votre-email@outlook.com
SMTP_PASSWORD=votre-mot-de-passe
```

### 3. SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=votre-cle-api-sendgrid
```

### 4. Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@votre-domaine.mailgun.org
SMTP_PASSWORD=votre-mot-de-passe-mailgun
```

## Fonctionnement

Lorsqu'un utilisateur soumet le formulaire de contact :

1. ✅ Le message est **sauvegardé dans MongoDB** (collection `contact_messages`)
2. ✅ Un **email est envoyé** à l'adresse configurée dans `CONTACT_EMAIL`
3. ✅ L'email contient toutes les informations : nom, email, téléphone, entreprise, sujet, message

## Format de l'email reçu

```
Sujet: [Contact Symplicity] {sujet choisi}

Nouveau message de contact

Nom: Jean Dupont
Email: jean.dupont@example.com
Téléphone: 01 23 45 67 89
Entreprise: Ma Société
Sujet: RGPD

Message:
Bonjour, je souhaiterais des informations sur vos services RGPD...
```

## Vérification

Pour vérifier que la configuration fonctionne, consultez les logs backend :
```bash
tail -f /var/log/supervisor/backend.*.log
```

Vous devriez voir :
- ✅ `Email envoyé avec succès pour le contact de {nom} ({email})`

Ou en cas d'erreur :
- ⚠️ `Variables SMTP non configurées - Email non envoyé`
- ❌ `Erreur lors de l'envoi de l'email: {erreur}`

## Notes importantes

- Si les variables SMTP ne sont **pas configurées**, le message sera quand même **sauvegardé en base de données** mais aucun email ne sera envoyé
- Les emails sont envoyés en **arrière-plan** pour ne pas bloquer la réponse au formulaire
- Le format HTML de l'email utilise les couleurs de la charte graphique Symplicity
