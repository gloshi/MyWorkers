import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEditEmployeeMutation, useGetSingleEmployeeQuery } from '../../app/config/employee';
import { Form } from 'antd';
import { CustomInput } from '../../components/Input';
import { Employee } from '@prisma/client';
import styles from "./EditEmployee.module.scss";

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
    <div className={styles.container}>
      <div className={styles.title}>Страница изменения сотрудника</div>
      <div className={styles.form}> 
      <Form name="add-employee" onFinish={handlEditUser} initialValues={data}>
        <CustomInput type="text" name="firstName" placeholder="Имя" />
        <CustomInput name="lastName" placeholder="Фамилия" />
        <CustomInput type="number" name="age" placeholder="Возраст" />
        <CustomInput name="address" placeholder="Адрес" />
        
          <button className={styles.btnSave} type='submit'>Сохранить изменения</button>
   
      </Form>
      <button onClick={()=>navigate('/employee')} className={styles.btnCancel}>Отмена</button>
      </div>
    </div>
  )
}

export default EditEmployee