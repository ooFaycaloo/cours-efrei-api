import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { findUser, sendError } from "./lib/index.js";

const app = express();

app.use(express.json());

const port = 3000;

const mongoURL = "mongodb://localhost:27017/my-database";

mongoose.connect(mongoURL, )
  .then(() => {
  console.log('connected successfully ✅')
  })
  .catch((err) => {
    console.log('failed connection ❌', err);
  })

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

const User = mongoose.model('User', userSchema);

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
app.get("/users/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch(err){
    sendError(res, err)
  }
});

// Get a single user
app.get("/users/:id", async (req, res) => {
  const id = req.params.id
  
  try {
    const user = await User.findOne({ _id : id});
    res.status(200).json(user);
  } catch (err){
    sendError(res, err)
  }
})

// Create a new user
app.post("/users/", async (req, res) => {
  try {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return sendError(res, "Name and password are required");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({name, password: hashedPassword });
    
    newUser.save();
    
    res.status(201).json({ message: "user created successfully", newUser: newUser });
  } catch (err){
    sendError(res, err);
  }
})

// Update a single user
app.put("/users/:id", async(req, res) => {
  try{
    const id = req.params.id
    const { name, newPassword, oldPassword } = req.body;
  
    const user = await User.findOne({_id: id});
    
    if(!user){
      return sendError(res, "User doesn't exist");
    }
    
    const isMatch = bcrypt.compareSync(oldPassword, user.password);
  
    if(isMatch){
      
      await User.findOneAndUpdate({_id: id}, {
        name : name,
        password: bcrypt.hashSync(newPassword || oldPassword, 10)
      })
      
      res.status(200).json(user)
    } else {
      sendError(res, "Old password doesn't match");
    }
  } catch(err){
    sendError(res, err)
  }
  
});

// Delete a user 
app.delete("/users/:id", async (req,res) => {
  const id = req.params.id;

  try {
    await User.findOneAndDelete({ _id: id });
    res.status(204).send("User deleted succesfully");
  } catch(err){
    sendError(res, err);
  }
})

// Launch the server, start listening to events
app.listen(port, () => {
  console.log(`port démarré sur http://localhost:${port}`);
});
