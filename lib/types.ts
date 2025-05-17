import { InputHTMLAttributes, ReactNode } from "react";

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

export type CityAutocompleteProps = {
  onSelect: (city: string) => void;
};

type GooglePlacePrediction = {
  description: string;
  place_id: string;
};

export type GoogleAutocompleteResponse = {
  predictions: GooglePlacePrediction[];
  status: string;
  error_message?: string;
};

export type Suggestion = {
  description: string;
};

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}
