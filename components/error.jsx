import React from "react";
import { Ripple } from "@/components/magicui/rippleRed";

export function Error() {
  return (
    <div className={`fixed z-100 top-0 left-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white/10 backdrop-blur-xl`}>
      <p className="z-10 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter text-white">
        Erro
      </p>
      <p className="z-10 text-center whitespace-pre-wrap text-center text-lg font-medium tracking-tighter text-white">
        Ocorreu um erro ao <br/> carregar os dados
      </p>
      <a href="/" className="text-xs text-center text-blue-500 underline">
        Voltar para a página <br/> principal
      </a>
      <Ripple className={""} />
    </div>
  );
}