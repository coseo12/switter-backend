let users = [
  {
    id: '1',
    username: 'seo',
    password: `12345`,
    name: 'Seo',
    email: 'seo@email.com',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
];

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
