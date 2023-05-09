import React from 'react'
import {  Route,Routes } from 'react-router-dom'
import Home from '../components/Home/Home'
import { ROUTES } from '../paths'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import EmployeesCollection from '../pages/EmployeesCollection/EmployeesCollection'
import NewEmployee from '../pages/NewEmployee/NewEmployee'
import SingleEmployee from '../pages/SingleEmployee/SingleEmployee'
import EditEmployee from '../pages/EditEmployee/EditEmployee'

const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<Home/>}/> 
        <Route path={ROUTES.login} element={<Login/>}/> 
        <Route path={ROUTES.register} element={<Register/>}/> 
        <Route path={ROUTES.employee} element={<EmployeesCollection/>}/> 
        <Route path={`${ROUTES.employee}/:id`} element={<SingleEmployee/>}/> 
        <Route path={`${ROUTES.employeeEdit}/:id`} element={<EditEmployee/>}/> 


</Routes>
  )
}

export default AppRoutes