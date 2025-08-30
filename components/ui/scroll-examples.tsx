"use client"

import React from 'react'
import { ScrollArea } from './scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { Button } from './button'

export function ScrollExamples() {
  // Exemplo de lista de cidades
  const cities = [
    "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza",
    "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre",
    "Belém", "Goiânia", "Guarulhos", "Campinas", "Natal", "Maceió",
    "Teresina", "João Pessoa", "Campo Grande", "Petrópolis"
  ]

  // Exemplo de dados meteorológicos
  const weatherData = Array.from({ length: 48 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    temp: Math.floor(Math.random() * 30) + 10,
    humidity: Math.floor(Math.random() * 40) + 40,
    wind: Math.floor(Math.random() * 20) + 5
  }))

  // Exemplo de notificações
  const notifications = [
    { id: 1, type: 'info', message: 'Temperatura aumentará 5°C amanhã' },
    { id: 2, type: 'warning', message: 'Chuva prevista para o final da tarde' },
    { id: 3, type: 'success', message: 'Qualidade do ar melhorou significativamente' },
    { id: 4, type: 'info', message: 'Vento forte esperado durante a noite' },
    { id: 5, type: 'warning', message: 'Umidade relativa acima de 80%' },
    { id: 6, type: 'success', message: 'Índice UV baixo hoje' },
    { id: 7, type: 'info', message: 'Pressão atmosférica estável' },
    { id: 8, type: 'warning', message: 'Possibilidade de tempestade' }
  ]

  return (
    <div className="space-y-8 p-6">
      {/* Exemplo 1: Lista de cidades com scrollbar fina */}
      <Card>
        <CardHeader>
          <CardTitle>Cidades Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea variant="thin" className="h-32">
            <div className="space-y-2">
              {cities.map((city, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <span className="font-medium">{city}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Exemplo 2: Dados meteorológicos com scrollbar customizada */}
      <Card>
        <CardHeader>
          <CardTitle>Previsão por Hora (48h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea variant="custom" className="h-40">
            <div className="grid grid-cols-1 gap-2">
              {weatherData.map((data, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-card border border-border rounded-lg">
                  <span className="font-mono text-sm">{data.hour}</span>
                  <div className="flex gap-4 text-sm">
                    <span>🌡️ {data.temp}°C</span>
                    <span>💧 {data.humidity}%</span>
                    <span>💨 {data.wind} km/h</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Exemplo 3: Notificações com scrollbar padrão */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 rounded-lg border ${
                  notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                  notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                  'bg-blue-50 border-blue-200 text-blue-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{notification.message}</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                      ✕
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Exemplo 4: Scroll horizontal para gráficos */}
      <Card>
        <CardHeader>
          <CardTitle>Dados por Região (Scroll Horizontal)</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea variant="custom" orientation="horizontal" className="w-full">
            <div className="flex gap-4 min-w-max">
              {['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'].map((region, index) => (
                <div key={index} className="w-48 p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">{region}</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>Temperatura: {Math.floor(Math.random() * 15) + 20}°C</div>
                    <div>Umidade: {Math.floor(Math.random() * 30) + 50}%</div>
                    <div>Vento: {Math.floor(Math.random() * 15) + 5} km/h</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
