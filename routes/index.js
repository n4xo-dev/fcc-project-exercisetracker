import express from 'express';
import usersRouter from './usersRouter.js';

export default function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/users', usersRouter);
}
