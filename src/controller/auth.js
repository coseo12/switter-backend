import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as authRepository from '../data/auth.js';
import { config } from '../config.js';

// Make it secure

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
    // expiresIn: '30d',
  });
}

function generateCRSFToken() {
  return bcrypt.hash(config.csrf.plainToken, 1);
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };
  res.cookie('token', token, options);
}

export async function signup(req, res, next) {
  const { username, password, name, email, url } = req.body;
  const found = await authRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await authRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  setToken(res, token);
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
  setToken(res, token);
  res.status(200).json({ token, username });
}

export async function logout(req, res, next) {
  res.cookie('token', '');
  res.status(200).json({ message: 'User has been logged out' });
}

export async function me(req, res, next) {
  const user = await authRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: `User not found` });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

export async function csrfToken(req, res, next) {
  const csrfToken = await generateCRSFToken();
  res.status(200).json({ csrfToken });
}
