import express from 'express';
import * as exercise from '../services/exerciseService.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(exercise.list());
});

export default router;