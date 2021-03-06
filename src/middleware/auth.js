import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as authRepository from '../data/auth.js';

const AUTH_ERROR = { message: `Authorization Error` };

export const isAuth = async (req, res, next) => {
  let token;
  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(` `)[1];
  }
  if (!token) {
    token = req.cookies['token'];
  }

  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await authRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    req.token = token;
    next();
  });
};

export const authHandler = async req => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwt.secretKey);
    const user = await authRepository.findById(decoded.id);
    if (!user) {
      throw { status: 401, ...AUTH_ERROR };
    }
    req.userId = user.id;
    req.token = decoded;
    return true;
  } catch (error) {
    console.error(error);
    throw { status: 401, ...AUTH_ERROR };
  }
};
