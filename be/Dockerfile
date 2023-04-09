FROM node:16
WORKDIR /app
COPY . /app
RUN npm install 
COPY . .
EXPOSE 3001
CMD ["npm", "start"]