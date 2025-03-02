// lib/utils.ts
import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '**$1**') // Ensure bold text remains formatted
    .replace(/\n\s*-\s/g, '\n- ') // Proper bullet points
    .replace(/\n\s*\d+\.\s/g, '\n1. '); // Proper numbered lists
};
