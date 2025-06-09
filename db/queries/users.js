import bcrypt from "bcrypt";
import db from "#db/client";

export async function createUser(username, password) {
  const sql = `INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *`;
  // in real life, never return the password (don't use the * - select columns only).
  //it is a ood idea to have a try-catch here in the data layer
  //if there is an error, return either a message or an empty array (e.g. in a get function)
  //and log the error internally from the data layer
  //
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `SELECT * FROM users WHERE username=$1`;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

export async function getUserById(id) {
  const sql = `SELECT * FROM users WHERE id =$1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
