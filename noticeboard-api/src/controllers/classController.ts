import express from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middlewares/verifyToken";
import { db } from "../config/dbconnection";
import { QueryError, QueryOptions } from "mysql2";

export const addClass = (req: CustomRequest, res: express.Response) => {
  try {
    const q =
      "INSERT INTO class(`title`,`date`,`color`,`creatorId`,`code`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.date,
      req.body.color,
      req.user.id,
      req.body.code,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Class has been created");
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getClass = (req: CustomRequest, res: express.Response) => {
  try {
    const q =
      "SELECT c.code, c.color, c.date, c.title, c.id, u.username FROM class c JOIN users u ON u.id = c.creatorId WHERE c.creatorId = ?";
    const queryOptions: QueryOptions = {
      sql: q,
      values: [req.user.id],
    };
    db.query(queryOptions, (err: QueryError, data: []) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json(err);
  }
};

export const joinClass = (req: express.Request, res: express.Response) => {
  const q = "SELECT * FROM class WHERE code = ?";
  const queryOptions: QueryOptions = {
    sql: q,
    values: [req.body.code],
  };
  db.query(queryOptions, (err: QueryError, data: []) => {
    if (err) console.log("No such class found");

    console.log(data);
  });
};
