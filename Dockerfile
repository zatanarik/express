FROM node:latest
WORKDIR /app
COPY ["package.json", "package-lock.json*", "tsconfig.json","./"]
RUN npm install
COPY . .
RUN npm install knex -g
RUN npm install ts-node -g
RUN knex migrate:up
RUN npx tsc
EXPOSE 3000:3000
USER node
CMD ["node", "./dist/index.js"]
