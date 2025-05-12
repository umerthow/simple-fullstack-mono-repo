import { NextFunction, Request, Response } from "express";
import {
  getUser,
  updateUser,
  addUser,
  getAllUsers,
} from "../repository/userCollection";
import { User } from "../entities/user";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { errorResponse, successResponse } from "../utils/response";

export const fetchUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    const user = await getUser(userId);

    if (!user) return res.status(404).json(errorResponse("user_not_found"));

    return res
      .status(200)
      .json(successResponse("Fetch detail user successfully", user));
  } catch (error) {
    return res.status(500).json(errorResponse("Error get detail user."));
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data: Partial<User> = req.body;

  try {
    await updateUser(userId, data);
    return res
      .status(200)
      .json(successResponse("User updated detail successfully", data));
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json(errorResponse("Error update user."));
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = req.body;

    const userId = await addUser({
      id: uuidv4(),
      email: user.email,
      name: user.name,
      age: user?.age,
    });

    return res.status(201).json(
      successResponse("User created successfully", {
        id: userId,
      })
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json(errorResponse("Error creating user."));
  }
};

export const fetchUserList = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res
      .status(200)
      .json(successResponse("User fecth successfully", users));
  } catch (error) {
    return res.status(500).json(errorResponse("Error fetch users."));
  }
};
