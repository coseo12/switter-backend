let users = [
  {
    id: '1',
    username: 'seo',
    password: `$2b$12$LPVQxDVfRJ8mlzZBz17z9uHWgQUMIQhlWUMRSTuE6wQ7y9ysL4l7q`,
    name: 'seo',
    email: 'seo@email.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    username: 'sco',
    password: `$2b$12$LPVQxDVfRJ8mlzZBz17z9uHWgQUMIQhlWUMRSTuE6wQ7y9ysL4l7q`,
    name: 'sco',
    email: 'sco@email.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
];

export async function findById(id) {
  return users.find(user => user.id === id);
}

export async function findByUsername(username) {
  return users.find(user => user.username === username);
}

export async function createUser(user) {
  const cerated = {
    id: Date.now().toString(),
    ...user,
  };
  users.push(cerated);
  return cerated.id;
}
