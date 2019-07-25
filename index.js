const express = require("express");
const db = require("./data/db");

const server = express();
const port = 3000;

server.use(express.json());

/**
|--------------------------------------------------
|  GET    | /api/users     | Returns an array of all the user objects contained in the database.
|--------------------------------------------------
*/

server.get("/users", (request, response) => {
  db.find()
    .then(users => {
      response.status(200).json(users);
    })
    .catch(err => {
      response.status(500).json({
        success: false,
        err
      });
    });
});

/**
|--------------------------------------------------
|  POST   | /api/users     | Creates a user using the information sent inside the `request body`.
|--------------------------------------------------

**/

server.post("/users", (request, response) => {
  // /users {name : somename}
  const { body } = request;

  db.insert(body)
    .then(user => {
      response.status(201).json({
        success: true,
        user
      });
    })
    .catch(err => {
      response.status(500).json({
        success: false,
        err
      });
    });
});

/**
|--------------------------------------------------
|  GET    | /api/users/:id | Returns the user object with the specified `id`.
|--------------------------------------------------
*/

server.get("/users/:id", (request, response) => {
  const { id } = request.params;

  db.find(id)
    .then(user => {
      // console.log(user[id - 1]);
      response.status(200).json(user[id - 1]);
    })
    .catch(err => {
      response.status(500).json({
        success: false,
        err
      });
    });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
