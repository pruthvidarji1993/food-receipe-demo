FROM node:12.16.3-alpine3.11 as build
WORKDIR /app
ENV NODE_ENV production
ENV PORT 1342
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
RUN npm run build
#CMD npm run start
EXPOSE 1342

CMD [ "npm", "run", "start" ]