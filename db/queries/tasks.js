import db from "#db/client";

export async function createTask(title, done, userId) {
  const sql = `INSERT INTO tasks (title, done, user_id) VALUES ($1, $2, $3) RETURNING *`;
  const {
    rows: [task],
  } = await db.query(sql, [title, done, userId]);
  return task;
}

export async function getTasksByUserId(userId) {
  const sql = `SELECT * FROM tasks WHERE user_id=$1`;
  const { rows: tasks } = await db.query(sql, [userId]);
  return tasks;
}

export async function getTaskById(id) {
  const sql = `SELECT * FROM tasks WHERE id=$1`;
  const {
    rows: [task],
  } = await db.query(sql, [id]);
  return task;
}

export async function deleteTaskById(id) {
  const sql = `DELETE FROM tasks WHERE user_id =$1`;
  await db.query(sql, [id]);
}

export async function updateTaskById(title, done, id) {
  const sql = `UPDATE tasks SET title=$1, done=$2 WHERE id=$3 RETURNING *`;
  const {
    rows: [task],
  } = await db.query(sql, [title, done, id]);
  return task;
}
