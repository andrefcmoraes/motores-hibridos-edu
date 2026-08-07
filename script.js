// Configurações Globais de Contato (Altere aqui para seus dados reais)
const CONFIG = {
    WHATSAPP_NUMBER: "5598984021920", // Formato: DDI + DDD + Número (apenas dígitos)
    SELLER_EMAIL: "andrefcmoraes@gmail.com"
};

// Base de Dados dos Produtos
// "image" aponta para um arquivo separado dentro de /images
const products = [
    {
        id: 1,
        title: "Kit Motor Híbrido Edu 100N",
        category: "motores",
        price: 1850.00,
        image: "images/product-1.svg",
        badge: "Bancada Didática",
        description: "Motor híbrido didático de 100N de empuxo médio, projetado para aulas laboratoriais e demonstrações práticas de propulsão.",
        specs: {
            impulse: "350 N.s",
            thrust: "100 N",
            propellants: "PMMA + O₂ Gasoso",
            burnTime: "3.5 segundos",
            casing: "Alumínio Aeronáutico 6061-T6"
        }
    },
    {
        id: 2,
        title: "Kit Motor Híbrido Pro 500N Bench Test",
        category: "motores",
        price: 4200.00,
        image: "images/product-2.svg",
        badge: "Alta Performance",
        description: "Sistema avançado com câmara reforçada, servoválvula eletrônica e suporte para bancada de testes de universidades e equipes de minifoguetes.",
        specs: {
            impulse: "1750 N.s",
            thrust: "500 N",
            propellants: "ABS/PMMA + N₂O ou O₂",
            burnTime: "4.0 segundos",
            casing: "Anodizado 7075-T6 com Tobera de Grafite"
        }
    },
    {
        id: 3,
        title: "Motor Transparente PMMA Demo 50N",
        category: "motores",
        price: 1290.00,
        image: "images/product-3.svg",
        badge: "Visualização Total",
        description: "Câmara de combustão em acrílico de alta resistência. Permite a visualização ao vivo do processo de regressão do grão e chama interna.",
        specs: {
            impulse: "150 N.s",
            thrust: "50 N",
            propellants: "Acrílico Transparente + O₂",
            burnTime: "3.0 segundos",
            casing: "Cilindro Acrílico PMMA Reforçado"
        }
    },
    {
        id: 4,
        title: "Refil Grão PMMA CNC (Pacote c/ 5 unid.)",
        category: "insumos",
        price: 220.00,
        image: "images/product-4.svg",
        badge: "Combustível Sólido",
        description: "Grãos de combustível sólido em Acrílico (PMMA) usinados em CNC com canal de regressão otimizado.",
        specs: {
            diameter: "38 mm",
            length: "150 mm",
            core: "Circular Estriado",
            material: "Acrílico de Alta Pureza"
        }
    },
    {
        id: 5,
        title: "Refil Grão ABS Star-Grain (Pacote c/ 5 unid.)",
        category: "insumos",
        price: 195.00,
        image: "images/product-5.svg",
        badge: "Geometria Estrelada",
        description: "Grãos impressos em 3D ABS de alta densidade com núcleo em formato de estrela para maior área de regressão inicial.",
        specs: {
            diameter: "38 mm",
            length: "150 mm",
            core: "Geometria Estrela (Star-Grain)",
            material: "ABS Industrial"
        }
    },
    {
        id: 6,
        title: "Bancada & Sistema de Telemetria ESP32",
        category: "eletronica",
        price: 890.00,
        image: "images/product-6.svg",
        badge: "Eletrônica & IoT",
        description: "Módulo eletrônico completo para aquisição de dados de empuxo (célula de carga), pressão da câmara e disparo remoto via Wi-Fi.",
        specs: {
            mcu: "ESP32 Dual Core",
            sampling: "80Hz / 10-bit ADC",
            relays: "2x Relés 10A para Válvula e Ignição",
            interface: "Painel Web em Tempo Real"
        }
    },
    {
        id: 7,
        title: "Ignitor Plasma & Pavio Elétrico (10 unid.)",
        category: "eletronica",
        price: 140.00,
        image: "images/product-7.svg",
        badge: "Ignição Segura",
        description: "Iniciadores elétricos pirotécnicos de baixa corrente para acendimento confiável do grão em ambiente de teste.",
        specs: {
            current: "1.5A em 12V",
            resistance: "1.8 a 2.2 Ohms",
            cableLength: "100 cm",
            type: "Pavio E-Match"
        }
    }
];

// Estado da Aplicação (Carrinho de Compras)
let cart = JSON.parse(localStorage.getItem('aero_hybrid_cart')) || [];

// Elementos do DOM
const navbar = document.getElementById('navbar');
const productsGrid = document.getElementById('products-grid');
const cartCountEl = document.getElementById('cart-count');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPriceEl = document.getElementById('cart-total-price');
const filterBtns = document.querySelectorAll('.filter-btn');
const productModal = document.getElementById('product-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalBody = document.getElementById('modal-body');

// Botões de Ação do Checkout
const btnWhatsApp = document.getElementById('btn-whatsapp');
const btnEmail = document.getElementById('btn-email');

// Personalizador de Plano de Fundo
const heroSection = document.getElementById('hero-section');
const bgToggleBtn = document.getElementById('bg-toggle-btn');
const bgPanel = document.getElementById('bg-panel');
const bgPanelClose = document.getElementById('bg-panel-close');
const bgPresetBtns = document.querySelectorAll('.bg-preset');
const bgUploadInput = document.getElementById('bg-upload-input');
const bgResetBtn = document.getElementById('bg-reset-btn');
const DEFAULT_BG = "images/hero-bg-1.svg";
const BG_STORAGE_KEY = "easyrockets_hero_bg";

// Formatação Monetária
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartUI();
    setupEventListeners();
    initBackgroundCustomizer();
});

// Event Listeners
function setupEventListeners() {
    // Navbar sólida ao rolar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Abrir/Fechar Carrinho
    openCartBtn.addEventListener('click', () => cartOverlay.classList.add('active'));
    closeCartBtn.addEventListener('click', () => cartOverlay.classList.remove('active'));
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) cartOverlay.classList.remove('active');
    });

    // Fechar Modal
    modalCloseBtn.addEventListener('click', () => productModal.classList.remove('active'));
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) productModal.classList.remove('active');
    });

    // Filtros de Categoria
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            if (category === 'todos') {
                renderProducts(products);
            } else {
                renderProducts(products.filter(p => p.category === category));
            }
        });
    });

    // Checkout via WhatsApp
    btnWhatsApp.addEventListener('click', () => handleCheckout('whatsapp'));

    // Checkout via Email
    btnEmail.addEventListener('click', () => handleCheckout('email'));
}

// Renderizar Lista de Produtos
function renderProducts(productList) {
    productsGrid.innerHTML = '';
    productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <span class="product-badge">${product.badge}</span>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-specs-mini">
                    ${product.specs.thrust ? `<span>Empuxo: <strong>${product.specs.thrust}</strong></span>` : ''}
                    ${product.specs.impulse ? `<span>Impulso: <strong>${product.specs.impulse}</strong></span>` : ''}
                    ${product.specs.material ? `<span>Material: <strong>${product.specs.material}</strong></span>` : ''}
                </div>
                <div class="product-footer">
                    <span class="product-price">${formatCurrency(product.price)}</span>
                    <div style="display:flex; gap:8px;">
                        <button class="btn btn-outline" style="padding: 9px 14px; font-size: 0.72rem;" onclick="openProductModal(${product.id})">Detalhes</button>
                        <button class="btn-add-cart" onclick="addToCart(${product.id})">+ Carrinho</button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Abrir Modal de Detalhes
window.openProductModal = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let specsHtml = '<ul style="list-style: none; margin-top: 15px;">';
    for (const [key, val] of Object.entries(product.specs)) {
        specsHtml += `<li style="margin-bottom: 8px; color: var(--gray-1); font-size: 0.9rem;"><strong style="color: var(--accent); text-transform: capitalize; font-family: var(--font-mono); font-weight: 500;">${key}:</strong> ${val}</li>`;
    }
    specsHtml += '</ul>';

    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 24px;">
            <img src="${product.image}" alt="${product.title}" style="width: 140px; height: 140px; object-fit: cover; border: 1px solid var(--border); margin: 0 auto;">
            <h2 style="font-size: 1.3rem; margin-top: 16px; text-transform: uppercase;">${product.title}</h2>
            <span class="eyebrow" style="margin-top: 8px;">${product.badge}</span>
        </div>
        <p style="color: var(--gray-1); font-size: 0.95rem; line-height: 1.6;">${product.description}</p>

        <h3 style="margin-top: 28px; font-size: 0.85rem; color: #fff; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1px solid var(--border); padding-bottom: 10px; font-family: var(--font-mono); font-weight: 500;">Especificações Técnicas</h3>
        ${specsHtml}

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--border);">
            <span style="font-family: var(--font-mono); font-size: 1.4rem; color: var(--accent); font-weight: 500;">${formatCurrency(product.price)}</span>
            <button class="btn btn-primary" onclick="addToCart(${product.id}); productModal.classList.remove('active');">Adicionar ao Carrinho</button>
        </div>
    `;

    productModal.classList.add('active');
};

// Gerenciamento do Carrinho
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();

    // Feedback visual sutil (Abre o carrinho)
    cartOverlay.classList.add('active');
};

function changeQuantity(id, delta) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('aero_hybrid_cart', JSON.stringify(cart));
}

// Atualizar Interface do Carrinho
function updateCartUI() {
    // Quantidade total de itens
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalCount;

    // Calcular Total BRL
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPriceEl.textContent = formatCurrency(totalPrice);

    // Renderizar itens
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <p>Seu carrinho está vazio.</p>
                <p style="font-size: 0.85rem; color: var(--gray-2); margin-top: 6px;">Adicione motores ou kits para solicitar um orçamento.</p>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${formatCurrency(item.price)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">&times;</button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
}

// Processar Envio do Orçamento (WhatsApp ou Email)
function handleCheckout(type) {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio. Adicione pelo menos um item antes de solicitar o orçamento.");
        return;
    }

    // Coletar dados do formulário
    const name = document.getElementById('cust-name').value.trim();
    const email = document.getElementById('cust-email').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const institution = document.getElementById('cust-institution').value.trim() || 'Não informada';
    const city = document.getElementById('cust-city').value.trim();
    const notes = document.getElementById('cust-notes').value.trim() || 'Nenhuma observação adicional.';

    // Validação básica de campos obrigatórios
    if (!name || !email || !phone || !city) {
        alert("Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Telefone e Cidade/UF).");
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Formatar lista de produtos
    let itemsText = cart.map((item, idx) =>
        `${idx + 1}. ${item.title} (x${item.quantity}) - ${formatCurrency(item.price * item.quantity)}`
    ).join('\n');

    if (type === 'whatsapp') {
        const waMessage =
`🚀 *NOVO ORÇAMENTO DE MOTOR HÍBRIDO* 🚀

👤 *Dados do Cliente:*
• *Nome:* ${name}
• *E-mail:* ${email}
• *WhatsApp:* ${phone}
• *Instituição/Equipe:* ${institution}
• *Cidade/UF:* ${city}

📦 *Itens do Carrinho:*
${itemsText}

💰 *Valor Total Estimado:* ${formatCurrency(totalPrice)}

📝 *Observações:*
${notes}

-----------------------------------
Enviado através do site EasyRockets`;

        const encodedMsg = encodeURIComponent(waMessage);
        const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMsg}`;
        window.open(waUrl, '_blank');

    } else if (type === 'email') {
        const emailSubject = `Solicitação de Orçamento: Motor Híbrido - ${name}`;
        const emailBody =
`Prezada equipe EasyRockets,

Gostaria de solicitar um orçamento formal para os itens listados abaixo.

--- DADOS DO CLIENTE ---
Nome: ${name}
E-mail: ${email}
Telefone/WhatsApp: ${phone}
Instituição / Equipe: ${institution}
Cidade / UF: ${city}

--- ITENS SELECIONADOS ---
${itemsText}

VALOR TOTAL ESTIMADO: ${formatCurrency(totalPrice)}

--- OBSERVAÇÕES DO PROJETO ---
${notes}

Atenciosamente,
${name}`;

        const mailtoUrl = `mailto:${CONFIG.SELLER_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoUrl;
    }
}

// ==========================================================================
// Personalizador de Plano de Fundo
// Permite escolher um cenário predefinido ou enviar uma imagem própria,
// que é salva localmente (localStorage) e aplicada como plano de fundo do topo do site.
// ==========================================================================
function applyHeroBackground(url) {
    heroSection.style.setProperty('--hero-bg', `url('${url}')`);
    bgPresetBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.bg === url);
    });
}

function initBackgroundCustomizer() {
    // Restaurar preferência salva
    const savedBg = localStorage.getItem(BG_STORAGE_KEY);
    if (savedBg) {
        applyHeroBackground(savedBg);
    } else {
        applyHeroBackground(DEFAULT_BG);
    }

    bgToggleBtn.addEventListener('click', () => bgPanel.classList.toggle('active'));
    bgPanelClose.addEventListener('click', () => bgPanel.classList.remove('active'));

    document.addEventListener('click', (e) => {
        if (!bgPanel.contains(e.target) && !bgToggleBtn.contains(e.target)) {
            bgPanel.classList.remove('active');
        }
    });

    bgPresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.dataset.bg;
            applyHeroBackground(url);
            try {
                localStorage.setItem(BG_STORAGE_KEY, url);
            } catch (err) {
                console.warn('Não foi possível salvar a preferência de fundo:', err);
            }
        });
    });

    bgUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione um arquivo de imagem válido.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            applyHeroBackground(dataUrl);
            try {
                localStorage.setItem(BG_STORAGE_KEY, dataUrl);
            } catch (err) {
                // Imagem grande demais para o localStorage: aplica só nesta sessão.
                console.warn('Imagem aplicada apenas nesta sessão (excede limite de armazenamento local).');
            }
        };
        reader.readAsDataURL(file);
    });

    bgResetBtn.addEventListener('click', () => {
        applyHeroBackground(DEFAULT_BG);
        localStorage.removeItem(BG_STORAGE_KEY);
        bgUploadInput.value = '';
    });
}
