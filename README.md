# Portfólio — Pedro Gentil

Portfólio profissional publicado em **[gentilpedro.github.io](https://gentilpedro.github.io)**.

Complementa o currículo com projetos, stack, experiência e contato, em **português e inglês**.

## Destaques

- **Bilíngue (PT-BR / EN)** com troca instantânea de idioma, persistida no navegador
- **Tema claro e escuro**, respeitando a preferência do sistema, sem flash na primeira renderização
- **Integração ao vivo com a API do GitHub** — repositórios, estrelas e seguidores atualizados sozinhos, com cache de 1 hora para preservar o rate limit
- **SEO completo** — Open Graph, Twitter Card, `sitemap.xml`, `robots.txt` e dados estruturados JSON-LD (schema.org/Person)
- **Acessibilidade** — navegação por teclado, `aria-label`, foco visível e suporte a `prefers-reduced-motion`
- **Currículo em PDF** disponível para download direto na página
- Responsivo do celular ao desktop, com folha de estilo de impressão

## Stack

React 19 · TypeScript · Vite · CSS puro com design tokens · GitHub Actions · GitHub Pages

Sem framework de UI e sem dependências de runtime além do React — o bundle final fica em torno de 74 kB gzip.

## Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # serve o build de produção
npm run lint     # análise estática
```

## Estrutura

```
src/
├── data/
│   ├── profile.ts    # currículo: bio, experiências, projetos, cursos, skills
│   └── ui.ts         # strings da interface (PT/EN)
├── hooks/
│   ├── useGitHub.ts  # API do GitHub + cache em localStorage
│   └── useReveal.ts  # animação de entrada e seção ativa no menu
├── components/       # Header, Icon
├── sections/         # Hero, About, Skills, Projects, Experience, Education, Contact
└── index.css         # design tokens e estilos
```

Para atualizar o conteúdo do site, basta editar `src/data/profile.ts` — nenhuma seção tem texto escrito direto no componente.

## Deploy

Todo push na branch `main` dispara o workflow `.github/workflows/deploy.yml`, que roda lint, build e publica no GitHub Pages.

## Contato

[LinkedIn](https://linkedin.com/in/pedro-gentil) · [GitHub](https://github.com/gentilpedro) · pedro.desev@outlook.com
