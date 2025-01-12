"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { PrimaryButton } from "./ui/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="bg-neutral-100 p-4">
      <div className="flex justify-between max-w-6xl mx-auto">
        <Link href={"/"} className="flex flex-col justify-center">
          <div className="text-lg font-bold ">ShiftyFi</div>
        </Link>

        <div>
          {status === "authenticated" ? (
            <PrimaryButton onClick={signOut}>Log out</PrimaryButton>
          ) : (
            <PrimaryButton onClick={() => signIn("google")}>
              Get Started
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
