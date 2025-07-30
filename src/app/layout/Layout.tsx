import { Outlet, useNavigate } from "react-router-dom";
import styles from "./layout.module.scss";
import { userStore } from "../../shared/stores/user.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "../../features/auth/api/auth.api";
import { memo, useCallback, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import {
  FaHome,
  FaHeart,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { MemoizedNavLink } from "../../shared/ui";

export const Layout = memo(() => {
  const { user, setUser } = userStore();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    retry: false,
  });

  const { mutate: logout } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      toast.success("Успешно");
      navigate("/web-player");
      window.location.reload();
    },
    onError: () => {
      toast.error("Произошла ошибка попробуйте позже");
    },
  });

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (data?.data.user) {
        setUser(data.data.user);
      }
    }
  }, [data, setUser]);

  const guestLinks = useMemo(
    () => (
      <div className={styles.navigation__user_info}>
        <MemoizedNavLink to="/login" icon={FaSignInAlt} text="Вход" />
        <MemoizedNavLink to="/register" icon={FaUserPlus} text="Регистрация" />
      </div>
    ),
    []
  );

  const userLinks = useMemo(
    () => (
      <>
        <MemoizedNavLink to="/favourites" icon={FaHeart} text="Избранные" />
        <div className={styles.navigation__user_info}>
          <a href="#" className={styles.navigation__item}>
            <span className={styles.icon}>
              <FaUser />
            </span>
            <span className={styles.text}>{user.email}</span>
          </a>
          <a
            href="#"
            className={styles.navigation__item}
            onClick={handleLogout}
          >
            <span className={styles.icon}>
              <FaSignOutAlt />
            </span>
            <span className={styles.text}>Выйти</span>
          </a>
        </div>
      </>
    ),
    [user.email, handleLogout]
  );

  return (
    <div className={styles.page}>
      <nav className={styles.navigation}>
        <MemoizedNavLink to="/home" icon={FaHome} text="Главная" />
        {user.id === null ? guestLinks : userLinks}
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
});
