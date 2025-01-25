"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Clipboard,
  Send,
  PlusCircle,
  ArrowDownToLine,
  Shuffle,
} from "lucide-react";

export function Dashboard() {
  const [publicKey] = useState("0x1234...5678");
  const [balance] = useState("1,234.56");
  const [tokens] = useState([
    { name: "Bitcoin", symbol: "BTC", balance: "0.5" },
    { name: "Ethereum", symbol: "ETH", balance: "2.3" },
    { name: "Cardano", symbol: "ADA", balance: "100" },
    { name: "Polkadot", symbol: "DOT", balance: "50" },
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
    // maybe add later something to show that it was copied to clipboard
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-medium">
              Welcome back, John Doe
            </CardTitle>
            <div className="text-2xl font-bold mt-2">${balance}</div>
            <p className="text-xs text-muted-foreground">Account Balance</p>
          </div>
          <div className="flex flex-col items-end">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex items-center mt-2">
              <Input value={publicKey} readOnly className="w-32 text-xs" />
              <Button size="icon" onClick={copyToClipboard} className="ml-2">
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Button>
          <Send className="mr-2 h-4 w-4" /> Send
        </Button>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Funds
        </Button>
        <Button>
          <ArrowDownToLine className="mr-2 h-4 w-4" /> Withdraw
        </Button>
        <Button>
          <Shuffle className="mr-2 h-4 w-4" /> Swap
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tokens.map((token) => (
              <div
                key={token.symbol}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {token.symbol[0]}
                  </div>
                  <div>
                    <p className="font-medium">{token.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {token.symbol}
                    </p>
                  </div>
                </div>
                <p className="font-medium">{token.balance}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
