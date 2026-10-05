# EcoModa Instituto — e-commerce de moda sustentável

Projeto acadêmico baseado no Estudo de Caso 4: Instituto EcoModa Sustentável.

## 1. Problema

A EcoModa vende peças únicas em feiras, showroom e principalmente por conversas no Instagram. O processo manual exige respostas sobre disponibilidade, cálculo de frete e envio de dados para PIX. Isso aumenta o trabalho administrativo e pode fazer compradores desistirem.

## 2. Solução escolhida

Foi escolhido um **site e-commerce responsivo** porque a dor principal está na organização da vitrine e do processo de compra. A interface também transforma o diferencial da marca — upcycling + impacto social — em informação visível e rastreável.

Funcionalidades do protótipo:
- catálogo de peças únicas;
- filtro por categoria e busca;
- carrinho lateral com quantidade e subtotal;
- persistência do carrinho em `localStorage`;
- ficha de rastreabilidade de cada peça;
- apresentação das artesãs;
- seção institucional e de impacto;
- layout responsivo para desktop e celular.

## 3. Stack

- React
- Vite
- JavaScript
- CSS
- Lucide React para ícones

## 4. Executar localmente

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite.

Para produção:

```bash
npm run build
npm run preview
```

## 5. Estrutura

```text
ecomoda-instituto/
├── public/
├── src/
│   ├── main.jsx
│   └── styles.css
├── .gitignore
├── index.html
├── LICENSE
├── package.json
└── README.md
```

## 6. Decisões de UX

### Rastreabilidade
O estudo de caso destaca como oportunidade permitir que o comprador saiba qual artesã produziu a peça e qual impacto ecológico foi gerado. Por isso, cada produto possui artesã, material e quantidade reaproveitada.

### Peça única
Como os produtos são exclusivos, a interface destaca "Peça única" e evita uma lógica de estoque em massa.

### Conversão
O botão "Adicionar" abre o carrinho imediatamente. Isso reduz a dependência de conversas privadas e torna o caminho de compra mais direto.

## 7. Próximas evoluções

Este é um protótipo de front-end. Para uma versão real, eu adicionaria:
1. backend e banco de dados;
2. estoque real;
3. cálculo de frete;
4. checkout/PIX seguro;
5. painel administrativo para as assistentes;
6. autenticação;
7. cadastro real de artesãs e métricas de impacto;
8. integração de analytics.

## 8. Segurança

Nenhuma senha, token ou chave de API deve ser colocada no código. Variáveis sensíveis devem ficar em `.env` e ser ignoradas pelo Git.
