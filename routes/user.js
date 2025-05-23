import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, login} from '../controller/userController.js';

export const userRouter = express.Router();

export const userPrefix = '/users';

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

