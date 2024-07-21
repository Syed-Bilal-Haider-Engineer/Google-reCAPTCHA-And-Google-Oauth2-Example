import express from 'express'
import {getAllUsers,create} from '../controllers/userController.js'

const router = express.Router();

router.get(
  "/all",
  getAllUsers
);

router.post(
  "/create",
  create
);

export default router;
