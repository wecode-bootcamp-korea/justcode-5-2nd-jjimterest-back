FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./prisma/schema.prisma ./

RUN npm install

COPY . .

ADD .env .

EXPOSE 10010

CMD ["npm","start"]