import express from "express";
const router = express.Router();
import {
  courseLookLike,
  sectionLookLike,
  facultyLookLike
} from "../controllers/LookLike.controller.js";
router.get("/courseLookLike/:slug", courseLookLike);
router.get("/sectionLookLike/:slug", sectionLookLike);
router.get("/facultyLookLike/:slug", facultyLookLike);

export default router;
