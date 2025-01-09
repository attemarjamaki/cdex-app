"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { GoogleButton } from "./ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Hero = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <section>
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight text-foreground">
            Your Friendly Gateway to Decentralized Trading
          </h1>
          <p className="text-xl mb-10 text-neutral-400 font-semibold">
            We combine the ease of a Google login with the power of
            decentralized trading on Solana, offering a seamless way to swap
            tokens without the need for complex setups or wallets.
          </p>
        </div>
        <div className="flex items-center justify-center">
          {!session ? (
            <GoogleButton
              onClick={() => {
                signIn("google");
              }}
            >
              <Image
                src={"/icons/Google.svg"}
                height={20}
                width={20}
                alt="Google"
                className="mr-2 object-contain"
              />
              Sign in with Google
            </GoogleButton>
          ) : null}{" "}
        </div>
      </div>
    </section>
  );
};

export default Hero;
