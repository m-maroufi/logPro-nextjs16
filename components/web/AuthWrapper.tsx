"use client";

import { useConvexAuth } from "convex/react";
import AuthModal from "./auth-modal";

export default function AuthWrapper() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  // تا وقتی وضعیت لاگین مشخص نشده، چیزی render نکن
  if (isLoading) return null;

  return !isAuthenticated ? <AuthModal /> : null;
}
