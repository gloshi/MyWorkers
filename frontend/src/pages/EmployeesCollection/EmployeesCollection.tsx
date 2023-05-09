import React, { useEffect, useState } from "react";
import styles from "./EmployeesCollection.module.scss";
import Header from "../../components/Header/Header";
import { RxAvatar } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";
import { CustomInput } from "../../components/Input";
import { Form } from "antd";
import {
  useGetAllQuery,
  useGetSingleEmployeeQuery,
} from "../../app/config/employee";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import NewEmployee from "../NewEmployee/NewEmployee";
import { selectEmployees } from "../../features/employees/employeesSlice";
const EmployeesCollection = () => {
  const { data, isLoading } = useGetAllQuery();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const onClose = () => {
    setShowModal(false);
  };

  if (!data) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        {showModal && (
          <NewEmployee
            onClose={onClose}
            onSubmit={() => {}}
            active={showModal}
            title="Добавить сотрудника"
          />
        )}
        <div className={styles.params}>
          <div className={styles.params__add}>
            <button onClick={() => setShowModal(true)}>
              Добавить сотрудника <IoMdPersonAdd size={40} />
            </button>
          </div>
          <div className={styles.params__search}>
            <div style={{ paddingTop: 26 }}>
              <Form onFinish={() => {}}>
                <CustomInput type="text" name="search" placeholder="Поиск..." />
              </Form>
            </div>
          </div>
          <div className={styles.params__groupBy}>
            <span>Группировать по:</span>
            <form action="">
              <select name="" id="">
                <option>Не группировать</option>
                <option>Адресу</option>
                <option>Имени</option>
              </select>
            </form>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.info__box}>
            <span>Аватар</span>
            <span className={styles.name}>ФИО</span>
            <span className={styles.age}>Возраст</span>
            <span className={styles.location}>Место проживания</span>
          </div>
        </div>
        <div className={styles.employees}>
          <div className={styles.employees__box}>
            {data?.length > 0
              ? data.map((el) => (
                  <Link key={el.id} to={`${ROUTES.employee}/${el.id}`}>
                    <div className={styles.boxItem}>
                      <div className={styles.boxItem__avatar}>
                        <RxAvatar size={30} />
                      </div>
                      <div className={styles.boxItem__name}>
                        <span>{el.firstName}</span>  <span>{el.lastName}</span>
                      </div>
                      <div className={styles.boxItem__age}>{el.age}</div>
                      <div className={styles.boxItem__location}>
                        {el.address}
                      </div>
                    </div>
                  </Link>
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesCollection;
