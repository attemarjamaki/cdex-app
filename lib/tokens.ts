export interface TokenDetails {
  name: string;
  id: string;
  native: boolean;
  price: string;
  image: string;
  decimals: number;
}

export const SUPPORTED_TOKENS: TokenDetails[] = [
  {
    name: "SOL",
    id: "So11111111111111111111111111111111111111112",
    native: true,
    price: "180",
    image: "/icons/solana.svg",
    decimals: 9,
  },
  {
    name: "USDC",
    id: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1",
    image: "/icons/usdc.svg",
    decimals: 6,
  },
  {
    name: "USDT",
    id: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1",
    image: "/icons/usdt.svg",
    decimals: 6,
  },
];
