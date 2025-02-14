import { ArrowLeft } from "lucide-react";

export function SendCrypto({ goBack }: { goBack: () => void }) {
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
          Oops! Looks like you&#39;ve stumbled into a work-in-progress. Check
          back soon!
        </p>
      </div>
    </div>
  );
}
