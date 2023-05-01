import { createHash } from 'node:crypto';
import { users } from '../store.js';

export function create(username) {
  const id = createHash('md5').update(username, 'utf-8').digest('hex');
  if (users.has(id))
    return {_id: id, username };
  users.set(id, username);
  return { _id: id, username };
}

export function get(id) {
  const foundUser = users.get(id);
  if (!foundUser)
    throw new Error('User not found');
  return { _id: id, username: foundUser };
}

export function list() {
  const entries = users.entries();
  const res = [];
  for (const user of entries) {
    res.push({_id: user[0], username: user[1]});
  }
  return res;
}