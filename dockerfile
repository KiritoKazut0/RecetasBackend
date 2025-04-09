FROM node:lts-bullseye as build

WORKDIR /Recetas

COPY . .


RUN npm install
RUN apt-get update && apt-get install -y wait-for-it
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]