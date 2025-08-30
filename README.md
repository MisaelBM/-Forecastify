# Forecastfy 🌤️

Uma aplicação moderna de previsão do tempo desenvolvida com Next.js, oferecendo uma experiência visual rica e responsiva para acompanhar as condições meteorológicas.

## ✨ Características

- **Interface Moderna**: Design limpo e intuitivo com componentes UI personalizados
- **Tema Responsivo**: Suporte para tema claro e escuro
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Scrollbars Personalizadas**: Estilos de scroll que combinam com o design do projeto
- **Componentes Reutilizáveis**: Sistema de componentes modulares e flexíveis
- **Responsivo**: Otimizado para todos os tamanhos de tela

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd forecastfy
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 🎨 Estilos de Scroll Personalizados

O projeto inclui um sistema completo de estilos de scroll que se adapta automaticamente ao tema atual:

### Variantes Disponíveis

- **Padrão**: Scrollbar clássica com 12px de largura
- **Customizada**: Versão discreta com 8px de largura
- **Fina**: Design minimalista com 6px de largura

### Como Usar

```tsx
import { ScrollArea } from '@/components/ui/scroll-area'

// Scrollbar padrão
<ScrollArea className="h-64">
  {/* Conteúdo longo */}
</ScrollArea>

// Scrollbar customizada
<ScrollArea variant="custom" className="h-64">
  {/* Conteúdo longo */}
</ScrollArea>

// Scrollbar fina
<ScrollArea variant="thin" className="h-64">
  {/* Conteúdo longo */}
</ScrollArea>

// Scroll horizontal
<ScrollArea variant="custom" orientation="horizontal">
  {/* Conteúdo largo */}
</ScrollArea>
```

### Classes CSS Diretas

```tsx
// Para elementos com scroll nativo
<div className="custom-scrollbar h-64 overflow-y-auto">
  {/* Conteúdo */}
</div>

<div className="thin-scrollbar h-64 overflow-y-auto">
  {/* Conteúdo */}
</div>
```

## 🏗️ Estrutura do Projeto

```
forecastfy/
├── app/                    # Páginas e layout da aplicação
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Button, Card, etc.)
│   ├── magicui/          # Componentes de animação
│   └── ...               # Componentes específicos do projeto
├── hooks/                 # Hooks personalizados
├── lib/                   # Utilitários e configurações
└── public/                # Assets estáticos
```

## 🎯 Componentes Principais

- **WeatherCard**: Card base para informações meteorológicas
- **CurrentWeatherDisplay**: Exibição do clima atual
- **DailyWeatherDisplay**: Previsão diária com scroll horizontal
- **HourlyWeatherDisplay**: Gráficos de temperatura por hora
- **AirQualityDisplay**: Indicadores de qualidade do ar
- **SearchBox**: Busca de localizações

## 🎨 Sistema de Design

- **Cores**: Baseado em variáveis CSS com suporte a tema claro/escuro
- **Tipografia**: Fonte personalizada "Love Ya Like A Sister"
- **Espaçamento**: Sistema consistente de espaçamentos
- **Bordas**: Bordas arredondadas e sombras sutis
- **Animações**: Transições suaves e efeitos de hover

## 📱 Responsividade

- Design mobile-first
- Grid responsivo para diferentes tamanhos de tela
- Scrollbars adaptativas para dispositivos móveis
- Componentes que se ajustam automaticamente

## 🔧 Tecnologias

- **Next.js 14**: Framework React com App Router
- **Tailwind CSS**: Framework CSS utilitário
- **Radix UI**: Componentes acessíveis e customizáveis
- **TypeScript**: Tipagem estática para JavaScript
- **Framer Motion**: Animações e transições

## 📚 Documentação Adicional

- [Estilos de Scroll](./SCROLL_STYLES.md) - Guia completo dos estilos de scroll
- [Componentes UI](./components/ui/) - Biblioteca de componentes base

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter um pull request.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido com ❤️ para uma experiência meteorológica mais bonita e funcional.
