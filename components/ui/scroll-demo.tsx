"use client"

import React from 'react'
import { ScrollArea } from './scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from './card'

export function ScrollDemo() {
  const longContent = Array.from({ length: 50 }, (_, i) => (
    <div key={i} className="p-4 border-b border-border last:border-b-0">
      <h3 className="font-medium text-foreground">Item {i + 1}</h3>
      <p className="text-sm text-muted-foreground">
        Este é um exemplo de conteúdo longo para demonstrar as diferentes opções de scrollbar.
      </p>
    </div>
  ))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Scrollbar Padrão */}
      <Card>
        <CardHeader>
          <CardTitle>Scrollbar Padrão</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            {longContent}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Scrollbar Customizada */}
      <Card>
        <CardHeader>
          <CardTitle>Scrollbar Customizada</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea variant="custom" className="h-64">
            {longContent}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Scrollbar Fina */}
      <Card>
        <CardHeader>
          <CardTitle>Scrollbar Fina</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea variant="thin" className="h-64">
            {longContent}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
