import { Request, Response } from "express";
// import * as admin from "firebase-admin";
const jwt = require("jsonwebtoken");
export async function isAuthenticated(
  req: Request,
  res: Response,
  next: Function
) {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ message: "Unauthorized 1" });

  if (!authorization.startsWith("Bearer"))
    return res.status(401).send({ message: "Unauthorized 2" });

  const split = authorization.split("Bearer ");
  if (split.length !== 2)
    return res.status(401).send({ message: "Unauthorized 3" });

  const token = split[1];

  try {
    // console.log(token);
    // const decodedToken = await admin.auth().verifyIdToken(token);
    const decodedToken = jwt.decode(token, { complete: true });
    // console.log("decodedToken", JSON.stringify(decodedToken));
    res.locals = {
      ...res.locals,
      uid: decodedToken.payload.user_id,
      role: decodedToken.role,
      email: decodedToken.payload.email,
    };
    return next();
  } catch (err) {
    console.error(`${err.code} -  ${err.message}`);
    return res.status(401).send({ message: "in Catch" });
  }
}
