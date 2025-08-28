import React from "react";

export function ErrorTimeout() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-sm text-gray-500">
        Não fique esperando por muito tempo
      </p>
      <p className="text-sm text-gray-500">
        Erro de Timeout
      </p>
      <a href="/" className="text-sm text-blue-500">
        Voltar para a página inicial
      </a>
    </div>
  );
}