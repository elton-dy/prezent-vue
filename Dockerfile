FROM node:16

WORKDIR /client

# Install dependencies first to take advantage of the Docker cache
COPY package*.json ./
RUN npm install

RUN chmod -R 777 /client/node_modules

# Copy remaining files
COPY . .

# Launch the Vue.js development server
CMD ["npm", "run", "dev"]
