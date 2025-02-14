"use client";
import { ReactNode, useEffect, useState } from "react";
import { SUPPORTED_TOKENS, TokenDetails } from "../lib/tokens";
import { TokenWithbalance } from "@/app/api/hooks/route";
import { SwapButton } from "./ui/custom-button";
import axios from "axios";
import Image from "next/image";
import { X, ChevronDown, ArrowDownUp, ArrowLeft } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export function TokenSwap({
  publicKey,
  goBack,
  tokenBalances,
}: {
  publicKey: string;
  goBack: () => void;
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
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    // Reset quoteAmount to '0' if baseAmount is falsy (empty string or undefined)
    if (!baseAmount) {
      setQuoteAmount("0");
      setQuoteResponse(null);
      setButtonDisabled(true); // Optionally disable the button when no base amount
      return;
    }

    setFetchingQuote(true);
    axios
      .get(
        `https://api.jup.ag/swap/v1/quote?inputMint=${
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
        setButtonDisabled(false); // Enable button when a valid quote is received
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        setFetchingQuote(false);
        setQuoteAmount("0"); // Handle errors by setting quoteAmount back to 0
        setQuoteResponse(null);
        setButtonDisabled(true); // Disable button on error
      });
  }, [baseAsset, quoteAsset, baseAmount]);

  return (
    <div className="bg-stone-50 rounded-xl p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <button
          onClick={goBack}
          className="text-gray-600 hover:text-gray-900 pb-2 md:p-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="mx-auto max-w-xl">
        <div className="space-y-4">
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
            />

            {/*center icon */}
            <div className="relative flex justify-center py-2">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-gray-200" />
              <button
                onClick={() => {
                  let baseAssetTemp = baseAsset;
                  setBaseAsset(quoteAsset);
                  setQuoteAsset(baseAssetTemp);
                }}
                className="relative rounded-full border border-gray-200 bg-white p-2"
              >
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

          <div className="w-full">
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
              disabled={buttonDisabled}
            >
              Swap
            </SwapButton>
          </div>
        </div>
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
        <div className="mt-2 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsAssetSelectorOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 hover:bg-gray-200 transition-colors shrink-0"
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
          {inputLoading ? (
            <Skeleton className="h-9 w-20" />
          ) : (
            <input
              disabled={inputDisabled}
              onChange={(e) => {
                onAmountChange?.(e.target.value);
              }}
              placeholder="0"
              type="text"
              dir="rtl"
              value={inputLoading ? "Loading" : amount}
              className="w-full text-right text-3xl text-gray-400 focus:outline-none disabled:bg-white"
            />
          )}
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
            <button className="text-gray-600">Max</button>
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
