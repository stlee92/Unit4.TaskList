import express from "express";
const router = express.Router();
export default router;
import requireBody from "#middleware/requireBody";
import {
  createTask,
  getTasksByUserId,
  getTaskById,
  deleteTaskById,
  updateTaskById,
} from "#db/queries/tasks";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

//all routes in here will start with /tasks

router
  .route("/")
  .post(requireBody(["title", "done"]), async (req, res) => {
    const { title, done } = req.body;
    // createTask(title, done, req.user.id);
    const task = await createTask(title, done, req.user.id);
    res.status(201).json(task);
  })
  .get(async (req, res) => {
    const tasks = await getTasksByUserId(req.user.id);
    res.status(200).send(tasks);
  });

router.param("id", async (req, res, next, id) => {
  const task = await getTaskById(id);
  if (!task) return res.status(404).send("Task not found");
  if (task.user_id !== req.user.id) {
    return res.status(403).send("This is not your task.");
  }
  req.task = task;
  next();
});

router
  .route("/:id")
  .delete(async (req, res) => {
    await deleteTaskById(req.task.id);
    res.sendStatus(204);
  })
  .put(requireBody(["title", "done"])),
  async (req, res) => {
    const { title, done } = req.body;
    const updatedTask = await updateTaskById(title, done, req.task.id);
    res.status(200).send(updatedTask);
  };
