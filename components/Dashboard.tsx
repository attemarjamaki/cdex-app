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
  LoaderCircle,
} from "lucide-react";
import { DashboardButton } from "./ui/custom-button";
import { useTokens } from "@/app/api/hooks/route";
import { TokenTable } from "./TokenTable";
import { TokenSwap } from "./TokenSwap";
import { AddFunds } from "./AddFunds";
import { Withdraw } from "./Withdraw";
import { SendCrypto } from "./Send";

type Tab = "tokens" | "send" | "add_funds" | "withdraw" | "swap";

const Dashboard = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const [copied, setCopied] = useState(false);
  const { tokenBalances, loading } = useTokens(publicKey);
  const [activeTab, setActiveTab] = useState<Tab>("tokens");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
  };

  const profilePic = `${session.data?.user?.image}`;

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <LoaderCircle strokeWidth={3} className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <LoaderCircle strokeWidth={3} className="h-10 w-10 animate-spin" />
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
            <div className="text-3xl font-bold mt-1">
              ${tokenBalances?.totalBalance}
            </div>
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
        <DashboardButton onClick={() => setActiveTab("send")}>
          <Send strokeWidth={3} className="mr-2 h-4 w-4" /> Send
        </DashboardButton>
        <DashboardButton onClick={() => setActiveTab("add_funds")}>
          <PlusCircle strokeWidth={3} className="mr-2 h-4 w-4" /> Add Funds
        </DashboardButton>
        <DashboardButton onClick={() => setActiveTab("withdraw")}>
          <ArrowDownToLine strokeWidth={3} className="mr-2 h-4 w-4" /> Withdraw
        </DashboardButton>
        <DashboardButton onClick={() => setActiveTab("swap")}>
          <Shuffle strokeWidth={3} className="mr-2 h-4 w-4" /> Swap
        </DashboardButton>
      </div>
      <div>
        {activeTab === "tokens" && (
          <TokenTable tokens={tokenBalances?.tokens || []} />
        )}
        {activeTab === "send" && (
          <SendCrypto goBack={() => setActiveTab("tokens")} />
        )}
        {activeTab === "add_funds" && (
          <AddFunds goBack={() => setActiveTab("tokens")} />
        )}
        {activeTab === "withdraw" && (
          <Withdraw goBack={() => setActiveTab("tokens")} />
        )}
        {activeTab === "swap" && (
          <TokenSwap
            tokenBalances={tokenBalances}
            publicKey={publicKey}
            goBack={() => setActiveTab("tokens")}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
