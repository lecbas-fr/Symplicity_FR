# 🔒 Configuration Cloudflare Turnstile

## Qu'est-ce que Turnstile ?

Cloudflare Turnstile est une protection CAPTCHA moderne et invisible qui protège votre formulaire de contact contre les bots et le spam, sans frustrer vos utilisateurs légitimes.

## 📋 Étapes pour Obtenir vos Clés Turnstile

### 1. Créer un Compte Cloudflare (Gratuit)

1. Allez sur https://dash.cloudflare.com/sign-up
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Accéder à Turnstile

1. Connectez-vous au dashboard Cloudflare : https://dash.cloudflare.com/
2. Dans le menu latéral, cliquez sur **"Turnstile"**
3. Ou allez directement sur : https://dash.cloudflare.com/?to=/:account/turnstile

### 3. Créer un Widget Turnstile

1. Cliquez sur **"Add Site"** ou **"Créer un widget"**
2. Remplissez le formulaire :
   - **Name** : `Symplicity Contact Form` (nom pour vous aider à identifier)
   - **Domain** : Ajoutez vos domaines autorisés :
     - Pour le développement : `localhost`
     - Pour la production : `symplicity-preview.emergent.host` et votre domaine final
   - **Widget Mode** : Sélectionnez **"Managed"** (recommandé - équilibre entre sécurité et expérience utilisateur)
   
3. Cliquez sur **"Create"**

### 4. Récupérer vos Clés

Après la création, vous verrez deux clés :
- **Site Key** (Clé publique) : `0x4AAAAAAA...` - À utiliser dans le frontend
- **Secret Key** (Clé secrète) : `0x4AAAAAAA...` - À utiliser dans le backend UNIQUEMENT

⚠️ **IMPORTANT** : Ne partagez JAMAIS votre Secret Key publiquement !

---

## 🔧 Configuration de vos Clés

### Option 1 : Configuration via Fichiers .env (Développement)

#### Backend (`/app/backend/.env`)

Remplacez les valeurs de ces deux lignes :

```env
TURNSTILE_SECRET_KEY=VOTRE_SECRET_KEY_ICI
TURNSTILE_SITE_KEY=VOTRE_SITE_KEY_ICI
```

#### Frontend (`/app/frontend/.env`)

Remplacez la valeur de cette ligne :

```env
REACT_APP_TURNSTILE_SITE_KEY=VOTRE_SITE_KEY_ICI
```

Puis redémarrez les services :

```bash
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
```

### Option 2 : Configuration via Emergent Custom Keys (Production)

Pour la production, vous devez ajouter ces clés dans les variables d'environnement Emergent :

#### Variables à Ajouter :

**Backend :**
- Nom : `TURNSTILE_SECRET_KEY`
- Valeur : Votre Secret Key Cloudflare

- Nom : `TURNSTILE_SITE_KEY`
- Valeur : Votre Site Key Cloudflare

**Frontend :**
- Nom : `REACT_APP_TURNSTILE_SITE_KEY`
- Valeur : Votre Site Key Cloudflare

⚠️ **Note** : Contactez le Support Emergent pour vous aider à ajouter ces variables via l'interface de configuration système.

---

## 🧪 Clés de Test (Développement)

Cloudflare fournit des clés de test qui fonctionnent localement :

### Clé qui PASSE toujours :
- **Site Key** : `1x00000000000000000000AA`
- **Secret Key** : `1x0000000000000000000000000000000AA`

### Clé qui ÉCHOUE toujours :
- **Site Key** : `2x00000000000000000000AB`
- **Secret Key** : `2x0000000000000000000000000000000AA`

### Clé qui FORCE une interaction :
- **Site Key** : `3x00000000000000000000FF`
- **Secret Key** : `3x0000000000000000000000000000000AA`

Ces clés sont utiles pour tester votre intégration avant d'obtenir vos vraies clés.

---

## ✅ Vérification de l'Installation

### Comment Savoir si Turnstile Fonctionne ?

1. **Frontend** : 
   - Allez sur `/contact`
   - Vous devriez voir un widget Cloudflare Turnstile au-dessus du bouton "Envoyer"
   - Le widget affiche une checkbox ou s'active automatiquement

2. **Backend** :
   - Consultez les logs : `tail -f /var/log/supervisor/backend.out.log`
   - Vous devriez voir des logs de vérification Turnstile lors de la soumission du formulaire

3. **Test de Soumission** :
   - Remplissez le formulaire de contact
   - Complétez le CAPTCHA Turnstile
   - Cliquez sur "Envoyer"
   - Si tout fonctionne, vous recevrez une confirmation

---

## 🐛 Dépannage

### Le widget Turnstile ne s'affiche pas

**Causes possibles :**
1. `REACT_APP_TURNSTILE_SITE_KEY` n'est pas défini ou vaut `votre-turnstile-site-key`
2. Le domaine actuel n'est pas autorisé dans les paramètres Cloudflare
3. Problème de cache du navigateur

**Solutions :**
- Vérifiez vos variables d'environnement
- Ajoutez le domaine dans Cloudflare Dashboard > Turnstile > Settings > Domains
- Videz le cache et rechargez (Ctrl+Shift+R)

### Erreur "CAPTCHA verification failed"

**Causes possibles :**
1. La `TURNSTILE_SECRET_KEY` backend est incorrecte
2. Le token a expiré (durée de vie : 5 minutes)
3. Le token a déjà été utilisé

**Solutions :**
- Vérifiez votre Secret Key dans `/app/backend/.env`
- Le widget se réinitialise automatiquement après expiration
- Chaque soumission génère un nouveau token

### Erreur 503 "Service temporarily unavailable"

**Cause :** Timeout lors de la communication avec l'API Cloudflare

**Solution :** Vérifiez votre connexion internet et réessayez

---

## 📊 Analyse et Monitoring

Une fois configuré, vous pouvez surveiller l'activité Turnstile dans votre dashboard Cloudflare :

1. Allez dans **Turnstile** > **Votre Widget**
2. Consultez les statistiques :
   - Nombre de challenges résolus
   - Taux de réussite
   - Détection de bots
   - Traffic par domaine

---

## 🔐 Sécurité

### Bonnes Pratiques :

✅ **À FAIRE :**
- Gardez votre Secret Key confidentielle
- Utilisez des variables d'environnement
- Ne committez JAMAIS les clés dans Git
- Ajoutez `.env` dans `.gitignore`
- Renouvelez les clés si elles sont compromises

❌ **À NE PAS FAIRE :**
- Ne partagez pas votre Secret Key
- Ne l'incluez pas dans le code frontend
- Ne la publiez pas en ligne

---

## 📚 Ressources Officielles

- Documentation Cloudflare Turnstile : https://developers.cloudflare.com/turnstile/
- Dashboard Cloudflare : https://dash.cloudflare.com/
- Support Cloudflare : https://community.cloudflare.com/

---

## 💰 Tarification

**Cloudflare Turnstile est GRATUIT** pour :
- Utilisation illimitée
- Tous les modes (Managed, Non-interactive, Invisible)
- Support communautaire

Aucun frais caché, aucune limite de requêtes ! 🎉

---

**Besoin d'aide ?** Contactez le support Emergent ou consultez la documentation Cloudflare.
