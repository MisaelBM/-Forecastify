# Estilos de Scroll Personalizados

Este projeto agora inclui estilos de scroll personalizados que combinam perfeitamente com o design existente.

## Características

- **Scrollbars responsivas** que se adaptam ao tema claro/escuro
- **Múltiplas variantes** para diferentes contextos
- **Animações suaves** com transições CSS
- **Compatibilidade cross-browser** (Webkit e Firefox)
- **Integração com o sistema de design** existente

## Variantes Disponíveis

### 1. Scrollbar Padrão (Default)
- Largura: 12px
- Bordas arredondadas
- Cores baseadas no tema atual
- Hover effects suaves

### 2. Scrollbar Customizada (Custom)
- Largura: 8px
- Design mais discreto
- Ideal para cards e componentes menores
- Classe: `custom-scrollbar`

### 3. Scrollbar Fina (Thin)
- Largura: 6px
- Design minimalista
- Perfeita para interfaces compactas
- Classe: `thin-scrollbar`

## Como Usar

### Scrollbar Global
As scrollbars globais são aplicadas automaticamente a toda a página e elementos com scroll nativo.

### Componente ScrollArea
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

## Exemplo de Uso

```tsx
import { ScrollDemo } from '@/components/ui/scroll-demo'

// Mostra todas as variantes de scrollbar
<ScrollDemo />
```

## Cores e Temas

### Tema Claro
- **Track**: `var(--muted)` - Cinza claro
- **Thumb**: `var(--muted-foreground)` - Cinza médio
- **Hover**: `var(--foreground)` - Preto

### Tema Escuro
- **Track**: `var(--muted)` - Cinza escuro
- **Thumb**: `var(--muted-foreground)` - Cinza claro
- **Hover**: `var(--foreground)` - Branco

## Compatibilidade

- ✅ Chrome/Edge (Webkit)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Personalização

Para personalizar ainda mais, você pode sobrescrever as variáveis CSS:

```css
:root {
  --scrollbar-width: 12px;
  --scrollbar-radius: 8px;
  --scrollbar-transition: 0.2s ease;
}
```

## Animações

- **Transições suaves** em hover
- **Scroll behavior smooth** para a página
- **Animações de entrada** para elementos
- **Transições de tema** automáticas
