export interface ICreateTrackRequest extends FormData {
  title: string;
  artist: string;
  audio_file: File;
  cover_image: File;
}

export interface ICreateTrackResponse {
  data: {
    id: number;
    title: string;
    artist: string;
    audio_file: File;
    cover_image: File;
    duration: number;
    uploaded_at: string;
  };
}
