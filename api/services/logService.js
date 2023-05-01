import { users } from "../store.js";
import { exercises } from "../store.js";
import { logs } from "../store.js";

export function get(_id, from, to, limit){
  const foundUser = users.get(_id);
  if (!foundUser)
    throw new Error('User not found');
  const foundLog = logs.get(_id);
  if (!foundLog)
    return {
      username: foundUser,
      count: 0,
      _id,
      log: []
    };
  limit = limit ?? foundLog.length;
  let foundExercises = foundLog.map( eId => exercises.get(eId));
  const count = foundExercises.length;
  if (from || to) {
    from = from ? new Date(from).getTime() : 0;
    to = to ? new Date(to).getTime() : Date.now();
    foundExercises = foundExercises.filter( exercise => {
      const date = new Date(exercise.date).getTime();
      return from <= date && date <= to;
    })
  }
  const log = foundExercises.slice(0, limit);
  return {
    username: foundUser,
    count,
    _id,
    log,
  }
}

export function list() {
  const entries = logs.entries();
  const res = [];
  for(const entry of entries) {
    res.push({ _id: entry[0], eId: entry[1] });
  }
  return res;
}