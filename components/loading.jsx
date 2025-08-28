import React from "react";

import { Ripple } from "@/components/magicui/ripple";

export default function Loading({ className="" }) {
  return (
    <div className={`${className} fixed z-100 top-0 left-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white/10 backdrop-blur-xl`}>
      <p className="z-10 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter text-white">
        Calma ...
      </p>
      <p className="z-10 whitespace-pre-wrap text-center text-2xl font-medium tracking-tighter text-white">
        Estamos carregando
      </p>
      <Ripple />
    </div>
  );
}