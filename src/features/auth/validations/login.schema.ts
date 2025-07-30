import z from "zod";

export const useLoginSchema = () => {
  const loginSchema = z.object({
    email: z.email({
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Пожалуйста введите корректный адрес",
    }),
    password: z.string().trim(),
  });

  return { loginSchema };
};
