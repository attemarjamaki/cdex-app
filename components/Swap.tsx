"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Settings,
  MoveVertical,
  X,
} from "lucide-react";
import Image from "next/image";
import { SUPPORTED_TOKENS, TokenDetails } from "@/lib/tokens";
import { AssetSelector } from "./ui/asset-selector";
import { TokenWithbalance } from "@/app/api/hooks/route";

export default function Swap({
  publicKey,
  tokenBalances,
}: {
  publicKey: string;
  tokenBalances: {
    totalBalance: number;
    tokens: TokenWithbalance[];
  } | null;
}) {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);

  const [amount, setAmount] = useState("");
  const [isAssetSelectorOpen, setIsAssetSelectorOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState({
    symbol: "SOL",
    icon: "black",
  });
  const [selectedReceiveToken, setSelectedReceiveToken] = useState({
    symbol: "USDC",
    icon: "bg-blue-500",
  });

  return (
    <div className="bg-stone-50 rounded-xl p-4 sm:p-6">
      <div className="mx-auto max-w-xl space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Swap Tokens</h1>
            <div className="flex items-center gap-0.5 text-sm text-gray-600">
              Powered by
              <Image
                src={"/icons/jupiter.svg"}
                height={16}
                width={16}
                alt="jupiter"
                className="object-contain"
              />
              <span className="font-semibold">Jupiter</span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="p-4">
              <div className="text-sm text-gray-600">You Pay:</div>
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => setIsAssetSelectorOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors"
                >
                  <Image
                    src={"/icons/solana.svg"}
                    height={24}
                    width={24}
                    alt="Solana"
                    className="mr-0.5 object-contain"
                  />
                  <span className="font-medium">{selectedToken.symbol}</span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-[120px] text-right text-3xl focus:outline-none"
                />
              </div>
              <div className="mt-1 flex justify-between text-sm text-gray-500">
                <span>Current Balance: ~0.0639 {selectedToken.symbol}</span>
                <button className="text-gray-600 hover:text-gray-900">
                  Max
                </button>
              </div>
            </div>

            <div className="relative flex justify-center py-2">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-gray-200" />
              <button className="relative rounded-full border border-gray-200 bg-white p-2">
                <MoveVertical className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="p-4">
              <div className="text-sm text-gray-600">You Receive:</div>
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => setIsAssetSelectorOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors"
                >
                  <Image
                    src={"/icons/usdc.svg"}
                    height={24}
                    width={24}
                    alt="usdc"
                    className="mr-0.5 object-contain"
                  />
                  <span className="font-medium">
                    {selectedReceiveToken.symbol}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>
                <input
                  type="text"
                  readOnly
                  value="0"
                  className="w-[120px] text-right text-3xl text-gray-400 focus:outline-none"
                />
              </div>
              <div className="mt-1 flex justify-between text-sm text-gray-500">
                <span>Current Balance: 0 {selectedReceiveToken.symbol}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
              <ChevronDown className="h-4 w-4" />
              View Swap Details
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Settings className="h-5 w-5" />
            </button>
          </div>

          <div className="flex gap-3">
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button className="flex-1 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600">
              Confirm & Swap
            </button>
          </div>
        </div>
      </div>

      <AssetSelector
        isOpen={isAssetSelectorOpen}
        onClose={() => setIsAssetSelectorOpen(false)}
        onSelect={(token) => {
          setSelectedToken(token);
          setIsAssetSelectorOpen(false);
        }}
        tokens={tokenBalances?.tokens || []}
      />
    </div>
  );
}
