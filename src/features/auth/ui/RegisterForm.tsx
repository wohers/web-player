import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRegisterSchema } from "../validations/register.schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./auth-form.module.scss";

export const RegisterForm = () => {
  const { registerSchema } = useRegisterSchema();
  const navigate = useNavigate();
  type RegisterDataType = z.infer<typeof registerSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDataType>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      first_name: "",
      second_name: "",
      password: "",
      password2: "",
    },
  });

  const { mutate: register, isPending } = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success("Вы успешно Зарегистрировались");
      navigate("/login");
    },
    onError: () => {
      toast.error("Ошибка при регистрации");
    },
  });

  const onSubmit = (formData: RegisterDataType) => {
    register(formData);
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
          name="first_name"
          control={control}
          render={({ field }) => (
            <label className={styles.form__label}>
              <span className={styles.form__span}>Имя</span>
              <input
                type="text"
                placeholder="Иван"
                {...field}
                className={styles.form__input}
              />
              {errors.first_name ? (
                <span className={styles.error}>
                  {errors.first_name.message}
                </span>
              ) : (
                ""
              )}
            </label>
          )}
        />
        <Controller
          name="second_name"
          control={control}
          render={({ field }) => (
            <label className={styles.form__label}>
              <span className={styles.form__span}>Фамилия</span>
              <input
                type="text"
                placeholder="Иванов"
                {...field}
                className={styles.form__input}
              />
              {errors.second_name ? (
                <span className={styles.error}>
                  {errors.second_name.message}
                </span>
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
                placeholder="Приудмайте пароль"
                className={styles.form__input}
                {...field}
              />
              {errors.password ? (
                <span className={styles.error}>{errors.password.message}</span>
              ) : (
                ""
              )}
            </label>
          )}
        />
        <Controller
          name="password2"
          control={control}
          render={({ field }) => (
            <label className={styles.form__label}>
              <span className={styles.form__span}>Повторите пароль</span>
              <input
                type="password"
                placeholder="Пароли должны совпадать"
                className={styles.form__input}
                {...field}
              />
              {errors.password2 ? (
                <span className={styles.error}>{errors.password2.message}</span>
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
          {isPending ? "Регистрируем..." : "Зарегистрироваться"}{" "}
        </button>
      </form>
    </div>
  );
};
