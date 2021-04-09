FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run-script build
EXPOSE 80
CMD ["node", "server/index.js"]