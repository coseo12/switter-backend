import { getSocketIO } from '../connection/socket.js';
import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res, next) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweetById(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function createTweet(req, res, next) {
  const tweet = await tweetRepository.created(req.body.text, req.userId);
  res.status(201).json(tweet);
  getSocketIO().emit('tweets', tweet);
}

export async function updateTweet(req, res, next) {
  const tweet = await tweetRepository.getById(req.params.id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.id !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await tweetRepository.updated(
    req.params.id,
    req.body.text,
    req.userId
  );
  if (updated) {
    res.status(200).json(updated);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function deleteTweet(req, res, next) {
  const tweet = await tweetRepository.getById(req.params.id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.id !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetRepository.remove(req.params.id);
  res.sendStatus(204);
}
