import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema);

export async function findById(id) {
  return User.findById(id);
}

export async function findByUsername(username) {
  return User.findOne({ username });
}

export async function createUser(user) {
  const data = await new User(user).save();
  return data.id;
}
