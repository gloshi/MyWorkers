import React, { PropsWithChildren, useState } from "react";
import styles from "./NewEmployee.module.scss";
import { Form } from "antd";
import { CustomInput } from "../../components/Input";
import { addEmployee, useAddEmployeeMutation, useGetAllQuery } from "../../app/config/employee";
import { ErrorMessage } from "../../components/MessageError";
import { haveErrorMessage } from "../../error";
import { Employee } from "@prisma/client";

interface INewEmployeeProps {
  active: boolean;
  title: string;
  onSubmit: () => void;
  onClose: () => void;
}

const NewEmployee = ({
  title,
  active,
  onSubmit,
  onClose,
}: PropsWithChildren<INewEmployeeProps>) => {
  const [addEmployee] = useAddEmployeeMutation();
  const [error, setError] = useState("");

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();
      onClose();
    } catch (err) {
      const maybeError = haveErrorMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  if (!active) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.box}>
          <Form onFinish={handleAddEmployee}>
            <CustomInput type="text" name="firstName" placeholder="Имя" />
            <CustomInput type="text" name="lastName" placeholder="Фамилия" />
            <CustomInput type="number" name="age" placeholder="Возраст" />
            <CustomInput
              type="text"
              name="address"
              placeholder="Место проживания"
            />
            <div className={styles.box__btn}>
              <button className={styles.add} type="submit">
                Добавить сотрудника
              </button>
            </div>
          </Form>
          <button onClick={onClose} className={styles.close}>
            Закрыть окно
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;
