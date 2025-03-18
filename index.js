import express from "express";
const app = express();
app.use(express.json());
const port = 3000;

let users = [
  {
    id: 0,
    name: "Alex",
  },
  {
    id: 1,
    name: "Emma",
  },
];


const sendError = (res,error) => {
  res.send({ "error": error });
}

// default route
app.get("/", (req, res) => {
  res.send("Le serveur est bien démarré.");
})

// Get all users
app.get("/users/", (req, res) => {
  res.json(users);
  console.log('user requested all users');
});

// Get a single user
app.get("/users/:id", (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  
  if(!user){
    res.status(404);
    sendError(res, "User not found");
  }
  
  res.json(user);
})

// Create a new user
app.post("/users/", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
})


// Update a single user
app.put("/users/:id", (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));

  if (!user) {
    res.status(404);
    return sendError(res, "User not found");
  }

  if (req.body.name) {
    user.name = req.body.name
  }

  res.json(user);
});

// Delete a user 
app.delete("/users/:id", (req,res) => {
  users = users.filter(user => user.id === parseInt(req.params.id))
  res.json({ message: "Utilisateur supprimé" });
})

// Launch the server, start listening to events
app.listen(port, () => {
  console.log(`port démarré sur http://localhost:${port}`);
});
