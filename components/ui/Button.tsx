"use client";

import Image from "next/image";

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
      className="bg-neutral-950 hover:bg-neutral-700 text-neutral-100 py-3 px-4 rounded-xl font-semibold  transition-colors duration-200 text-center"
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
