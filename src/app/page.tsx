"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login/");
  }, [router]);

  return <div className="flex justify-center items-center h-80">Loading....</div>;
}
