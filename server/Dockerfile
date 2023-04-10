FROM node:16

# Install NestJS CLI
RUN npm i -g @nestjs/cli

# Create a directory for the app
WORKDIR /usr/src/server

# Copy the package.json from server to the current directory
COPY ./package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the server files to the current directory
COPY . .

# Expose port 3000
EXPOSE 3000

CMD ["nest", "start"]