"use client";

import { getMe, checkSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isPrivate =
    pathname.startsWith("/notes") || pathname.startsWith("/profile");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();

          if (isPrivate) {
            router.push("/sign-in");
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated, router, isPrivate]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return children;
};

export default AuthProvider;
