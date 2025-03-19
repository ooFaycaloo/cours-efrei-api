import express from "express";
import bcrypt from "bcrypt";
import { findUser, sendError } from "./lib/index.js";

const app = express();

app.use(express.json());

const port = 3000;

let users = [
  {
    id: crypto.randomUUID(),
    name: "Alex",
    password: bcrypt.hashSync("password123", 10)
  },
  {
    id: crypto.randomUUID(),
    name: "Emma",
    password: bcrypt.hashSync("password456", 10)
  },
];


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
app.post("/users/", async (req, res) => {
  const { name, password } = req.body;
  
  if(!name || !password){
    return sendError(res, "Name and password are required");
  }
  
  if(findUser(users, name)){
    return sendError(res, "User already exists");
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser = {
    id: crypto.randomUUID(),
    name: name,
    password: hashedPassword
  };
  
  users.push(newUser);
  res.status(201).json({ message: "user created successfully", newUser: newUser });
})

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  
  if(!name || !password){
    return sendError(res, "Name and password are required");
  }
  
  const user = findUser(users, name)
  
  if(!user){
    return sendError(res, "User doesn't exist");
  }
  
  const isMatch = bcrypt.compareSync(password, user.password);

  
  if(!isMatch){
    sendError(res, "Name or Password doesn't match");
  } else {
    res.status(200).send("user logged in successfully");
  }
})

// Update a single user
app.put("/users/:id", (req, res) => {
  const { name, oldPassword, newPassword } = req.body;
  
  if(!name || !newPassword){
    return sendError(res, "Name and password are required");
  }
  
  const user = findUser(users, name)
  
  if(!user){
    return sendError(res, "User doesn't exist");
  }
  
  const isMatch = bcrypt.compareSync(oldPassword, user.password);
  


  if(isMatch){
    user.name = name;
    if(newPassword){
      user.password = bcrypt.hashSync(newPassword, 10);
    }
    
    res.status(200).json(user)
  } else {
    sendError(res, "Old password doesn't match");
  }
  
});

// Delete a user 
app.delete("/users/:id", (req,res) => {
  users = users.filter(user => user.id !== parseInt(req.params.id))
  res.json({ message: "Utilisateur supprimé" });
})

// Launch the server, start listening to events
app.listen(port, () => {
  console.log(`port démarré sur http://localhost:${port}`);
});
