import { exercises } from "../store.js";
import { users } from "../store.js";
import { logs } from "../store.js";
import { v4 as uuid } from 'uuid';

export function create(_id, description, duration, date) {
  date = date || Date.now();
  date = new Date(date).toDateString()
  duration = Number(duration)
  const foundUser = users.get(_id);
  if (!foundUser)
    throw new Error("User doesn't exist");
  if (duration === NaN)
    throw new Error('Invalid duration');
  const eId = uuid();
  const foundExercise = exercises.get(eId);
  if (foundExercise)
    return {_id, username: foundUser, ...foundExercise};
  exercises.set(eId, {
    description,
    duration,
    date
  });
  const foundLog = logs.get(_id);
  if (!foundLog)
    logs.set(_id, [eId]);
  else
    logs.set(_id, foundLog.concat(eId));
  return {_id, username: foundUser, description, duration, date};
}

export function list() {
  const entries = exercises.entries();
  const res = [];
  for (const entry of entries) {
    res.push({ eId: entry[0], exercise: entry[1] });
  }
  return res;
}