# 🏠 HomeLAB React Web Application

Une application web React moderne présentant mon infrastructure HomeLAB personnelle, avec des fonctionnalités interactives pour explorer les technologies d'auto-hébergement.

## 📋 Description

Cette application web présente de manière interactive mon environnement HomeLAB complet, incluant la virtualisation, la conteneurisation, la sécurité réseau et l'automatisation. Elle offre une expérience immersive pour découvrir les technologies utilisées dans un environnement d'infrastructure moderne.

## ✨ Fonctionnalités

### 🎯 Quiz Interactif
- Quiz random
- Système de progression en temps réel
- Fonction "Bruteforce" avec logging détaillé
- Redirection automatique vers la page contact après completion

### 🏗️ Présentation HomeLAB
- Vue d'ensemble de l'infrastructure
- Détails sur la virtualisation avec Proxmox
- Configuration réseau et sécurité
- Bases de données et monitoring
- Outils DevOps et automatisation

### 📞 Formulaire de Contact
- Interface conversationnelle
- Validation en temps réel
- Génération automatique d'emails
- Barre de progression interactive

### 🧮 Calculatrice
- Calculatrice scientifique complète
- Support clavier et souris
- Interface moderne avec thèmes
- Gestion des erreurs et validations

### 🎨 Interface Utilisateur
- Design responsive avec Tailwind CSS
- Thèmes sombre/clair avec DaisyUI
- Animations fluides et transitions
- Carousel interactif pour les images

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Framework JavaScript moderne
- **React Router** - Navigation côté client
- **Tailwind CSS** - Framework CSS utilitaire
- **DaisyUI** - Composants UI pour Tailwind
- **React Icons** - Bibliothèque d'icônes

### Outils de Développement
- **Vite** - Build tool et serveur de développement
- **ESLint** - Linter JavaScript/React
- **PostCSS** - Processeur CSS

### Infrastructure HomeLAB Présentée
- **Proxmox VE** - Virtualisation et conteneurisation
- **Docker & Kubernetes** - Orchestration de conteneurs
- **Nginx** - Reverse proxy et load balancer
- **PostgreSQL, MongoDB, Redis** - Bases de données
- **Grafana & InfluxDB** - Monitoring et métriques
- **pfSense** - Firewall et sécurité réseau
- **Ansible** - Automatisation et configuration

## 🚀 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd reactwebtp
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer en mode développement**
```bash
npm run dev
```

4. **Construire pour la production**
```bash
npm run build
```

## 📁 Structure du Projet

```
src/
├── components/           # Composants réutilisables
│   ├── quiz/            # Composants du quiz
│   ├── contact/         # Composants du formulaire de contact
│   ├── Header.jsx       # En-tête de l'application
│   ├── Footer.jsx       # Pied de page
│   └── Carousel.jsx     # Carrousel d'images
├── pages/               # Pages principales
│   ├── App.jsx          # Page d'accueil
│   ├── Contact.jsx      # Page de contact
│   ├── Calculatrice.jsx # Page calculatrice
│   └── HomeLab.jsx      # Page infrastructure HomeLAB
├── data/                # Données de configuration
│   ├── quizData.js      # Questions du quiz
│   ├── contactQuestions.js # Questions du formulaire
│   └── carouselData.js  # Images du carousel
├── utils/               # Utilitaires et helpers
│   ├── BruteforceQuiz.jsx # Logique de bruteforce
│   └── contactUtils.js  # Utilitaires de contact
└── styles/              # Fichiers CSS
    ├── index.css        # Styles principaux
    └── themes.css       # Thèmes personnalisés
```

## 🎮 Utilisation

### Navigation
- **Page d'accueil** (`/`) : Présentation générale et quiz
- **Contact** (`/contact/`) : Formulaire de contact interactif
- **Calculatrice** (`/calculatrice/`) : Calculatrice scientifique

### Quiz HomeLAB
1. Cliquez sur "Démarrer le Quiz" sur la page d'accueil
2. Répondez aux questions sur les technologies HomeLAB
3. Utilisez la fonction "Bruteforce" pour une résolution automatique
4. Complétez le quiz pour accéder au formulaire de contact

### Formulaire de Contact
- Interface conversationnelle guidée
- Remplissez nom, email et message
- Génération automatique d'un email de contact

## 🎨 Personnalisation

### Thèmes
L'application supporte plusieurs thèmes via DaisyUI. Modifiez `tailwind.config.js` pour ajouter de nouveaux thèmes.

### Contenu
- Modifiez `src/data/quizData.js` pour personnaliser les questions
- Ajustez `src/data/carouselData.js` pour changer les images
- Éditez `src/pages/HomeLab.jsx` pour votre infrastructure

## 📊 Fonctionnalités Avancées

### Système de Quiz Intelligent
- Algorithme de bruteforce avec verrouillage progressif
- Logging détaillé des tentatives
- Validation en temps réel des réponses

### Formulaire Conversationnel
- Interface chatbot-like
- Validation des emails en temps réel
- Génération d'emails avec mailto:



## 📝 Licence

Ce projet est sous licence [CC BY-NC-SA 4.0](LICENSE).

## 📧 Contact

Pour toute question concernant ce projet ou mon infrastructure HomeLAB, utilisez le formulaire de contact intégré à l'application.
