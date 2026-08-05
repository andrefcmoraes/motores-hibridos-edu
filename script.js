// Configurações Globais de Contato (Altere aqui para seus dados reais)
const CONFIG = {
    WHATSAPP_NUMBER: "5598984021920", // Formato: DDI + DDD + Número (apenas dígitos)
    SELLER_EMAIL: "andrefcmoraes@gmail.com"
};

// Base de Dados dos Produtos
const products = [
    {
        id: 1,
        title: "Kit Motor Híbrido Edu 100N",
        category: "motores",
        price: 1850.00,
        emoji: "🚀",
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
        emoji: "🔥",
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
        emoji: "🔍",
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
        emoji: "🧪",
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
        emoji: "⚙️",
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
        emoji: "📟",
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
        emoji: "⚡",
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

// Formatação Monetária
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartUI();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
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
                <span class="product-emoji">${product.emoji}</span>
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
                    <button class="btn btn-outline" style="padding: 8px 12px; font-size: 0.8rem;" onclick="openProductModal(${product.id})">Detalhes</button>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">+ Carrinho</button>
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
        specsHtml += `<li style="margin-bottom: 8px; color: var(--text-muted);"><strong style="color: var(--primary); text-transform: capitalize;">${key}:</strong> ${val}</li>`;
    }
    specsHtml += '</ul>';

    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <span style="font-size: 4rem;">${product.emoji}</span>
            <h2 style="font-size: 1.5rem; margin-top: 10px;">${product.title}</h2>
            <span class="badge" style="margin-top: 5px;">${product.badge}</span>
        </div>
        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">${product.description}</p>
        
        <h3 style="margin-top: 25px; font-size: 1.1rem; color: #fff; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">Especificações Técnicas</h3>
        ${specsHtml}

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid var(--border-color);">
            <span style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--accent-orange); font-weight: 700;">${formatCurrency(product.price)}</span>
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
                <span style="font-size: 3rem;">🛒</span>
                <p style="margin-top: 10px;">Seu carrinho está vazio.</p>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Adicione motores ou kits para solicitar um orçamento.</p>
            </div>
        `;
        return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <span style="font-size: 1.8rem;">${item.emoji}</span>
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
Enviado através do site AeroHybrid Edu`;

        const encodedMsg = encodeURIComponent(waMessage);
        const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMsg}`;
        window.open(waUrl, '_blank');

    } else if (type === 'email') {
        const emailSubject = `Solicitação de Orçamento: Motor Híbrido - ${name}`;
        const emailBody = 
`Prezada equipe AeroHybrid Edu,

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
