import express from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middlewares/verifyToken";
import { db } from "../config/dbconnection";
import { QueryError, QueryOptions } from "mysql2";
import { IEmail, sendMailToAllUser } from "../helpers/cron";
import { redis } from "../helpers/redis";

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

export const getClass = async (req: CustomRequest, res: express.Response) => {
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

type Iid = {
  id: number;
};

export const joinClass = (req: CustomRequest, res: express.Response) => {
  const q = "SELECT id FROM class WHERE code = ?";
  const queryOptions: QueryOptions = {
    sql: q,
    values: [req.body.code],
  };
  db.query(queryOptions, (err: QueryError, data: Iid[]) => {
    if (err) return res.status(404).json("No such class found");

    const classid = data[0].id;

    const q = "INSERT INTO userclass(`userID`,`classID`) VALUES (?, ?)";
    const queryOptions: QueryOptions = {
      sql: q,
      values: [req.user.id, classid],
    };

    db.query(queryOptions, (err: QueryError, data: object[]) => {
      if (err) return res.status(400).json(err);

      return res.status(200).json("Class successfully joined");
    });
  });
};

// export const getJoinedClass = (req: CustomRequest, res: express.Response) => {
//   try {
//     const q =
//       "SELECT c.code, c.color, c.date, c.title, c.id, u.username FROM class c JOIN users u ON c.creatorId = u.id JOIN userclass uc ON c.id = uc.classID WHERE uc.userID = ?";

//     const queryOptions: QueryOptions = {
//       sql: q,
//       values: [req.user.id],
//     };
//     db.query(queryOptions, (err: QueryError, data: []) => {
//       if (err) return res.status(400).json(err);

//       return res.status(200).json(data);
//     });
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// };

export const getJoinedClass = async (
  req: CustomRequest,
  res: express.Response
) => {
  try {
    const cacheKey = `class:${req.user.id}`;
    const cashedValue = await redis.get(cacheKey);
    if (cashedValue) {
      return res.status(200).json(JSON.parse(cashedValue));
    }
    const q1 =
      "SELECT c.code, c.color, c.date, c.title, c.id, u.username,c.creatorId FROM class c JOIN users u ON u.id = c.creatorId WHERE c.creatorId = ?";
    const queryOptions1: QueryOptions = {
      sql: q1,
      values: [req.user.id],
    };
    const q2 =
      "SELECT c.code, c.color, c.date, c.title, c.id, u.username, uc.userId FROM class c JOIN users u ON c.creatorId = u.id JOIN userclass uc ON c.id = uc.classID WHERE uc.userID = ?";

    const queryOptions2: QueryOptions = {
      sql: q2,
      values: [req.user.id],
    };
    db.query(queryOptions1, (err: QueryError, data1: []) => {
      if (err) return res.status(400).json(err);

      db.query(queryOptions2, async (err: QueryError, data2: []) => {
        if (err) return res.status(400).json(err);

        const combinedData = [...data1, ...data2];
        await redis.set(cacheKey, JSON.stringify(combinedData));
        return res.status(200).json(combinedData);
      });
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const getUsersJoined = (req: express.Request, res: express.Response) => {
  try {
    const q1 =
      "SELECT u.username FROM users u JOIN userclass uc ON u.id = uc.userId WHERE uc.classId = ?";
    const q2 =
      "SELECT u.username FROM users u JOIN class c ON u.id = c.creatorId WHERE c.id = ?";
    const queryOptions1: QueryOptions = {
      sql: q1,
      values: [req.params.id],
    };
    const queryOptions2: QueryOptions = {
      sql: q2,
      values: [req.params.id],
    };
    db.query(queryOptions1, (err: QueryError, data1: []) => {
      if (err) return res.status(400).json(err);

      db.query(queryOptions2, (err: QueryError, data2: []) => {
        if (err) return res.status(400).json(err);

        const combinedData = [...data1, ...data2];

        return res.status(200).json(combinedData);
      });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

type ICreator = {
  creatorId: number;
};

export const deleteClass = (req: CustomRequest, res: express.Response) => {
  try {
    const q = "SELECT creatorId FROM class WHERE id = ?";
    const queryOptions: QueryOptions = {
      sql: q,
      values: [req.params.id],
    };
    db.query(queryOptions, (err: QueryError, data: ICreator[]) => {
      if (err) return res.status(400).json(err);

      if (data[0].creatorId !== req.user.id) {
        return res.status(403).json("Unauthorized");
      }

      const q = "DELETE FROM class WHERE id = ?";
      const queryOptions: QueryOptions = {
        sql: q,
        values: [req.params.id],
      };
      db.query(queryOptions, (err: QueryError, data: []) => {
        if (err) return res.status(400).json(err);

        return res.status(200).json("Class deleted successfully");
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const unjoinClass = (req: CustomRequest, res: express.Response) => {
  try {
    const q = "DELETE FROM userclass WHERE classId=? AND userId=?";
    const queryOptions: QueryOptions = {
      sql: q,
      values: [req.params.id, req.user.id],
    };
    db.query(queryOptions, (err: QueryError, data: []) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Unjoined successfully");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const sendMailToClassUsers = (
  req: express.Request,
  res: express.Response
) => {
  try {
    const q =
      "SELECT u.email FROM users u JOIN userclass uc ON uc.userID = u.id WHERE uc.classID = ?";
    const queryOptions: QueryOptions = {
      sql: q,
      values: [req.params.id],
    };
    db.query(queryOptions, (err: QueryError, data: IEmail[]) => {
      if (err) return res.status(400).json(err);

      sendMailToAllUser({ data, text: req.body.text });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
