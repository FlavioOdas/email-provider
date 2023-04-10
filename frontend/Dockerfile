FROM node:16

# Set the working directory
WORKDIR /usr/src/frontend

# Copy the package.json from server to the current directory
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server files to the current directory
COPY . .

# Expose port 3001
EXPOSE 3001


CMD ["npm", "start"]