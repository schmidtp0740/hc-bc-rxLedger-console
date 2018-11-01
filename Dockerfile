FROM node:8.2.1-alpine

WORKDIR /src/reactapp/

COPY . .
RUN npm install
EXPOSE 3002
CMD ["npm", "start"]
