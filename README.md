
<div align="center">
  <img src="https://files.catbox.moe/plcqhu.jpg" alt="DigiX Bot" width="200"/>

  # 📡 DigiX Newsletter Bot
  
  [![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Baileys](https://img.shields.io/badge/Baileys-6.7.9-25D366?style=for-the-badge)](https://github.com/whiskeysockets/baileys)
  
  <p align="center">
    <b>Bot WhatsApp spécialisé dans la récupération des ID de chaînes</b>
  </p>
  
  [![Deploy on Katabump](https://img.shields.io/badge/DEPLOY_ON_KATABUMP-ff6b6b?style=for-the-badge&logo=rocket&logoColor=white)](https://rl.katabump.fr/efa16b)
</div>

---

## ✨ Fonctionnalités

- 🔐 **Authentification par code** - Connexion simple via code d'appairage
- 📢 **Récupération des ID de chaînes** - Obtenez l'ID original de n'importe quelle chaîne WhatsApp
- 🚀 **Déploiement facile** - Compatible avec Katabump et autres panels
- ⚡ **Léger et rapide** - Optimisé pour une performance maximale
- 🎨 **Design professionnel** - Interface utilisateur soignée

---

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- Un compte WhatsApp actif
- Un numéro de téléphone valide

---

## 🚀 Installation

### 1. Clonez le repository

```bash
git clone https://github.com/NeoZoneHub/Newsletter-bot.git
cd digix-newsletter-bot
```

2. Installez les dépendances

```bash
npm install
```

3. Lancez le bot

```bash
node index.js
```

---

🎮 Utilisation

Commande principale

```
.newsletter
```

Utilisation : Tapez cette commande dans n'importe quelle chaîne WhatsApp pour obtenir son ID original.

Exemple de résultat :

```
╔══════════════════════════════╗
      📢 *INFORMATIONS DE LA CHAÎNE*
╠══════════════════════════════╣
🆔 *JID Original:* 120363418906972955@newsletter
╚══════════════════════════════╝

📋 *JID Complet:*
`120363418906972955@newsletter`

💡 Copiez cet ID pour utiliser la chaîne dans vos scripts
```

---

📦 Déploiement sur Katabump

1. Connectez-vous à votre panel Katabump
2. Cliquez sur le bouton ci-dessous :
   <a href="https://rl.katabump.fr/efa16b">
        <img src="https://img.shields.io/badge/DÉPLOYER_SUR_KATABUMP-FF6B6B?style=for-the-badge&logo=rocket&logoColor=white&fontSize=20" alt="Deploy on Katabump"/>
      </a>
3. Votre bot sera en ligne en quelques minutes !

---

🛠️ Structure du Projet

```
digix-newsletter-bot/
├── 📄 index.js              # Fichier principal
├── 📁 commands/             # Commandes du bot
│   └── 📄 newsletter.js     # Commande newsletter
├── 📁 sessionData/          # Données de session (auto-généré)
└── 📄 package.json          # Dépendances
```

---

⚙️ Configuration

Variables importantes

```javascript
// Dans index.js
const data = 'sessionData';        // Dossier de session
const prefix = '.';                // Préfixe des commandes
const number = 243833389567;        // Votre numéro WhatsApp
```

---

🔧 Commandes disponibles

Commande Description Utilisation
.newsletter Récupère l'ID de la chaîne Dans une chaîne WhatsApp

---

👨‍💻 Crédits

<div align="center">

Réalisé par

  <img src="https://files.catbox.moe/tae1im.jpg" alt="Digital Crew 243" width="150"/>

DIGITAL CREW 243 🚀

  <p>
    <i>"Always Forward. Digital Crew, one of the best."</i>
  </p>


</div>

---

🙏 Support

Pour toute question ou assistance :

<div align="center">

  <a href="https://wa.me/998771529519">
    <img src="https://img.shields.io/badge/CONTACT-25D366?style=for-the-badge&logo=whatsapp&logoColor=white&labelColor=128C7E&color=25D366&fontSize=20" alt="Contact Premium" width="300"/>
  </a>

  <br/>
  <br/>

  <img src="https://img.shields.io/badge/⭐_SUPPORT_⭐-FFD700?style=for-the-badge&logo=star&logoColor=black" alt="Premium Support"/>

</div>

---

<div align="center">

<b>Made with ❤️ by Digital Crew 243</b>

  <p>© 2026 DigiX Newsletter Bot. Tous droits réservés.</p>

</div>
