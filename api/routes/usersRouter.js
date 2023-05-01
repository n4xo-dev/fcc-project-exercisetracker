import express from 'express';
import * as user from '../services/userService.js';
import * as exercise from '../services/exerciseService.js';
import * as log from '../services/logService.js';

const router = express.Router();

router.post('/', (req, res) => {
  const username = req.body.username;
  if (!username)
    res.status(400).send('Bad request');
  else {
    const newUser = user.create(username)
    res.status(201).json(newUser);
  }
})

router.get('/', (req, res) => {
  res.status(200).json(user.list());
})

router.get('/:id', (req, res) => {
  try {
    const foundUser = user.get(req.params.id);
    res.status(200).json(foundUser)
  } catch(err) {
    res.status(404).send(err.message);
  }
})

router.post('/:id/exercises', (req, res) => {
  const _id = req.params.id;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;
  if (!_id || !description || !duration)
    res.status(400).send('Bad request');
  else {
    try {
      const newExercise = exercise.create(_id, description, duration, date);
      res.status(201).json(newExercise);
    } catch(err) {
      res.status(404).send(err.message);
    }
  }
})

router.get('/:id/logs', (req, res) => {
  const _id = req.params.id;
  const from = req.query.from;
  const to = req.query.to;
  const limit = req.query.limit;
  if(!_id)
    res.status(400).send('Bad request');
  else {
    try {
      const foundLog = log.get(_id, from, to, limit);
      res.status(200).json(foundLog);
    } catch(err) {
      res.status(404).send(err.message);
    }
  }
})

export default router;