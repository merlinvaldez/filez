import express from "express";
import { getFiles } from "#db/queries/files";

const filesRouter = express.Router();

filesRouter.route("/").get(async (req, res) => {
  const files = await getFiles();
  res.send(files);
});

export default filesRouter;
