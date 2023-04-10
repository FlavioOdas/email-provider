# E-mail

## Running the project

Clone the project

```bash
  git clone https://github.com/FlavioOdas/vertrical-challenge
```

Run with Docker Compose

```bash
  docker-compose up -d --build --remove-orphans
```

Access the frontend at http://localhost:3001

Access the backend at http://localhost:3000/ and http://localhost:3000/api for the API documentation

## Running the project individually

### MongoDB

```bash
  docker run -d -p 27017:27017 --name mongodb mongo
```

### Backend

```bash
  cd server
  npm install
  npm run start
```

### Frontend

```bash
  cd frontend
  npm install
  npm run start
```

## Running tests

Either cd into frontend or server and run the following command

```bash
  npm install
```

To run tests, run the following command

```bash
  npm run test
```

## Tech Stack

**Front-end:** React, Axios, Jest, React Testing Library

**Back-end:** Node, NestJS, Jest, Mongoose

## Authors

- [@FlavioOdas](https://www.github.com/FlavioOdas)
