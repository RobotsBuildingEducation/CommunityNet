import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasTag(event: { tags: string[][] }, tag: string) {
  return event.tags.some(
    ([t, v]) => t === 't' && (v ?? '').toLowerCase() === tag.toLowerCase(),
  );
}
