import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateReadtime(text: string) {
  const words = text.split(/\s+|[\.,!?;'"-]+/).length;
 

  const readTime = Math.ceil(words / 200);
  return readTime;
}
