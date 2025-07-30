import z from "zod";

export const useCreateTrackSchema = () => {
  const createTrackSchema = z.object({
    title: z
      .string()
      .min(3, "Минимальное кол-во символов 3")
      .max(100, "Максимальное кол-во символов 100"),
    artist: z
      .string()
      .min(3, "Минимальное кол-во символов 3")
      .max(100, "Максимальное кол-во символов 100"),
    audio_file: z.file(),
    cover_image: z.file(),
  });

  return { createTrackSchema }
};
