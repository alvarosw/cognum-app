FROM node:18
WORKDIR /usr/app/email-service
COPY package*.json .
COPY prisma ./prisma/
COPY .env ./
RUN npm install
COPY . .
EXPOSE 3333
CMD ["npm", "run", "dev"]