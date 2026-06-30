# 🛒 Evana - Marché de vente en ligne

![Evana Logo](frontend/public/evana-logo.svg)

Application e-commerce complète avec **React** (frontend) et **Spring Boot** (backend).

## 🚀 Fonctionnalités

- ✅ Catalogue de produits avec grille responsive
- ✅ Recherche et filtrage par catégorie
- ✅ Page de détail produit
- ✅ Panier avec gestion des quantités (localStorage)
- ✅ Commande sans authentification (nom, prénom, téléphone, adresse)
- ✅ Validation des formulaires
- ✅ Page de confirmation avec récapitulatif
- ✅ Design moderne orange "Evana"

## 📋 Prérequis

- **Java 17+** (pour le backend Spring Boot)
- **Maven 3.8+** (pour builder le backend)
- **Node.js 18+** et **npm** (pour le frontend React)

## 🏗️ Installation et lancement

### Backend (Spring Boot)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Le serveur démarre sur `http://localhost:8080`

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Le frontend démarre sur `http://localhost:5173`

## 📡 API Endpoints

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/products` | Liste des produits (query params: `search`, `category`) |
| GET | `/api/products/{id}` | Détail d'un produit |
| GET | `/api/products/categories` | Liste des catégories |
| POST | `/api/orders` | Créer une commande |
| GET | `/api/orders/{id}` | Détail d'une commande |

## 🗂️ Structure du projet

```
evana/
├── backend/                 # Spring Boot API
│   ├── src/main/java/com/evana/
│   │   ├── model/          # Entités JPA
│   │   ├── repository/     # Repositories Spring Data
│   │   ├── service/        # Logique métier
│   │   ├── controller/     # REST Controllers
│   │   ├── dto/            # Data Transfer Objects
│   │   └── config/         # Configuration (CORS)
│   └── src/main/resources/
│       ├── application.properties
│       └── data.sql         # Données initiales
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/          # Pages de l'app
│   │   ├── context/        # Cart Context (state)
│   │   └── services/       # API calls
│   ├── index.html
│   └── package.json
└── README.md
```

## 🎨 Stack technique

- **Frontend** : React 18, React Router, Vite, Axios
- **Backend** : Spring Boot 3.2, Spring Data JPA, H2 Database
- **Style** : CSS pur, responsive, thème orange Evana
- **État** : Context API + localStorage pour le panier
