# AeroHybrid Edu - Site de Vendas de Motores Híbridos Educacionais

Este é um site completo e responsivo desenvolvido em **HTML5**, **CSS3** e **JavaScript Vanilla (puro)** para a apresentação, catálogo e orçamento de motores foguete híbridos didáticos e seus insumos.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estruturação acessível e otimizada para SEO.
- **CSS3 Moderno**: Design Responsivo, Flexbox/Grid Layout, Variáveis CSS, Efeitos Aeroespaciais/Futuristas (Glassmorphism e Glow).
- **JavaScript Pure (Vanilla)**:
  - Gerenciamento de Estado do Carrinho.
  - Persistência com `localStorage`.
  - Filtro interativo por categorias de produtos.
  - Modal de detalhes técnicos dos motores.
  - Geração dinâmica de mensagens formatadas para **WhatsApp** (`https://wa.me/`) e **E-mail** (`mailto:`).

---

## 🚀 Como Executar o Projeto

1. Faça o download ou descompactação da pasta do projeto.
2. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, Safari, Brave).
3. Não é necessário instalar nenhuma dependência ou servidor de backend — funciona 100% no navegador!

---

## ⚙️ Como Personalizar Seus Dados de Contato

Para alterar o número de WhatsApp ou o e-mail de destino que receberão os orçamentos:

1. Abra o arquivo `script.js`.
2. No topo do arquivo, altere o objeto `CONFIG`:

```javascript
const CONFIG = {
    WHATSAPP_NUMBER: "5598988887777", // Insira seu número com DDD (Apenas números)
    SELLER_EMAIL: "contato@aerohybridedu.com.br" // Insira seu e-mail comercial
};
```

---

## 📦 Como Personalizar Produtos e Preços

No arquivo `script.js`, edite o array `products`. Você pode adicionar, remover ou alterar o título, preço, descrição, emoji e especificações técnicas de cada motor ou acessório.

---

## 📄 Estrutura de Arquivos

```
/
├── index.html   # Estrutura principal da aplicação
├── styles.css   # Estilização responsiva e tema aeroespacial
├── script.js   # Lógica do carrinho, catálogo e checkout
└── README.md    # Documentação e guia de uso
```
