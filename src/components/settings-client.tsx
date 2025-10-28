"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const SettingsClient = () => {
  const router = useRouter();

  return (
    <div>
      <form
        action={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login");
              },
            },
          });
        }}
      >
        <button type="submit" className="bg-blue-500 rounded-md p-4">
          Sign out
        </button>
      </form>
    </div>
  );
};
