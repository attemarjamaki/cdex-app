import Dashboard from "@/components/Dashboard";
import db from "@/app/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

async function getUserWallet() {
  const session = await getServerSession(authConfig);

  const userWallet = await db.solWallet.findFirst({
    where: {
      userId: session?.user?.uid,
    },
    select: {
      publicKey: true,
    },
  });
  if (!userWallet) {
    return {
      error: "No Solana wallet found",
    };
  }

  return { error: null, userWallet };
}

export default async function () {
  const userWallet = await getUserWallet();

  if (userWallet.error || !userWallet.userWallet?.publicKey) {
    return <div>No solana wallet found</div>;
  }

  return (
    <div className="container max-w-5xl mx-auto p-2 pt-4 lg:pt-16">
      <Dashboard publicKey={userWallet.userWallet?.publicKey} />
    </div>
  );
}
