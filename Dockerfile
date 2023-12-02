FROM node:20 as build-stage

WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code source de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape 2: Configurer le serveur web Nginx pour servir l'application construite
FROM nginx:stable-alpine as production-stage

# Copier les fichiers statiques de build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]