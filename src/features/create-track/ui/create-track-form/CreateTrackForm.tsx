import { Controller, useForm } from "react-hook-form";
import { useCreateTrackSchema } from "../../model/validators/create-track.schema";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTrack } from "../../model/hook/useCreateTrack";
import styles from "./create-track-form.module.scss";

export const CreateTrackForm = () => {
  const { createTrackSchema } = useCreateTrackSchema();
  type CreateDataType = z.infer<typeof createTrackSchema>;
  const { addTrack, isPending } = useCreateTrack();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateDataType>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(createTrackSchema),
    defaultValues: {
      title: "",
      artist: "",
    },
  });

  const onSubmit = async (data: CreateDataType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("artist", data.artist);
    if (data.audio_file) {
      formData.append("audio_file", data.audio_file);
    }
    if (data.cover_image) {
      formData.append("cover_image", data.cover_image);
    }

    addTrack(formData);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <label className={styles.form__label}>
              <span className={styles.form__span}>Названиие</span>
              <input
                type="text"
                placeholder="Введите название трека"
                {...field}
                className={styles.form__input}
              />
              {errors.title ? (
                <span className={styles.error}>{errors.title.message}</span>
              ) : (
                ""
              )}
            </label>
          )}
        />
        <Controller
          name="artist"
          control={control}
          render={({ field }) => (
            <label className={styles.form__label}>
              <span className={styles.form__span}>Артист</span>
              <input
                type="text"
                placeholder="Введите имя Артиста"
                {...field}
                className={styles.form__input}
              />
              {errors.artist ? (
                <span className={styles.error}>{errors.artist.message}</span>
              ) : (
                ""
              )}
            </label>
          )}
        />
        <Controller
          name="audio_file"
          control={control}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value, ...restField } }) => (
            <label className={styles.form__label}>
              <span className={styles.form__span}>
                Вставьте файл с музыкой ( формат: mp3 )
              </span>
              <input
                type="file"
                accept=".mp3"
                onChange={(e) =>
                  onChange(e.target.files ? e.target.files[0] : null)
                }
                {...restField}
              />
              {errors.audio_file ? (
                <span className={styles.error}>
                  {errors.audio_file.message}
                </span>
              ) : (
                ""
              )}
            </label>
          )}
        />
        <Controller
          name="cover_image"
          control={control}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { onChange, value, ...restField } }) => (
            <label className={styles.form__label}>
              <span className={styles.form__span}>
                Загрузите картинуку ( формат: jpg )
              </span>
              <input
                type="file"
                onChange={(e) =>
                  onChange(e.target.files ? e.target.files[0] : null)
                }
                {...restField}
              />
              {errors.cover_image ? (
                <span className={styles.form__error}>
                  {errors.cover_image.message}
                </span>
              ) : (
                ""
              )}
            </label>
          )}
        />
        <button type="submit" className={styles.form__button}>{isPending ? "Создание" : "Создать"}</button>
      </form>
    </div>
  );
};
