import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jogo da Velha 👵 Multiplayer",
  description: "Jogo da velha multiplayer",
};

export default function RootLayout(props: { children: Readonly<React.ReactNode> }) {

  return (

    <html lang="pt-BR">
      <body className="bg-slate-200 text-center h-dvh flex flex-col">{props.children}</body>
    </html>

  );

}
