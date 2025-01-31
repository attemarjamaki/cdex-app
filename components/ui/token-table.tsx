import { TokenWithbalance } from "@/app/api/hooks/route";

export function TokenTable({ tokens }: { tokens: TokenWithbalance[] }) {
  return (
    <div className="bg-stone-50 rounded-xl p-4 sm:p-6">
      <h2 className="text-lg font-semibold mb-4">Your Tokens</h2>
      <div className="space-y-4">
        {tokens.map((token) => (
          <div key={token.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center font-semibold">
                <img src={token.image} alt="icon" />
              </div>
              <div>
                <p className="font-semibold">{token.name}</p>
                <p className="text-xs text-neutral-400">
                  1 {token.name} &asymp; ${Number(token.price).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <p className="font-semibold">${token.usdBalance}</p>
              <p className="text-xs text-neutral-400">
                {token.balance} {token.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
