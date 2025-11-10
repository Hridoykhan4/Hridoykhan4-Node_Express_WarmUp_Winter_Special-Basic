const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

const users = [
  { id: 1, name: "Shabana", email: "Shabana@gmail.com" },
  { id: 2, name: "Aslam", email: "aslam@gmail.com" },
  { id: 3, name: "kutta", email: "kutta@gmail.com" },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/", (req, res) => {
  res.send("Simple crud running!");
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1
  users.push(newUser)
 res.send(newUser)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
