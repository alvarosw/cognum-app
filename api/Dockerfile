FROM node:18
WORKDIR /usr/app
COPY package*.json .
COPY prisma ./prisma/
COPY .env ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
