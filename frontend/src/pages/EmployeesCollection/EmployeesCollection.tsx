import React, { useEffect, useState } from "react";
import styles from "./EmployeesCollection.module.scss";
import { RxAvatar } from "react-icons/rx";
import { IoMdPersonAdd } from "react-icons/io";

import { useGetAllQuery } from "../../app/config/employee";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import NewEmployee from "../NewEmployee/NewEmployee";

interface IEmployee {
  address: string;
  age: string;
  firstName: string;
  id: string;
  lastName: string;
  userId: string;
}

const EmployeesCollection = () => {
  const { data, isLoading } = useGetAllQuery();
  const [items, setItems] = useState<IEmployee[]>([]);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [searchValue, setSearchValue] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("");
  const [onClickSort, setOnClickSort] = useState<boolean>(false)

  const sortItems = [
    
    { name: "Сбросить сортировку" },
    { name: "Возрасту (DESC)" },
    { name: "Возрасту (ASC)" },
    { name: "Фамилии (DESC)" },
    { name: "Фамилии (ASC)" },
  ];

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setItems(data);
  }, [data]);

  const onClose = () => {
    setShowModal(false);
    window.location.reload();
  };
  if (!data) {
    return <div>Загрузка...</div>;
  }
  if (!items) {
    return <div>Загрузка...</div>;
  }

  const handleClickSort = (obj: string) => {
    setSort(obj);
    sortFn(obj);
  };

  const sortFn = (name: string) => {
    const copyData = data.concat();

    if (name === "Сбросить сортировку") {
      setItems(copyData);
    }

    if (name === "Возрасту (DESC)") {
      const sortData = copyData.sort((a, b) => {
        return a.age > b.age ? 1 : -1;
      });
      setItems(sortData);
    }
    if (name === "Возрасту (ASC)") {
      const sortData = copyData.sort((a, b) => {
        return a.age < b.age ? 1 : -1;
      });
      setItems(sortData);
    }

    if (name === "Фамилии (DESC)") {
      const sortData = copyData.sort((a, b) => {
        return a.lastName > b.lastName ? 1 : -1;
      });
      setItems(sortData);
    }
    if (name === "Фамилии (ASC)") {
      const sortData = copyData.sort((a, b) => {
        return a.lastName.charCodeAt(0) < b.lastName.charCodeAt(0) ? 1 : -1;
      });
      setItems(sortData);
    }
  };

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
            <div className={styles.search}>
              <input
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Поиск..."
              />
            </div>
          </div>
          <div className={styles.params__groupBy}>
            <span>Группировать по:</span>
            <ul className={styles.sortItems}>
              <li onClick={() => setOnClickSort(!onClickSort)}>
             Выберите тип сортировки
              </li>
              {
                onClickSort && (
                  sortItems.map((el) => (
                <li key={el.name} onClick={() => handleClickSort(el.name)}>
                  {el.name}
                </li>
              ))
                )
              }
              
            </ul>
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
              ? items
                  .filter((el) => {
                    if (
                      el.firstName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      el.lastName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      el.address
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((el) => (
                    <Link key={el.id} to={`${ROUTES.employee}/${el.id}`}>
                      <div className={styles.boxItem}>
                        <div className={styles.boxItem__avatar}>
                          <RxAvatar size={30} />
                        </div>
                        <div className={styles.boxItem__name}>
                          <span>{el.firstName}</span> <span>{el.lastName}</span>
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
