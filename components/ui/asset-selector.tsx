"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance?: string;
}

const tokens: Token[] = [
  { symbol: "SOL", name: "Solana", icon: "bg-black", balance: "0.0639" },
  { symbol: "USDC", name: "USD Coin", icon: "bg-blue-500", balance: "23.40" },
  { symbol: "USDT", name: "Tether", icon: "bg-green-500", balance: "56.38" },
];

interface AssetSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
}

export function AssetSelector({
  isOpen,
  onClose,
  onSelect,
}: AssetSelectorProps) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select Token</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search token name or paste address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 focus:border-gray-300 focus:outline-none focus:ring-0"
          />
        </div>

        <div className="max-h-[400px] space-y-2 overflow-y-auto">
          {filteredTokens.map((token) => (
            <button
              key={token.symbol}
              onClick={() => onSelect(token)}
              className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full ${token.icon}`} />
                <div className="text-left">
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-gray-500">{token.name}</div>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                {token.balance}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
