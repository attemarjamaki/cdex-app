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
      className="bg-orange-300 hover:bg-orange-400 text-black px-6 py-2 rounded-full font-medium  transition-colors duration-200 text-center"
    >
      {children}
    </button>
  );
};

export const GoogleButton = ({
  children,
  onClick,
  prefix,
}: {
  children: React.ReactNode;
  onClick: () => void;
  prefix?: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-300 hover:bg-blue-400 text-black px-6 py-2 rounded-full font-medium  transition-colors duration-200 text-center"
    >
      <div>{prefix}</div>
      <div>{children}</div>
    </button>
  );
};
