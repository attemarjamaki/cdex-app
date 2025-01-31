import axios from "axios";
import { Connection } from "@solana/web3.js";

let LAST_UPDATED: number | null = null;
let prices: {
  [key: string]: {
    price: string;
  };
} = {};

const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000; // every 60s

export const SUPPORTED_TOKENS: {
  name: string;
  id: string;
  native: boolean;
  price: string;
}[] = [
  {
    name: "SOL",
    id: "So11111111111111111111111111111111111111112",
    native: true,
    price: "200",
  },
  {
    name: "USDC",
    id: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: "1",
  },
  {
    name: "USDT",
    id: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: "1",
  },
];

export const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/Gd7ddjyel4yl1ny0-91DsyRHFyZMJFvN"
);

export async function getSupportedTokens() {
  console.log("getSupportedTokens function called");
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL
  ) {
    try {
      const response = await axios.get(
        "https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v,Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
      );
      console.log("API Response:", response.data);
      prices = response.data.data;
      console.log("Updated prices:", prices);
      LAST_UPDATED = new Date().getTime();
    } catch (e) {
      console.log(e);
    }
  }
  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    price: prices[s.id] ? prices[s.id].price : s.price,
  }));
}

// getSupportedTokens();
