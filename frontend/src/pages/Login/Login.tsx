import React, { useState } from "react";
import { CustomInput } from "../../components/Input";
import { Form } from "antd";
import { PasswordInput } from "../../components/passwordInput";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../paths";
import { UserData, useLoginMutation } from "../../app/config/auth";
import { haveErrorMessage } from "../../error";
import { ErrorMessage } from "../../components/MessageError";
import { CustomButton } from "../../components/Button";

const Login = () => {
  const [err, setErr] = useState("");
  const [userLogin, userLoginResult] = useLoginMutation();
  const navitage = useNavigate();

  const connect = async (data: UserData) => {
    try {
      await userLogin(data).unwrap();
      navitage("/");
    } catch (err) {
      const maybeError = haveErrorMessage(err);

      if (maybeError) {
        setErr(err.data.message);
      } else {
        setErr("Неизвестная ошибка");
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftBar}>
        <Link to={ROUTES.home}>
          <div className={styles.logo}>
            <img src="/img/headerLogo.svg" alt="" />
          </div>
        </Link>
        <div className={styles.leftBar__form}>
          <Form onFinish={connect}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit">
              Войти
            </CustomButton>
          </Form>
          <div className={styles.leftBar__links}>
            <Link to={ROUTES.register}>
              <span>Регистарация</span>
            </Link>
            <span>FAQ</span>
          </div>
          <ErrorMessage message={err} />
        </div>
      </div>
      <div className={styles.rigthBar}></div>
    </div>
  );
};

export default Login;
