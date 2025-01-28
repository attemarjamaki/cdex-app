import Dashboard from "@/components/Dashboard";
import db from "@/app/db";
import { getServerSession } from "next-auth";

async function getbalance() {
  const session = await getServerSession();

  db.solWallet.findFirst({
    where: {},
  });
}

export default async function () {
  return (
    <div className="container max-w-5xl mx-auto p-2 pt-4 lg:pt-16">
      <Dashboard />
    </div>
  );
}
