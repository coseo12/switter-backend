let users = [
  {
    id: '1',
    username: 'seo',
    password: `$2b$12$LPVQxDVfRJ8mlzZBz17z9uHWgQUMIQhlWUMRSTuE6wQ7y9ysL4l7q`,
    name: 'Seo',
    email: 'seo@email.com',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
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
  console.log(user.password);
  users.push(cerated);
  return cerated.id;
}
