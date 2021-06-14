let tweets = [
  {
    id: '1',
    text: 'test data1',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    text: 'test data2',
    createdAt: Date.now().toString(),
    name: 'Seo',
    username: 'Seo',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

export async function getAll() {
  return tweets;
}

export async function getByUsername(username) {
  return tweets.filter(tweet => tweet.username === username);
}

export async function getById(id) {
  return tweets.find(tweet => tweet.id === id);
}

export async function created({ text, name, username, url }) {
  const tweet = {
    id: Date.now().toString(),
    text,
    name,
    username,
    url: url ? url : '',
    createdAt: Date.now().toString(),
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
