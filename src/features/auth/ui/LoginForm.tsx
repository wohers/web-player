import { Controller, useForm } from "react-hook-form";
import { useLoginSchema } from "../validations/login.schema";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { userStore } from "../../../shared/stores/user.store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./auth-form.module.scss";

export const LoginForm = () => {
  const { loginSchema } = useLoginSchema();
  type LoginDataType = z.infer<typeof loginSchema>;
  const { setUser } = userStore();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      setUser(data.data.user);
      toast.success("Вы успешно вошли");
      navigate("/home");
    },
    onError: () => {
      toast.error("Ошибка при входе, попробуйте позже");
    },
  });

  const onSubmit = (formData: LoginDataType) => {
    login(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <label className={styles.form__label}>
              <span className={styles.form__span}>Почта</span>
              <input
                type="email"
                placeholder="example@gmail.com"
                {...field}
                className={styles.form__input}
              />
              {errors.email ? (
                <span className={styles.error}>{errors.email.message}</span>
              ) : (
                ""
              )}
            </label>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <label className={styles.form__label}>
              <span className={styles.form__span}>Пароль</span>
              <input
                type="password"
                placeholder="Введите пароль..."
                {...field}
                className={styles.form__input}
              />
              {errors.password ? (
                <span className={styles.error}>{errors.password.message}</span>
              ) : (
                ""
              )}
            </label>
          )}
        />
        <button
          type="submit"
          disabled={isPending}
          className={styles.form__button}
        >
          {isPending ? "Вход" : "Войти"}
        </button>
      </form>
    </div>
  );
};
