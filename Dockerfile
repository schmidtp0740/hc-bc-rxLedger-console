FROM node:latest

WORKDIR /src/reactapp/

COPY . .
RUN npm install
EXPOSE 3002
CMD ["npm", "start"]
