import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authRepository from '../data/auth.js';

// Make it secure
export const jwtSecretKey = `i461Hz960oWYy1HwdvxIhlSa!Qz%smwz`;
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function signup(req, res, next) {
  const { username, password, name, email, url } = req.body;
  const found = await authRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await authRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res, next) {
  const { username, password } = req.body;
  const user = await authRepository.findByUsername(username);
  if (!user) {
    res.status(401).json({ message: `Invalid user or password` });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(404).json({ message: `Invalid user or password` });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

export async function me(req, res, next) {
  const user = await authRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: `User not found` });
  }
  res.status(200).json({ token: req.token, username: user.username });
}
