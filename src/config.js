import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  host: {
    PORT: Number(required('PORT', 8080)),
  },
  jwt: {
    secretKey: required('JWT_SECRET_KEY'),
    expiresInSec: required('JWT_EXPIRES_IN_SEC', 86400),
  },
  bcrypt: {
    saltRounds: Number(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  db: {
    host: required('DB_HOST', 'a'),
    user: required('DB_USER', 'b'),
    database: required('DB_DATABASE', 'c'),
    password: required('DB_PASSWORD', 'd'),
    uri: process.env['DATABASE_URL'] || '',
  },
  cors: {
    allowedOrigin: required('CORS_ALLOW_ORIGIN'),
  },
  csrf: {
    plainToken: required('CSRF_PLAIN_TOKEN'),
  },
};
