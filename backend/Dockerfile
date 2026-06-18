FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del API
EXPOSE 5000

# Comando para correr en desarrollo con tsx watch
CMD ["npm", "run", "dev"]
