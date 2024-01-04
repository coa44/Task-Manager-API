# Task Manager API

- This API contains sevaral features
- Users can register to the system by providing personal information like first name, last name, email etc
- Application contains tasks management which depends on the authentication
- All Users can load all tasks
- Only authenticated users can update or deleted tasks

# Folder Structure

    src/
        |-- assets/
        |-- common/
        |-- controllers/
        |-- middlewares/
        |-- routes/
        |-- services/
        |-- tests/
        |-- types/
        |-- ...

## Dependencies

    @types/express
    @types/node
    cors
    dotenv
    express
    express-validator
    jest
    jsonwebtoken
    ts-jest
    ts-node
    typescript

## Requirements

- [Node.JS & NPM](https://nodejs.org/en/). Node 16 or higher is required

## Installation guides

- Clone the repository
- Install dependencies:
  - Navigate to the root folder of the project
  - run `npm install`
- Create .env file in the root folder of the project:
  - All relevant variables can be found in .env_example file

## Running

- Navigate to the root folder of the project
- Build the application by running a command `npm run build`
- Run the application with development mode `npm run start`
- Run the application with production mode `npm run start:prod`
- Application is now running on PORT specified

## Enjoy!
