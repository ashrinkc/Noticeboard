import jwt, { JwtPayload } from "jsonwebtoken";
import express from "express";

export interface CustomRequest extends express.Request {
  user?: any;
}

function verifyToken(
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json("Not authenticated");
  }
  const token = authorization.replace("Bearer ", "");
  try {
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) return res.status(403).json("Token is not valid");
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}

export default verifyToken;
