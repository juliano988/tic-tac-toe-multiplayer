import type { Metadata } from "next";
import "./globals.scss";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Jogo da Velha 👵 Multiplayer",
  description: "Jogo da velha multiplayer",
};

export default function RootLayout(props: { children: Readonly<React.ReactNode> }) {

  return (

    <html lang="pt-BR">
      <body className="bg-slate-200 text-center h-dvh flex flex-col">{
        // Suspense was necessary to avoid the error:
        // ⨯ useSearchParams() should be wrapped in a suspense boundary at page "/". Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
        <Suspense>
          {props.children}
        </Suspense>
      }</body>
    </html>

  );

}
