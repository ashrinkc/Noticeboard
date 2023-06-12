import express from "express";
import { db } from "../config/dbconnection";
import bcrypt from "bcrypt";
import { QueryError, QueryOptions } from "mysql2";
import jwt from "jsonwebtoken";
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
