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
    PORT: required('PORT', 4000),
  },
  jwt: {
    secretKey: required('JWT_SECRET_KEY'),
    expiresInSec: required('JWT_EXPIRES_IN_SEC', 86400),
  },
  bcrypt: {
    saltRounds: Number(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
  },
};
