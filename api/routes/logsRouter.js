import express from 'express';
import * as log from '../services/logService.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(log.list());
});

export default router;