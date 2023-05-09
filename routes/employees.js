const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getAll, addEmployees, getEmployeeById, deleteEmployees, changeEmployees } = require("../controllers/employees");


router.get('/', auth,  getAll)

router.get('/:id', auth, getEmployeeById)

router.post('/add', auth,  addEmployees)

router.post('/remove/:id', auth, deleteEmployees)

router.put('/edit/:id', auth, changeEmployees)

module.exports = router;