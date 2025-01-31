import { NextRequest, NextResponse } from "next/server";
import { getSupportedTokens, connection } from "@/lib/test";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getAccount } from "@solana/spl-token";

// Base58 check function
function isBase58(str: string): boolean {
  const base58Regex = /^[A-HJ-NP-Za-km-z1-9]*$/;
  return str.length === 44 && base58Regex.test(str);
}

export async function GET(req: NextRequest) {
  console.log("GET function entered");
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  try {
    if (!address || !isBase58(address)) {
      return NextResponse.json(
        { error: "Invalid or missing address" },
        { status: 400 }
      );
    }

    const publicKey = new PublicKey(address);

    const balance = await connection.getBalance(publicKey);
    const solBalance = balance / LAMPORTS_PER_SOL;
    console.log("SOL Balance:", solBalance);

    let tokenAccount = await getAccount(connection, publicKey);
    console.log(tokenAccount);

    const accountInfo = tokenAccount;

    const supportedTokens = await getSupportedTokens();
    console.log("Supported Tokens:", supportedTokens);

    if (!supportedTokens || supportedTokens.length === 0) {
      return NextResponse.json(
        { error: "Failed to fetch or no tokens available" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      solBalance: solBalance,
      supportedTokens: supportedTokens,
      tokenAccount: accountInfo,
    });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
