const { prisma } = require("../prisma/prisma-client");

//получить всех
const getAll = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch {
    res.status(400).json({ message: "Не удалось получить сотрудников" });
  }
};

const addEmployees = async (req, res) => {
  const data = req.body;

  if (!data.firstName || !data.lastName || !data.age || !data.address) {
    return res.status(400).json({ data: "Заполните все поля" });
  }

  const newEmployee = await prisma.employee.create({
    data: {
      ...data,
      userId: req.user.id,
    },
  });

  res.status(201).json(newEmployee);
};

const deleteEmployees = async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });
    return res.status(204).json("ok");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "При удалении сотрудника что-то пошло не так" });
  }
};
const changeEmployees = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.employee.update({
      where: {
        id: id,
      },
      data: data,
    });
    res.status(204).json({ message: "Сотрудник успешно изменен" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "При изменении сотрудника что-то пошло не так" });
  }
};
const getEmployeeById = async (req, res) => {
  const { id } = req.params; //берем ид не из боди а из параметров

  try {
    const singleEmployee = await prisma.employee.findUnique({
      where: { id },
    });
    res.status(200).json(singleEmployee);
  } catch (error) {
    res.status(500).json({ message: "Не удалось найти сотрудника" });
  }
};
module.exports = {
  getAll,
  addEmployees,
  deleteEmployees,
  changeEmployees,
  getEmployeeById,
};
