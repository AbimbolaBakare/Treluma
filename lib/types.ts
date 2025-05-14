export type MoodboardProps = {
  images: { url: string; alt: string }[];
  loading: boolean;
  error: string;
};

export type MoodImage = {
  url: string;
  alt: string;
};

export type CitySummary = {
  aesthetic: string;
  energy: string;
  culture: string;
  personality: string;
  tips: string;
  mood: string;
};

export type UnsplashOptions = {
  query: string;
  perPage?: number;
  orientation?: "landscape" | "portrait" | "squarish";
  contentFilter?: "low" | "high";
};
