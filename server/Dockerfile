# server/Dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com
RUN npm config set fetch-timeout 60000
RUN npm ci
COPY . .

RUN npm run build

EXPOSE 5000
CMD ["node", "dist/index.js"]
