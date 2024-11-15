# API Dockerfile
FROM node:14
WORKDIR /app
COPY . .
RUN npm install express cors
EXPOSE 5002
CMD ["node", "app.js"]
