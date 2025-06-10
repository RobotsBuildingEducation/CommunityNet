import { useSeoMeta } from "@unhead/react";
import { LoginArea } from "@/components/auth/LoginArea";

export default function Auth() {
  useSeoMeta({
    title: "Login - CommunityNet",
    description: "Log in with your nsec or create a new account.",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <LoginArea className="w-full max-w-sm" />
    </div>
  );
}
