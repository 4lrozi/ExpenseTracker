FROM node:18
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
