# 📚 Projet de Librairie en Ligne
Bienvenue dans le projet de librairie en ligne ! Ce projet permet de parcourir, rechercher et filtrer des livres, ainsi que d'ajouter de nouveaux livres à la bibliothèque. Il utilise une architecture moderne basée sur Next.js, des API sécurisées avec JWT, et une interface utilisateur intuitive.

# 🚀  Fonctionnalités
- Affichage des livres : Parcourez les livres disponibles, filtrés par catégorie ou affichés par nouveautés.
- Ajout de livres : Ajoutez de nouveaux livres à la bibliothèque via une interface utilisateur simple.
- Filtrage par catégories : Filtrez les livres par catégories grâce à une interface de filtres dynamique.
- Authentification sécurisée : Utilisation de JWT pour la sécurisation des routes API.

# 🛠️  Installation et Configuration

## Prérequis
- Node.js v14 ou supérieur
- NPM ou Yarn
- Symfony 5.8 ou supérieur

## Installation
### 1. Clonez le dépôt :

```bash
git clone https://github.com/Zadig2b/librairie-interpromo.git
```
allez dans le dossier clôné
```bash
cd librairie-interpromo
```

### Initialisation Back-end:

```bash
cd librairie-backend
```
#### Installez les dépendances :
```bash
composer install
```
#### Lancer l'application
Pour démarrer le serveur de développement, exécutez :
```bash
symfony server:start -d
```
L'application sera disponible sur http://localhost:8000.

## Initialisation Front-end:
```bash
cd librairie-front
```
#### Installez les dépendances :
```bash
npm install
```
#### Lancer l'application
Pour démarrer le serveur de développement, exécutez :
```bash
npm run dev
```
L'application sera disponible sur http://localhost:3000.

### Pour créer un build de production (facultatif)
```bash
npm run build
```


# 🧩 Structure du Projet
/app : Contient les pages principales de l'application.
/components : Contient les composants réutilisables de l'application.
/context : Contient le contexte d'authentification
/public : Contient les fichiers statiques tels que les images.

# 🔐 Gestion des JWT
Pour sécuriser les API, le projet utilise des JWT (JSON Web Tokens). Voici comment ils sont gérés :

Génération de clés : Nous avons généré une clé privée et une clé publique pour signer et vérifier les JWT. Cela garantit que les tokens sont émis par une source fiable.
SSL : L'utilisation de SSL (HTTPS) pour sécuriser les communications assure que les tokens JWT ne sont pas interceptés lors du transit.

# 📝 Documentation de l'API
L'API backend gère les livres et les catégories. Voici les principaux points de terminaison :

## endpoint livres
- GET /api/livres : Récupère la liste des livres.
- GET /api/livre/{id} : Récupère un livre par son id.
- POST /api/livre/new : Ajoute un nouveau livre. Nécessite un token JWT valide.
- PUT /api/livre/edit/{id} : Ajoute un nouveau livre. Nécessite un token JWT valide.
- POST /api/livre/delete/{id} : supprimme un livre. Nécessite un token JWT valide.

## endpoint catégories
- GET /api/categories : Récupère la liste des catégories.
- GET /api/categorie/{id} : Récupère une catégorie par son id.

## endpoint utilisateur

- GET /api/user/login: connexion utilisateur
- GET /api/user/me: récupère l'utilisateur (une fois connecté)	




# 🎨 Styles et UI
Le projet utilise Bootstrap pour les styles de base et un CSS personnalisé pour des ajustements spécifiques. Les boutons, par exemple, sont stylisés pour s'adapter au thème de l'application.

# 🛡️ Sécurité et SSL
Pour garantir la sécurité des communications entre le frontend et le backend, nous avons configuré SSL pour toutes les requêtes API, en utilisant des certificats appropriés.

# 💡 Contribuer
Les contributions sont les bienvenues ! Pour proposer des modifications, veuillez créer une issue ou une pull request.
- Forkez le projet
- Créez une branche feature (git checkout -b feature/NouvelleFeature)
- Committez vos changements (git commit -m 'Ajout de NouvelleFeature')
- Poussez vers la branche (git push origin feature/NouvelleFeature)
- Ouvrez une Pull Request
  
# 📄 Licence
Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.




