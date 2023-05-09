import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteEmployeeMutation,
  useGetSingleEmployeeQuery,
} from "../../app/config/employee";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Descriptions, Space, Divider, Modal } from "antd";
import styles from "./SingleEmployee.module.scss";
const SingleEmployee = () => {
  const navigate = useNavigate();
  const param = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = useGetSingleEmployeeQuery(param.id || "");
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <div>Идет загрузка...</div>;
  }
  if (!data) {
    return <Navigate to="/" />;
  }

  const closeModal = () => {
    setShowModal(false);
  };
  const showModalButton = () => {
    setShowModal(true);
  };
  const handleDeleteEmployee = async () => {
    closeModal();
    try {
      await deleteEmployee(data.id).unwrap();
      navigate("/employee");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerPsevdo}>
          <div className={styles.image}>
            <img src="/img/avatar.png" alt="" />
          </div>
          <div className={styles.info}>
            <div className={styles.infoBg}>
              <div className={styles.box}>
                <div className={styles.box__firstName}>
                  <span>Имя:</span> <span>{data.firstName} </span>
                </div>
                <div className={styles.box__lastName}>
                  <span> Фамилия:</span> <span>{data.lastName}</span>
                </div>
                <div className={styles.box__age}>
                  <span> Возраст:</span> <span>{data.age}</span>
                </div>
                <div className={styles.box__location}>
                  <span> Место проживания:</span> <span>{data.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {user?.id === data.userId && (
          <div className={styles.btnsEdit}>
            
            <Link to={`/employee/edit/${data.id}`}>
              <button className={styles.btnsEdit__edit}>Редактировать</button>
            </Link>
            <button className={styles.btnsEdit__delete} onClick={showModalButton}>Удалить</button>

          </div>
        )}
        <Modal
          title="Подтвердите удаление"
          open={showModal}
          onOk={handleDeleteEmployee}
          onCancel={closeModal}
          okText="Подтвердить"
          cancelText="Отменить"
        >
          Вы действительно хотите удалить сотрудника из таблицы?
        </Modal>
      </div>
    </>
  );
};

export default SingleEmployee;
