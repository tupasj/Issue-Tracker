import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    console.log("error: ", error.message);
    res.status(400).json({ message: error.message });
  }
};

export { createUser };
