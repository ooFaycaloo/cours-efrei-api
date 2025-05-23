import { User } from '../models/user.js';
import { sendError } from '../lib/sendError.js';
import bcrypt from 'bcrypt';

export const getUsers = async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch(err){
    sendError(res, 500, err)
  }
}

export const getUserById = async(req, res) => {
  const id = req.params.id
  
  try {
    const user = await User.findOne({ _id : id});
    res.status(200).json(user);
  } catch (err){
    sendError(res, 404, err)
  }
}

export const createUser = async(req, res) => {
  try {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return sendError(res, 400, "Name and password are required");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.findOne({ name });
    
    if (user) {
      return sendError(res, 400, "User already exists");
    }
    
    const newUser = new User({name, password: hashedPassword });
    
    newUser.save();
    
    res.status(201).json({ message: "user created successfully", newUser: newUser });
  } catch (err){
    sendError(res, 500, err);
  }
}

export const deleteUser = async(req, res) => {
  const id = req.params.id;

  try {
    await User.findOneAndDelete({ _id: id });
    res.status(204).send("User deleted succesfully");
  } catch(err){
    sendError(res, 500, err);
  }
}

export const updateUser = async(req, res) => {
  const id = req.params.id;
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    if (name) {
      user.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: "user updated successfully", user: user });
  } catch(err){
    sendError(res, 500, err);
  }
}

export const login = async(req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return sendError(res, 401, "Invalid password");
    }


    res.status(200).json({ message: "login successful"});
  } catch(err){
    sendError(res, 500, err);
  }
}

