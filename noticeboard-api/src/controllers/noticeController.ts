import express from "express";
import { CustomRequest } from "../middlewares/verifyToken";
import { QueryError, QueryOptions } from "mysql2";
import { db } from "../config/dbconnection";
import { redis } from "../helpers/redis";

export const createNotice = (req: CustomRequest, res: express.Response) => {
  try {
    const q =
      "INSERT INTO classnotice(`classId`,`userId`,`notice`,`date`) VALUES (?)";
    const values = [
      req.body.classId,
      req.user.id,
      req.body.notice,
      req.body.date,
    ];
    const queryOptions: QueryOptions = {
      sql: q,
      values: [values],
    };
    db.query(queryOptions, async (err: QueryError, data: []) => {
      if (err) return res.status(400).json(err);

      // Remove the corresponding Redis cache for the class
      const cacheKey = `notice:${req.body.classId}`;
      await redis.del(cacheKey);
      return res.status(200).json("Notice added successfully");
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const getNotice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const cacheKey = `notice:${req.params.id}`;
    const cashedValue = await redis.get(cacheKey);
    if (cashedValue) {
      console.log("cashe");
      return res.status(200).json(JSON.parse(cashedValue));
    }
    const q =
      "SELECT n.id as noticeId, u.id,n.date, n.notice, u.username, c.creatorId from classnotice n JOIN users u ON n.userId = u.id JOIN class c ON n.classId = c.id  WHERE n.classId = ? ORDER BY n.date DESC";
    const queryOptions: QueryOptions = {
      sql: q,
      values: [req.params.id],
    };
    db.query(queryOptions, async (err: QueryError, data: []) => {
      if (err) return res.status(400).json(err);

      await redis.set(cacheKey, JSON.stringify(data));
      console.log("noncashe");
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
  }
};

interface IDelId {
  classId: number;
}

export const deleteNotice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const q = "SELECT classId FROM classnotice WHERE id = ?";
    const queryOptions: QueryOptions = {
      sql: q,
      values: [req.params.id],
    };
    db.query(queryOptions, async (err: QueryError, data: IDelId[]) => {
      // Remove the corresponding Redis cache for the class
      const cacheKey = `notice:${data[0].classId}`;
      await redis.del(cacheKey);
      const q = "DELETE FROM classnotice WHERE id = ?";
      const queryOptions: QueryOptions = {
        sql: q,
        values: [req.params.id],
      };
      db.query(queryOptions, async (err: QueryError, data: []) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json("Notice successfully deleted");
      });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
