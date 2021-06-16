import express from 'express';
import 'express-async-error';
import * as authController from '../controller/auth.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage(`username should be at least 5 char`),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage(`password shuld be at least 5 char`),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage(`name is missing`),
  body('email').isEmail().normalizeEmail().withMessage(`invalid email`),
  body('url')
    .isURL()
    .withMessage(`invalid URL`)
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

// POST /auth/signup
router.post('/signup', validateSignup, authController.signup);

// POST /auth/login
router.post('/login', validateCredential, authController.login);

router.get('/me', isAuth, authController.me);

export default router;
