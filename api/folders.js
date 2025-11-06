import express from "express";
import { getFolders } from "#db/queries/folders";

const foldersRouter = express.Router();

foldersRouter.route("/").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

export default foldersRouter;
