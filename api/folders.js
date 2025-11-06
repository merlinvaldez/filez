import express from "express";
import { createFile, getFolderById, getFolders } from "#db/queries/folders";

const foldersRouter = express.Router();

foldersRouter.route("/").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

foldersRouter.param("id", async (req, res, next, id) => {
  const folder = await getFolderById(id);

  if (!folder) {
    return res.status(404).send("Folder not found");
  }
  req.folder = folder;
  next();
});

foldersRouter.route("/:id").get((req, res) => {
  res.send(req.folder);
});

foldersRouter.route("/:id/files").post(async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body required.");
  }
  if (!req.body.name || !req.body.size) {
    return res.status(400).send("Body is missing required fields");
  }
  const file = await createFile({
    name: req.body.name,
    size: req.body.size,
    folder_id: Number(req.params.id),
  });

  res.status(201).send(file);
});

export default foldersRouter;
