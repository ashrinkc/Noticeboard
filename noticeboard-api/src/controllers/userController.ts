import express from "express";
import { db } from "../config/dbconnection";
import bcrypt from "bcrypt";
import { QueryError, QueryOptions } from "mysql2";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middlewares/verifyToken";
import { json } from "stream/consumers";
import cloudinary from "../helpers/cloudinary";
export const register = (req: express.Request, res: express.Response) => {
  try {
    //CHECKING EXISTING USER
    const q = "SELECT * FROM users WHERE email=? OR username=?";
    db.query(q, [req.body.email, req.body.username], (err, data: []) => {
      if (err) return res.status(400).json(err);
      if (data.length > 0) return res.status(400).json("User already exists");

      //HASH THE PASSWORD
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
        "INSERT INTO users(`username`,`email`,`password`,`userType`) VALUES (?)";
      const values = [
        req.body.username,
        req.body.email,
        hash,
        req.body.userType,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json("User successfully registered");
      });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  userType: string;
}

export const login = (req: express.Request, res: express.Response) => {
  try {
    const q = "SELECT * FROM users WHERE username=?";
    const queryOptions: QueryOptions = {
      sql: q,
      values: [req.body.username],
    };
    db.query(queryOptions, (err: QueryError, data: UserData[]) => {
      if (err) return res.status(400).json(err);

      if (data.length === 0) return res.status(404).json("User not found");
      //CHECK PASSWORD
      const passCorrect =
        data.length > 0 &&
        bcrypt.compareSync(req.body.password, data[0].password);
      if (!passCorrect)
        return res.status(400).json("Incorrect username or password");

      const token = jwt.sign({ id: data[0].id }, "secretkey");
      const { password, ...others } = data[0];
      res.status(200).json({ others, token });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

type IPassword = {
  password: string;
};

export const updatePassword = (req: CustomRequest, res: express.Response) => {
  try {
    const q1 = "SELECT password FROM users WHERE `id` = ?";
    const queryOptions: QueryOptions = {
      sql: q1,
      values: [req.user.id],
    };
    db.query(queryOptions, (err: QueryError, data: IPassword[]) => {
      if (err) return res.status(400).json(err);

      const hashedPassword = data[0].password;
      const isMatch = bcrypt.compareSync(req.body.oldPassword, hashedPassword);
      if (!isMatch) {
        return res.status(400).json("Incorrect old password");
      }
      //HASH THE PASSWORD
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);
      const q = "UPDATE users SET `password`=? WHERE `id`=?";
      const queryOptions: QueryOptions = {
        sql: q,
        values: [hash, req.user.id],
      };
      db.query(queryOptions, (err: QueryError, data: []) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json("OK");
      });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const uploadImage = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.profilePic, {
      folder: "products",
    });
    console.log(result);
    const q = "UPDATE users SET profilePic=? WHERE id=?";
    const queryOptions: QueryOptions = {
      sql: q,
      values: [result.secure_url, req.user.id],
    };
    db.query(queryOptions, (err: QueryError, data: []) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json("Image added successfully");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
