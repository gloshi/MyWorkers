import React from "react";
import styles from "./Header.module.scss";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../paths";
import { connect, selectUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const pathname: string = location.pathname;
  const dispatch = useDispatch();
  const userCurrent = useSelector(selectUser);
  const navigate = useNavigate();

  const onClickLogout = () => {
    dispatch(connect())
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <Link to={ROUTES.home}>
        <div className={styles.logo}>
          <img src="/img/headerLogo.svg" alt="" />
        </div>
      </Link>
      <div className={styles.links}>
        <Link to={ROUTES.employee}>
          <span>Сотрудники</span>
        </Link>
        <span>FAQ</span>
      </div>
      <div className={styles.logginSet}>
        {userCurrent ? (
          <div onClick={onClickLogout} className={styles.logginSet__login}>
            <FaSignInAlt />
            Выйти
          </div>
        ) : (
          <>
            <Link to={ROUTES.login}>
              <div className={styles.logginSet__login}>
                <FaSignInAlt />
                  Войти
              </div>
            </Link>
            <Link to={ROUTES.register}>
              <div className={styles.logginSet__register}>
                <SiGnuprivacyguard size={18} /> Зарегистрироваться
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
