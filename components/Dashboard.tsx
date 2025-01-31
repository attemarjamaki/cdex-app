"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Clipboard,
  Send,
  PlusCircle,
  ArrowDownToLine,
  Shuffle,
  Check,
} from "lucide-react";
import { DashboardButton } from "./ui/custom-button";
//import { useTokens } from "@/app/api/hooks/route";

const Dashboard = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const [balance] = useState("1,234.56");
  const [tokens] = useState([
    { name: "Bitcoin", symbol: "BTC", balance: "0.5" },
    { name: "Ethereum", symbol: "ETH", balance: "2.3" },
    { name: "Cardano", symbol: "ADA", balance: "100" },
    { name: "Polkadot", symbol: "DOT", balance: "50" },
  ]);
  const [copied, setCopied] = useState(false);
  //const { tokenBalances, loading } = useTokens(publicKey);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
  };

  const profilePic = `${session.data?.user?.image}`;
  /*
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
*/
  if (session.status === "loading") {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-stone-50 rounded-xl p-4 sm:p-6">
        <div className="flex flex-row justify-between">
          <div>
            <h2 className="text-lg font-medium">
              Welcome back, {session.data?.user?.name}
            </h2>
            <div className="text-3xl font-bold mt-1">${balance}</div>
            <p className="text-xs font-semibold text-gray-500">
              Account Balance
            </p>
          </div>
          <div className="flex flex-col items-end">
            <img
              src={profilePic}
              alt="profilepic"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex items-center mt-3">
              <span className="text-sm font-medium">
                {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
              </span>
              <button
                onClick={copyToClipboard}
                className="ml-2 p-1 bg-neutral-900 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <Clipboard className="h-4 w-4 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        <DashboardButton>
          <Send strokeWidth={3} className="mr-2 h-4 w-4" /> Send
        </DashboardButton>
        <DashboardButton>
          <PlusCircle strokeWidth={3} className="mr-2 h-4 w-4" /> Add Funds
        </DashboardButton>
        <DashboardButton>
          <ArrowDownToLine strokeWidth={3} className="mr-2 h-4 w-4" /> Withdraw
        </DashboardButton>
        <DashboardButton>
          <Shuffle strokeWidth={3} className="mr-2 h-4 w-4" /> Swap
        </DashboardButton>
      </div>

      <div className="bg-stone-50 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold mb-4">Your Tokens</h2>
        <div className="space-y-4">
          {tokens.map((token) => (
            <div
              key={token.symbol}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                  {token.symbol[0]}
                </div>
                <div>
                  <p className="font-medium">{token.name}</p>
                  <p className="text-sm text-gray-500">{token.symbol}</p>
                </div>
              </div>
              <p className="font-medium">{token.balance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
