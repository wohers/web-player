import { memo } from "react";
import type { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import styles from "./memo-link.module.scss";

export const MemoizedNavLink = memo(
  ({ to, icon: Icon, text }: { to: string; icon: IconType; text: string }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? styles.navigation__item_active : styles.navigation__item
        }
      >
        <span className={styles.icon}>
          <Icon />
        </span>
        <span className={styles.text}>{text}</span>
      </NavLink>
    );
  }
);
