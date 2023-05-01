import express from 'express';
import logsRouter from './logsRouter.js';
import usersRouter from './usersRouter.js';
import exercisesRouter from './exercisesRouter.js';

export default function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/users', usersRouter);
  router.use('/exercises', exercisesRouter);
  router.use('/logs', logsRouter);
}
