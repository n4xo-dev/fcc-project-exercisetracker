import { exercises } from "../store.js";
import { users } from "../store.js";
import { logs } from "../store.js";

export function create(_id, description, duration, date) {
  date = date ?? Date.now();
  date = new Date(date).toDateString()
  const foundUser = users.get(_id);
  if (!foundUser)
    throw new Error("User doesn't exist");
  const eId = description + duration + date;
  const foundExercise = exercises.get(eId);
  if (foundExercise)
    return foundExercise;
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
  return {_id, usename: foundUser, description, duration, date};
}