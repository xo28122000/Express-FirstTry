const Joi = require("joi"); // for validation
const express = require("express");
const app = express();
app.use(express.json());

const users = [
  {
    id: 1,
    name: "Jainam"
  },
  { id: 2, name: "Ed" },
  { id: 3, name: "William" },
  { id: 4, name: "Anthony" }
];
// app.get()
// app.put()
// app.post()
// app.delete()

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users", (req, res) => {
  res.send(users);
});
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("The course with the given ID is not found!");
    return;
  }
  res.send(user);
});

app.post("/api/users", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  console.log(result);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  //   // manual validation
  //   if (!req.body.name || req.body.name.length < 3) {
  //     // 400 bad request
  //     res.status(400).send("Name is required and with length greater than 3");
  //     return;
  //   }
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.send(user);
});

app.put("/api/users/:id", (req, res) => {
  // 404 resourse not found
  // 400 bad request
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("The course with the given ID is not found!");
    return;
  }
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  user.name = req.body.name;
  res.send(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}`));
