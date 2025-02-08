"use client";
import { ReactNode, useEffect, useState } from "react";
import { SUPPORTED_TOKENS, TokenDetails } from "../lib/tokens";
import { TokenWithbalance } from "@/app/api/hooks/route";
import { PrimaryButton, SwapButton } from "./ui/custom-button";
import axios from "axios";
import Image from "next/image";
import { X, ChevronDown, ArrowDownUp, Settings } from "lucide-react";

export function TokenSwap({
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
  const [baseAmount, setBaseAmount] = useState<string>();
  const [quoteAmount, setQuoteAmount] = useState<string>();
  const [fetchingQuote, setFetchingQuote] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState(null);

  useEffect(() => {
    if (!baseAmount) {
      return;
    }
    setFetchingQuote(true);
    axios
      .get(
        `https://quote-api.jup.ag/v6/quote?inputMint=${
          baseAsset.id
        }&outputMint=${quoteAsset.id}&amount=${
          Number(baseAmount) * 10 ** baseAsset.decimals
        }&slippageBps=50`
      )
      .then((res) => {
        setQuoteAmount(
          (
            Number(res.data.outAmount) / Number(10 ** quoteAsset.decimals)
          ).toString()
        );
        setFetchingQuote(false);
        setQuoteResponse(res.data);
      });
  }, [baseAsset, quoteAsset, baseAmount]);

  return (
    <div className="bg-stone-50 rounded-xl p-4 sm:p-6">
      <div className="mx-auto max-w-xl space-y-4">
        <div className="space-y-2">
          {/*header*/}
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
            {/* swap content top*/}
            <SwapInputRow
              amount={baseAmount}
              onAmountChange={(value: string) => {
                setBaseAmount(value);
              }}
              onSelect={(asset) => {
                setBaseAsset(asset);
              }}
              selectedToken={baseAsset}
              tokenBalances={tokenBalances}
              title={"You Pay:"}
              topBorderEnabled={true}
              bottomBorderEnabled={false}
              subtitle={
                <div className="text-slate-500 pt-1 text-sm pl-1 flex">
                  <div className="font-normal pr-1">Current Balance:</div>
                  <div className="font-semibold">
                    {
                      tokenBalances?.tokens.find(
                        (x) => x.name === baseAsset.name
                      )?.balance
                    }{" "}
                    {baseAsset.name}
                  </div>
                </div>
              }
            />

            {/*center icon */}
            <div className="relative flex justify-center py-2">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-gray-200" />
              <button className="relative rounded-full border border-gray-200 bg-white p-2">
                <ArrowDownUp className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/*swap content below */}
            <SwapInputRow
              inputLoading={fetchingQuote}
              inputDisabled={true}
              amount={quoteAmount}
              onSelect={(asset) => {
                setQuoteAsset(asset);
              }}
              selectedToken={quoteAsset}
              title={"You Receive:"}
              topBorderEnabled={false}
              bottomBorderEnabled={true}
              tokenBalances={tokenBalances}
            />
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
            <SwapButton
              onClick={async () => {
                // trigger swap
                try {
                  const res = await axios.post("/api/swap", {
                    quoteResponse,
                  });
                  if (res.data.txnId) {
                    alert("Swap done!");
                  }
                } catch (e) {
                  alert("Error while sending a txn");
                }
              }}
            >
              Confirm & Swap
            </SwapButton>
          </div>
        </div>
        {/*header*/}
      </div>
    </div>
  );
}

function SwapInputRow({
  onSelect,
  amount,
  onAmountChange,
  selectedToken,
  title,
  subtitle,
  topBorderEnabled,
  bottomBorderEnabled,
  inputDisabled,
  inputLoading,
  tokenBalances,
}: {
  onSelect: (asset: TokenDetails) => void;
  selectedToken: TokenDetails;
  title: string;
  subtitle?: ReactNode;
  topBorderEnabled: boolean;
  bottomBorderEnabled: boolean;
  amount?: string;
  onAmountChange?: (value: string) => void;
  inputDisabled?: boolean;
  inputLoading?: boolean;
  tokenBalances: {
    totalBalance: number;
    tokens: TokenWithbalance[];
  } | null;
}) {
  const [isAssetSelectorOpen, setIsAssetSelectorOpen] = useState(false);
  return (
    <>
      <div className="p-4">
        <div className="text-sm text-gray-600">{title}</div>
        <div className="mt-2 flex items-center justify-between">
          <button
            onClick={() => setIsAssetSelectorOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors"
          >
            <Image
              src={selectedToken.image}
              height={24}
              width={24}
              alt="Solana"
              className="mr-0.5 object-contain"
            />
            <span className="font-medium">{selectedToken.name}</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>
          <input
            disabled={inputDisabled}
            onChange={(e) => {
              onAmountChange?.(e.target.value);
            }}
            placeholder="0"
            type="text"
            dir="rtl"
            value={inputLoading ? "Loading" : amount}
            className="w-[240px] text-right text-3xl text-gray-400 focus:outline-none disabled:bg-white"
          />
        </div>
        <div className="mt-1 flex justify-between text-sm text-gray-500">
          <span>
            Current Balance &sim;{" "}
            {
              tokenBalances?.tokens.find((x) => x.name === selectedToken.name)
                ?.balance
            }{" "}
            {selectedToken.name}
          </span>
          {inputDisabled ? null : (
            <button className="text-gray-600 ">Max</button>
          )}
        </div>
      </div>
      <AssetSelector
        selectedToken={selectedToken}
        onSelect={onSelect}
        isOpen={isAssetSelectorOpen}
        onClose={() => setIsAssetSelectorOpen(false)}
        tokenBalances={tokenBalances}
      />
    </>
  );
}

function AssetSelector({
  selectedToken,
  onSelect,
  isOpen,
  onClose,
  tokenBalances,
}: {
  selectedToken: TokenDetails;
  onSelect: (token: TokenDetails) => void;
  isOpen: boolean;
  onClose: () => void;
  tokenBalances: {
    totalBalance: number;
    tokens: TokenWithbalance[];
  } | null;
}) {
  if (!isOpen) return null;

  const handleSelectAndClose = (token: TokenDetails) => {
    onSelect(token);
    onClose();
  };

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

        <div className="max-h-[400px] space-y-2 overflow-y-auto">
          {SUPPORTED_TOKENS.map((token) => (
            <button
              key={token.id}
              onClick={() => handleSelectAndClose(token)}
              className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={token.image}
                  height={24}
                  width={24}
                  alt="Solana"
                  className="mr-0.5 object-contain"
                />
                <div className="text-left">
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-gray-500">{token.name}</div>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                {
                  tokenBalances?.tokens.find((x) => x.name === token.name)
                    ?.balance
                }
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
