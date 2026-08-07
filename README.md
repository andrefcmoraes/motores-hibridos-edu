# EasyRockets — Motores Híbridos Educacionais

Site completo em HTML5 + CSS3 + JavaScript puro, com visual inspirado no site da SpaceX (fundo preto, tipografia condensada em caixa alta, layout em grade com divisorias finas e uma unica cor de destaque) aplicado ao catalogo de motores hibridos e insumos.

## O que mudou nesta versao

- Identidade visual estilo SpaceX: preto absoluto, tipografia Space Grotesk (titulos) + Inter (texto) + Roboto Mono (dados tecnicos), grade de recursos com divisorias, barra de telemetria no heroi, cantos retos.
- Imagens proprias em arquivos separados: cada produto agora usa uma ilustracao tecnica em SVG dedicada, dentro da pasta images/ (product-1.svg a product-7.svg), no lugar dos emojis. Basta trocar o arquivo por uma foto real do produto (mesmo nome) para atualizar o catalogo.
- Plano de fundo personalizavel: botao flutuante no canto inferior direito abre um painel para escolher entre 3 cenarios predefinidos (hero-bg-1.svg, hero-bg-2.svg, hero-bg-3.svg) ou enviar uma imagem propria do computador. A escolha fica salva no navegador (localStorage).

## Estrutura de Arquivos

```
/
├── index.html
├── styles.css
├── script.js
├── images/
│   ├── product-1.svg ... product-7.svg
│   └── hero-bg-1.svg, hero-bg-2.svg, hero-bg-3.svg
└── README.md
```

## Como Executar

Basta abrir index.html em qualquer navegador moderno. Nao requer servidor nem instalacao.

## Personalizacoes

- Produtos e precos: edite o array products em script.js. O campo image aponta para o arquivo dentro de images/.
- Contato (WhatsApp/E-mail): edite o objeto CONFIG no topo de script.js.
- Plano de fundo padrao: altere DEFAULT_BG em script.js ou o atributo style="--hero-bg:..." da secao .hero em index.html.
