import { ArrowLeft } from "lucide-react";

export function Withdraw({ goBack }: { goBack: () => void }) {
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
      <div className="flex items-center justify-center h-60">
        <p className="text-lg text-center">
          Whoa there, adventurer! This feature isn&#39;t unlocked yet. Stay
          tuned for updates!
        </p>
      </div>
    </div>
  );
}
