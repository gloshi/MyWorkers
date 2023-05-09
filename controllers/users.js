const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Заполните поля email и password!" });
    }

    //проверям есть ли такой пользователь в бд
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const correctPassword =
      user && (await bcrypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;

    if (user && correctPassword && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res
        .status(400)
        .json({ message: "Пароль или логин введены неверно" });
    }
  } catch (error) {
    res.status(400).json({ message: "Пароль или логин введены неверно" });
  }
};
// /api/user/register
const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const { email, password } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Заполните поля email и password!" });
    }

    const userData = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userData) {
      return res
        .status(400)
        .json({ message: "Пользователь, с таким email уже существует" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPas = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPas,
        name,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ message: "Что-то пошло не так " });
    }
  } catch (error) {
    return res.status(400).json({ message: "Что-то пошло не так " });
  }
};
const current = async (req, res) => {
  return res.status(200).json(req.user);
};
module.exports = {
  login,
  register,
  current,
};
