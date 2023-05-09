import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEditEmployeeMutation, useGetSingleEmployeeQuery } from '../../app/config/employee';
import { Form } from 'antd';
import { CustomInput } from '../../components/Input';
import { Employee } from '@prisma/client';

const EditEmployee = () => {

  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetSingleEmployeeQuery(id || "");
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  const handlEditUser = async (employee:Employee) => {
      try {
        const newEmployee = {
          ...data,
          ...employee
        }
        await editEmployee(newEmployee).unwrap()
        navigate('/employee')
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div>
      <Form name="add-employee" onFinish={handlEditUser} initialValues={data}>
        <CustomInput type="text" name="firstName" placeholder="Имя" />
        <CustomInput name="lastName" placeholder="Фамилия" />
        <CustomInput type="number" name="age" placeholder="Возраст" />
        <CustomInput name="address" placeholder="Адрес" />
        
          <button type='submit'>{1}</button>
   
      </Form>
    </div>
  )
}

export default EditEmployee