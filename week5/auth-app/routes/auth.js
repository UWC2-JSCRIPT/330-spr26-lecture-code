import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import jwtVerify from '../middleware/jwtVerify';
import logger from '../middleware/logger';

const router = express.Router();

const { JWT_SECRET } = process.env;

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword });
    if (user) {
      return res.status(201).send('created');
    }

    return res.status(500).send('Server error');
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

router.post(
  '/login',
  (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(`AUDIT LOG FOR LOGIN: User: ${req.body.email}`);
    next();
  },
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('Not found');
    }

    const hashedPassword = user.password;
    const isAuthenticated = await bcrypt.compare(password, hashedPassword);
    if (isAuthenticated) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: '15m',
      });
      return res.status(200).json({ token });
    }

    return res.status(401).send('unauthorized');
  },
);

// router.post('/verify', async (req, res) => {
//   const [, token] = req.headers.authorization.split(' ');

//   try {
//     const payload = jwt.verify(token, JWT_SECRET);
//     return res.json({ payload, valid: true });
//   } catch (error) {
//     return res.status(401).send('unauthorized');
//   }
// });

router.post('/verify', jwtVerify, async (req, res) => {
    const { role } = req.body;
    const { id } = req.params;

    await User.findByIdAndUpdate(id, { $addToSet: {roles: role}})

    return res.sendStatus(200)
});

export default router;
