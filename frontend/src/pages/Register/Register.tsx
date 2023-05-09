import React from "react";
import Header from "../../components/Header/Header";
import styles from "./Register.module.scss";
import { Form } from "antd";
import { CustomInput } from "../../components/Input";
import { PasswordInput } from "../../components/passwordInput";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useRegisterMutation } from "../../app/config/auth";
import { User } from "@prisma/client";

type RegData = Omit<User, "id"> & {confirmPassword: string}

const Register = () => {

  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [registerUser] = useRegisterMutation()

  const hadnleRegister = async(data:RegData) => {
    try {
      await registerUser(data).unwrap()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div>Создайте аккаунт – начните ознакомление</div>
          <span>Вы сразу сможете добавлять своих сотрудников</span>
        </div>
        <div className={styles.register}>
          <div className={styles.register__form}>
            <Form onFinish={hadnleRegister}>
              <CustomInput type="text" name="name" placeholder="Имя" />
              <CustomInput type="email" name="email" placeholder="Email" />
              <PasswordInput name="password" placeholder="Пароль" />
              <PasswordInput name="confirmPassword" placeholder="Пароль" />
              <div className={styles.register__btn}>
                <button type="submit">Зарегистрироваться</button>
              </div>
            </Form>
            <Link to={ROUTES.login}>
              <div className={styles.login}>
                <span>Уже зарегистрированы?</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
