# FitTracker Pro

Uma aplicação completa de acompanhamento fitness com dashboard interativo, plano de treinos e nutrição.

## 🚀 Deploy no Vercel

Este projeto está configurado para deploy automático no Vercel.

### Opção 1: Deploy Direto via GitHub
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione este repositório
5. O Vercel detectará automaticamente as configurações
6. Clique em "Deploy"

### Opção 2: Deploy via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📱 Funcionalidades

- **Dashboard**: Acompanhamento de progresso, peso atual e dias restantes
- **Treinos**: Planos A, B, C com exercícios e checkbox para marcar conclusão
- **Nutrição**: Plano alimentar completo com dicas de hidratação
- **Interface Moderna**: Design responsivo com gradientes e animações

## 🎯 Objetivos do App

- Meta de peso: 98kg (partindo de 110kg)
- Período: 15 Set 2025 - 15 Dez 2025 (3 meses)
- Acompanhamento diário de progresso

## 🔧 Tecnologias

- React 18 + TypeScript
- Vite (bundler)
- Tailwind CSS (estilização)
- Lucide React (ícones)
- ESLint (qualidade de código)

## 📊 Estrutura do Projeto

```
src/
  ├── components/
  │   └── FitnessDashboard.tsx
  ├── App.tsx
  ├── main.tsx
  └── index.css
```