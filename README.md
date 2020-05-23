# Node.js REST API
A basic rest api using Expressjs, Express Validator and Sequelize.

## Setup
Copy `.env.example` to `.env` and fill in the fields as needed.
```sh
$ npm install
$ node app.js
```
**Endpoints:**
```
GET /users
GET /users/:id
POST /users
PUT /users/:id
DELETE /users/:id
```
POST body for creating is `{ "name": "some name", "age": 17, "email": "email@gmail.com" }` All fields optional except for `name`, When updating with put all fields are optional.

## License
Released under the [MIT License](LICENSE)
