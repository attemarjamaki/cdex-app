"use client";

export const PrimaryButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-950 hover:bg-neutral-700 text-neutral-100 py-3 px-4 rounded-xl font-semibold  transition-colors duration-200 text-center text-sm"
    >
      {children}
    </button>
  );
};

export const GoogleButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-4 py-3 rounded-full font-semibold transition-colors duration-200"
    >
      {children}
    </button>
  );
};

export const DashboardButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className="flex items-center justify-center bg-neutral-950 hover:bg-neutral-700 text-neutral-100 py-3 px-4 rounded-xl font-semibold  transition-colors duration-200 text-center text-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const SwapButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600"
    >
      {children}
    </button>
  );
};

export const CancelButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600"
    >
      {children}
    </button>
  );
};
