import { number, z } from "zod";

export const useRegisterSchema = () => {
  const registerSchema = z
    .object({
      id: number(),
      email: z.email({
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Пожалуйста введите корректный адрес",
      }),
      first_name: z
        .string()
        .min(3, "Минимальная длинна 3 символа")
        .max(16, "Максимальная длинна 16 символов")
        .regex(
          /^[a-zA-Zа-яА-ЯёЁ]+$/,
          "Только русские и английские буквы (без пробелов и дефисов)"
        ),
      second_name: z
        .string()
        .min(3, "Минимальная длинна 3 символа")
        .max(32, "Максимальная длинна 32 символов")
        .regex(
          /^[a-zA-Zа-яА-ЯёЁ]+$/,
          "Только русские и английские буквы (без пробелов и дефисов)"
        ),
      password: z
        .string()
        .min(8, "Минимальная длинна 8 символа")
        .max(64, "Максимальная длинна 64 символов"),
      password2: z.string(),
    })
    .refine((data) => data.password2 === data.password, {
      message: "Пароли не совпадат",
      path: ["password2"],
    });

  return { registerSchema };
};
