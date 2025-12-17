import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { format } from "date-fns-jalali"; // فقط import رو از اینجا بگیر

export function convertDateToShamsi(creationTimeMs: number): string {
  const date = new Date(creationTimeMs); // میلی‌ثانیه رو درست می‌فهمه
  return format(date, "d MMMM yyyy"); // خروجی: "۲۵ آذر ۱۴۰۴" (یا ۲۶ بسته به زمان دقیق)
}
