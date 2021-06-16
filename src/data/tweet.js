import * as authRepository from './auth.js';

let tweets = [
  {
    id: '1',
    text: 'test data1',
    createdAt: new Date(),
    userId: '1',
  },
  {
    id: '2',
    text: 'test data2',
    createdAt: new Date(),
    userId: '1',
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async tweet => {
      const { username, name, url } = await authRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getByUsername(username) {
  return getAll().then(res => res.filter(tweet => tweet.username === username));
}

export async function getById(id) {
  const found = tweets.find(tweet => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await authRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function created(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    userId,
    createdAt: new Date(),
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export async function updated(id, text) {
  const tweet = await getById(id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter(tweet => tweet.id !== id);
}
