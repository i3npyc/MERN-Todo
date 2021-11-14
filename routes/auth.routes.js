const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = Router();

router.post(
  '/register',
  [
    check('email', 'E-mail неверный').isEmail(),
    check('password', 'Длина пароля должна содержать 6 символов').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);
router.post(
  '/login',
  [
    check('email', 'Введите корректный E-mail').normalizeEmail().isEmail(),
    check('password', 'Введён неврныей пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при авторизации'
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: 'Пользователь не найден'
        });
      }

      const isValidate = await bcrypt.compare(password, user.password);
      if (!isValidate) {
        return res.status(401).json({
          message: 'Неверный пароль'
        });
      }

      const token = jwt.sign({ userId: user.id }, config.get('secretJwt'), {
        expiresIn: '1h'
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

module.exports = router;
