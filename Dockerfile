FROM node:latest
WORKDIR /app
COPY ["package.json", "package-lock.json*", "tsconfig.json","./"]
RUN npm install
COPY . .
RUN npx tsc
EXPOSE 3000:3000
USER node
CMD ["node", "./dist/src/app.js"]
