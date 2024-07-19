FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]
