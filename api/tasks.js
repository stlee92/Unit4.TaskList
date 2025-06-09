import express from "express";
const router = express.Router();
export default router;
import requireBody from "#middleware/requireBody";
import { createTask } from "#db/queries/tasks";
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
  .get((req, res) => {
    res.send("testing endpoint");
  });

router.param("id", async (req, res, next, id) => {
  const task = await getTaskById(id);
  if (!task) return res.status(404).send("Task not found");
  if (task.user_id !== req.user.id) {
  }
  req.task = task;
  next();
});

router.route("/:id").delete(async (req, res) => {
  res.sendStatus(204);
});
