const express = require("express");
const db = require("./data/db");

const server = express();
const port = 3000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`Hello world from express!`);
});

// server.post('/users', (req, res) => {
//   // /users {name : somename}
//   const userInfo = req.body

//   db.add(userInfo)
// })

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
