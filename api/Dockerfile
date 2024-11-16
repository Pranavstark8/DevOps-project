# API Dockerfile
FROM node:14
WORKDIR /app
COPY . .
RUN npm install cors axios express
EXPOSE 5002
CMD ["node", "app.js"]
