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
}

export async function updateTweet(req, res, next) {
  const tweet = await tweetRepository.updated(req.params.id, req.body.text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function deleteTweet(req, res, next) {
  await tweetRepository.remove(req.params.id);
  res.sendStatus(204);
}
