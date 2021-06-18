import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as authRepository from './auth.js';

const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    url: String,
  },
  {
    timestamps: true,
  }
);

useVirtualId(tweetSchema);

const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

export async function getById(id) {
  return Tweet.findById(id);
}

export async function created(text, userId) {
  const user = await authRepository.findById(userId);
  return new Tweet({
    text,
    userId,
    username: user.username,
    name: user.name,
    url: user.url,
  }).save();
}

export async function updated(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function remove(id) {
  return Tweet.findByIdAndRemove(id);
}
