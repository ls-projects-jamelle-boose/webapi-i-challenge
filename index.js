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

server.get("/api/users", (request, response) => {
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

server.post("/api/users", (request, response) => {
  const { body } = request;
  const { name, bio } = body;

  db.insert(body)
    .then(user => {
      console.log({ name, bio });
      if (name && bio) {
        response.status(400).json({
          errorMessage: "Please provide name and bio for the user."
        });
      } //else {
      //   response.status(201).json({
      //     user
      //   });
      // }
    })
    .catch(err => {
      response.status(500).json({
        error: "There was an error while saving the user to the database",
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

  db.findById(id)
    .then(user => {
      //try to refactor and send a message if user id doesn't exist
      response.status(200).json(user);
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
|  DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.
|--------------------------------------------------
*/

server.delete("/api/users/:id", (request, response) => {
  const { id } = request.params;

  db.remove(id)
    .then(del => {
      if (del) {
        response.status(204).end();
      } else {
        response.status(404).json({
          success: false,
          message: "I cannot find the user you are looking for, Dave."
        });
      }
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
| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.
|--------------------------------------------------
*/

server.put("/api/users/:id", (request, response) => {
  const { id } = request.params;
  const userInfo = request.body;

  db.update(id, userInfo)
    .then(updated => {
      if (updated) {
        response.status(200).json({
          success: true,
          updated
        });
      } else {
        response.status(404).json({
          success: false,
          messsage: "I cannot the user you are looking for, Dave."
        });
      }
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
