"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { GoogleButton } from "./ui/Button";

const Hero = () => {
  const session = useSession();
  return (
    <section>
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            The Best of Both Worlds: Centralized & Decentralized
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-purple-400">
            Experience the security of decentralization with the speed of
            centralized exchanges.
          </p>
          <div>
            {session.data?.user ? (
              <GoogleButton
                onClick={() => {
                  signOut();
                }}
              >
                Log out
              </GoogleButton>
            ) : (
              <GoogleButton
                onClick={() => {
                  signIn("google");
                }}
              >
                Sign in with Google
              </GoogleButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
