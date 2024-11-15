# Auth Dockerfile
FROM node:16
WORKDIR /app
COPY . .
RUN npm install express mongoose bcrypt cors
EXPOSE 5001
CMD ["node", "app.js"]
