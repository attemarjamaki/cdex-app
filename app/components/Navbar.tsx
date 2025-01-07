"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { PrimaryButton } from "./ui/Button";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="border-b px-2 py-2 flex justify-between">
      <div className="text-xl font-bold flex flex-col justify-center">
        LDCEX
      </div>
      <div>
        {session.data?.user ? (
          <PrimaryButton
            onClick={() => {
              signOut();
            }}
          >
            Log out
          </PrimaryButton>
        ) : (
          <PrimaryButton
            onClick={() => {
              signIn("google");
            }}
          >
            Sign in
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
