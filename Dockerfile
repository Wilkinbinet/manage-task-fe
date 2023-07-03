# Fase de construcción
FROM node:16 as build

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . ./
RUN npm run build

# Fase de ejecución
FROM nginx:1.21.0-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
