// js/loja.js - VERSAO COMPLETA COM GALERIA
// JavaScript específico da página da loja

// ===== CONFIGURAÇÃO E DADOS =====
const CONFIG = {
    shippingCost: 15.00,
    currency: 'BRL',
    locale: 'pt-BR'
};

// Dados dos produtos atualizados com galeria
const products = {
    1: {
        title: "Vortex",
        price: 129.90,
        image: "images/vortex-1.jpg",
        gallery: [
            "images/vortex-1.jpg",
            "images/vortex-2.jpg"
        ],
        description: "Camiseta técnica com tecnologia de respirabilidade avançada para máxima performance durante os treinos. Desenvolvida com tecido inteligente que regula a temperatura corporal e oferece secagem rápida.",
        features: [
            "Tecido inteligente com regulação térmica",
            "Tecnologia de secagem rápida",
            "Costuras planas para evitar atritos",
            "Proteção UV 50+",
            "Lavagem fácil e duradoura"
        ],
        category: "camisetas",
        colors: ["preto", "branco", "cinza"],
        style: "esportivo"
    },
    2: {
        title: "Nexus Urban",
        price: 89.90,
        image: "images/nexusurban-1.jpg",
        gallery: [
            "images/nexusurban-1.jpg",
        ],
        description: "Shorts com tecnologia de compressão e tecido de secagem rápida para conforto máximo em atividades intensas. Design ergonômico que acompanha seus movimentos.",
        features: [
            "Tecnologia de compressão muscular",
            "Secagem ultra-rápida",
            "Bolsos seguros com zíper",
            "Cintura elástica ajustável",
            "Resistente a odores"
        ],
        category: "shorts",
        colors: ["preto", "azul", "verde"],
        style: "treino"
    },
    3: {
        title: "Vortex PRO",
        price: 199.90,
        image: "images/vortexpro-1.jpg",
        gallery: [
            "images/vortexpro-1.jpg",
            "images/vortexpro-2.jpg"
        ],
        description: "Jaqueta com isolamento térmico avançado, ideal para treinos em ambientes frios e condições climáticas adversas. Conforto e proteção em qualquer temperatura.",
        features: [
            "Isolamento térmico avançado",
            "Material à prova d'água e vento",
            "Capuz removível",
            "Bolsos internos seguros",
            "Refletores para segurança noturna"
        ],
        category: "jaquetas",
        colors: ["preto", "azul", "vermelho"],
        style: "inverno"
    },
    4: {
        title: "Legging Premium",
        price: 159.90,
        image: "images/legging-1.jpg",
        gallery: [
            "images/legging-1.jpg",
            "images/legging-2.jpg",
            "images/legging-3.png"
        ],
        description: "Calça legging de alta compressão com tecnologia 4D que oferece suporte muscular e liberdade de movimento. Ideal para yoga, pilates e treinos funcionais.",
        features: [
            "Tecnologia de compressão 4D",
            "Suporte muscular direcionado",
            "Cintura alta de sustentação",
            "Transpirabilidade máxima",
            "Design sem costuras visíveis"
        ],
        category: "calcas",
        colors: ["preto", "cinza", "azul"],
        style: "fitness"
    },
    5: {
        title: "Tênis Running Elite",
        price: 299.90,
        image: "images/tenis-running.jpg",
        gallery: [
            "images/tenis-running.jpg"
        ],
        description: "Tênis de corrida com amortecimento avançado e sistema de estabilidade para máximo desempenho atlético. Desenvolvido para atletas que buscam superar seus limites.",
        features: [
            "Sistema de amortecimento avançado",
            "Estabilidade dinâmica",
            "Sola com tração máxima",
            "Respirabilidade otimizada",
            "Peso ultraleve"
        ],
        category: "tenis",
        colors: ["preto", "branco", "azul"],
        style: "corrida"
    },
    6: {
        title: "Moletom Esportivo",
        price: 179.90,
        image: "images/moletom-esportivo.jpg",
        gallery: [
            "images/moletom-esportivo.jpg"
        ],
        description: "Moletom com capuz e tecnologia de regulação térmica, perfeito para aquecimento e recuperação pós-treino. Conforto premium para momentos de relaxamento.",
        features: [
            "Tecnologia de regulação térmica",
            "Capuz ajustável",
            "Bolsos kanguru laterais",
            "Tecido fleece premium",
            "Design moderno e atlético"
        ],
        category: "moletom",
        colors: ["cinza", "preto", "verde"],
        style: "casual"
    },
    7: {
        title: "Top Esportivo Performance",
        price: 79.90,
        image: "images/top-esportivo.jpg",
        gallery: [
            "images/top-esportivo.jpg"
        ],
        description: "Top esportivo de alto suporte com tecnologia de compressão e design ergonômico para atividades de alto impacto. Segurança e conforto em cada movimento.",
        features: [
            "Suporte de alto impacto",
            "Alças ajustáveis",
            "Tecido com compressão inteligente",
            "Costuras especiais sem atrito",
            "Design anatômico"
        ],
        category: "tops",
        colors: ["preto", "branco", "rosa"],
        style: "fitness"
    },
    8: {
        title: "Meias Técnicas",
        price: 39.90,
        image: "images/meias-tecnicas.jpg",
        gallery: [
            "images/meias-tecnicas.jpg"
        ],
        description: "Meias esportivas com tecnologia antibolhas e zonas de ventilação estratégicas para conforto máximo. Desenvolvidas para performance e durabilidade.",
        features: [
            "Tecnologia antibolhas",
            "Zonas de ventilação estratégicas",
            "Suporte no arco plantar",
            "Acabamento sem costuras",
            "Material de rápida secagem"
        ],
        category: "acessorios",
        colors: ["branco", "preto", "cinza"],
        style: "performance"
    }
};

// ===== GERENCIADOR DE GALERIA =====
const GalleryManager = {
    currentProductId: null,
    currentImageIndex: 0,
    images: [],
    
    init() {
        this.setupGalleryEventListeners();
    },
    
    setupGalleryEventListeners() {
        // Event delegation para controles da galeria
        document.addEventListener('click', (e) => {
            if (e.target.closest('.gallery-prev')) {
                this.previousImage();
            } else if (e.target.closest('.gallery-next')) {
                this.nextImage();
            } else if (e.target.closest('.gallery-indicator')) {
                const indicator = e.target.closest('.gallery-indicator');
                const index = parseInt(indicator.getAttribute('data-index'));
                this.goToImage(index);
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('productModal');
            if (modal && modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    this.previousImage();
                } else if (e.key === 'ArrowRight') {
                    this.nextImage();
                } else if (e.key === 'Escape') {
                    UI.closeModal('productModal');
                }
            }
        });
    },
    
    openGallery(productId, startIndex = 0) {
        const product = products[productId];
        if (!product || !product.gallery) return;
        
        this.currentProductId = productId;
        this.images = product.gallery;
        this.currentImageIndex = startIndex;
        
        this.updateGallery();
    },
    
    updateGallery() {
        const mainImage = document.querySelector('.gallery-main-image');
        const indicators = document.querySelectorAll('.gallery-indicator');
        
        if (mainImage && this.images[this.currentImageIndex]) {
            // Mostrar loading
            mainImage.classList.remove('loaded');
            mainImage.parentElement.classList.add('loading');
            
            // Carregar nova imagem
            const newImage = new Image();
            newImage.onload = () => {
                mainImage.src = newImage.src;
                mainImage.classList.add('loaded');
                mainImage.parentElement.classList.remove('loading');
                
                // Atualizar indicadores
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentImageIndex);
                });
                
                // Atualizar controles de navegação
                this.updateNavigationControls();
            };
            newImage.onerror = () => {
                mainImage.parentElement.classList.remove('loading');
                console.error('Erro ao carregar imagem da galeria');
            };
            newImage.src = this.images[this.currentImageIndex];
        }
    },
    
    previousImage() {
        if (this.images.length <= 1) return;
        
        this.currentImageIndex = this.currentImageIndex > 0 ? 
            this.currentImageIndex - 1 : this.images.length - 1;
        this.updateGallery();
    },
    
    nextImage() {
        if (this.images.length <= 1) return;
        
        this.currentImageIndex = this.currentImageIndex < this.images.length - 1 ? 
            this.currentImageIndex + 1 : 0;
        this.updateGallery();
    },
    
    goToImage(index) {
        if (index >= 0 && index < this.images.length) {
            this.currentImageIndex = index;
            this.updateGallery();
        }
    },
    
    updateNavigationControls() {
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        
        // Mostrar/ocultar controles baseado no número de imagens
        if (this.images.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
        }
    },
    
    createGalleryHTML() {
        const product = products[this.currentProductId];
        if (!product) return '';
        
        const hasMultipleImages = product.gallery && product.gallery.length > 1;
        
        return `
            <div class="modal-image">
                <img src="${product.gallery[0]}" alt="${product.title}" class="gallery-main-image">
                <div class="modal-image-placeholder">Carregando imagem...</div>
                
                ${hasMultipleImages ? `
                    <div class="gallery-controls">
                        <button class="gallery-btn gallery-prev" aria-label="Imagem anterior">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="gallery-btn gallery-next" aria-label="Próxima imagem">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    
                    <div class="gallery-indicators">
                        ${product.gallery.map((_, index) => `
                            <button class="gallery-indicator ${index === 0 ? 'active' : ''}" 
                                    data-index="${index}" 
                                    aria-label="Ver imagem ${index + 1}">
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
};

// ===== ANÁLISE DE FOTOS =====
const PhotoAnalyzer = {
    currentFile: null,
    
    init() {
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        const uploadContainer = document.getElementById('analyzeUpload');
        const analyzeSubmit = document.getElementById('analyzeSubmit');
        const analyzeReset = document.getElementById('analyzeReset');
        
        if (uploadContainer) {
            uploadContainer.addEventListener('click', () => this.triggerFileInput());
            uploadContainer.addEventListener('dragover', (e) => this.handleDragOver(e));
            uploadContainer.addEventListener('drop', (e) => this.handleDrop(e));
        }
        
        if (analyzeSubmit) {
            analyzeSubmit.addEventListener('click', () => this.analyzePhoto());
        }
        
        if (analyzeReset) {
            analyzeReset.addEventListener('click', () => this.resetAnalyzer());
        }
    },
    
    triggerFileInput() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => this.handleFileSelect(e);
        input.click();
    },
    
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    },
    
    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    },
    
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    },
    
    processFile(file) {
        // Validar tipo e tamanho do arquivo
        if (!file.type.startsWith('image/')) {
            UI.showNotification('Por favor, selecione um arquivo de imagem.', true);
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            UI.showNotification('A imagem deve ter no máximo 5MB.', true);
            return;
        }
        
        this.currentFile = file;
        
        // Mostrar preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('analyzePreview');
            const previewImage = document.getElementById('analyzePreviewImage');
            
            previewImage.src = e.target.result;
            preview.style.display = 'block';
            
            UI.showNotification('Imagem carregada com sucesso! Clique em "Analisar Foto" para continuar.');
        };
        reader.readAsDataURL(file);
    },
    
    analyzePhoto() {
        const preview = document.getElementById('analyzePreview');
        const analyzeSubmit = document.getElementById('analyzeSubmit');
        const results = document.getElementById('analyzeResults');
        const recommendedProducts = document.getElementById('recommendedProducts');
        
        if (!preview || preview.style.display === 'none' || !this.currentFile) {
            UI.showNotification('Por favor, selecione uma imagem primeiro.', true);
            return;
        }
        
        // Mostrar estado de carregamento
        analyzeSubmit.classList.add('loading');
        analyzeSubmit.disabled = true;
        
        // Simular análise (substitua por sua API real)
        setTimeout(() => {
            analyzeSubmit.classList.remove('loading');
            analyzeSubmit.disabled = false;
            
            // Gerar resultados simulados
            this.generateMockResults();
            
            if (results) {
                results.style.display = 'block';
            }
            
            if (recommendedProducts) {
                recommendedProducts.style.display = 'block';
                this.showRecommendedProducts();
            }
            
            UI.showNotification('Análise concluída com sucesso! Encontramos produtos que combinam com sua foto.');
        }, 2000);
    },
    
    generateMockResults() {
        // Simular resultados de análise baseados na imagem
        const clothingTypes = ["Camiseta Esportiva", "Shorts", "Jaqueta", "Calça Legging", "Tênis", "Moletom", "Top Esportivo"];
        const colors = ["Preto", "Branco", "Cinza", "Azul", "Vermelho", "Verde", "Rosa"];
        const styles = ["Esportivo", "Casual", "Fitness", "Corrida", "Treino", "Inverno", "Performance"];
        
        const randomType = clothingTypes[Math.floor(Math.random() * clothingTypes.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        const randomConfidence = (Math.random() * 30 + 70).toFixed(0) + '%';
        
        // Atualizar elementos de resultado
        document.getElementById('resultType').textContent = randomType;
        document.getElementById('resultColor').textContent = randomColor;
        document.getElementById('resultStyle').textContent = randomStyle;
        document.getElementById('resultConfidence').textContent = randomConfidence;
    },
    
    showRecommendedProducts() {
        const recommendedGrid = document.getElementById('recommendedGrid');
        if (!recommendedGrid) return;
        
        // Limpar grid anterior
        recommendedGrid.innerHTML = '';
        
        // Selecionar produtos aleatórios para recomendação (3-4 produtos)
        const productIds = Object.keys(products);
        const shuffled = productIds.sort(() => 0.5 - Math.random());
        const selectedIds = shuffled.slice(0, 4);
        
        selectedIds.forEach(productId => {
            const product = products[productId];
            const productCard = document.createElement('div');
            productCard.className = 'product-card fade-in';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    <div class="product-image-placeholder">Carregando imagem...</div>
                </div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${AppState.formatPrice(product.price)}</div>
                <p class="product-description">${product.description.substring(0, 100)}...</p>
                <div class="product-actions">
                    <button class="view-details" data-product="${productId}" aria-label="Ver detalhes do ${product.title}">VER DETALHES</button>
                    <button class="add-to-cart" data-product="${productId}" aria-label="Adicionar ${product.title} ao carrinho">ADICIONAR AO CARRINHO</button>
                </div>
            `;
            recommendedGrid.appendChild(productCard);
        });
        
        // Ativar animações fade-in
        setTimeout(() => {
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
    },
    
    resetAnalyzer() {
        const preview = document.getElementById('analyzePreview');
        const results = document.getElementById('analyzeResults');
        const recommendedProducts = document.getElementById('recommendedProducts');
        const previewImage = document.getElementById('analyzePreviewImage');
        
        if (preview) preview.style.display = 'none';
        if (results) results.style.display = 'none';
        if (recommendedProducts) recommendedProducts.style.display = 'none';
        if (previewImage) previewImage.src = '';
        
        this.currentFile = null;
        
        UI.showNotification('Análise reiniciada. Faça upload de uma nova foto.');
    }
};

// ===== VALIDAÇÃO DE FORMULÁRIOS =====
const FormValidator = {
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    validatePhone(phone) {
        const phoneRegex = /^[\d\s\(\)\-]+$/;
        return phoneRegex.test(phone.replace(/\s/g, '')) && phone.replace(/\s/g, '').length >= 10;
    },
    
    validateZipCode(zipCode) {
        const zipRegex = /^\d{5}-?\d{3}$/;
        return zipRegex.test(zipCode);
    }
};

// ===== GERENCIAMENTO DE ESTADO =====
const AppState = {
    cart: [],
    currentCheckoutStep: 1,
    
    init() {
        this.loadCart();
        this.updateCartUI();
        this.setupFormValidation();
        this.setupEventListeners();
        PhotoAnalyzer.init();
    },
    
    setupFormValidation() {
        // Validação em tempo real para email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !FormValidator.validateEmail(this.value)) {
                    this.style.borderColor = 'var(--error-color)';
                } else {
                    this.style.borderColor = 'var(--border-color)';
                }
            });
        }

        // Validação em tempo real para telefone
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                if (this.value && !FormValidator.validatePhone(this.value)) {
                    this.style.borderColor = 'var(--error-color)';
                } else {
                    this.style.borderColor = 'var(--border-color)';
                }
            });
        }

        // Validação em tempo real para CEP
        const zipCodeInput = document.getElementById('zipCode');
        if (zipCodeInput) {
            zipCodeInput.addEventListener('blur', function() {
                if (this.value && !FormValidator.validateZipCode(this.value)) {
                    this.style.borderColor = 'var(--error-color)';
                } else {
                    this.style.borderColor = 'var(--border-color)';
                }
            });
        }
    },
    
    setupEventListeners() {
        // Usar event delegation para elementos dinâmicos
        document.addEventListener('click', (e) => {
            // Botões de adicionar ao carrinho
            if (e.target.closest('.add-to-cart')) {
                const button = e.target.closest('.add-to-cart');
                const productId = parseInt(button.getAttribute('data-product'));
                const productName = this.addToCart(productId);
                UI.showNotification(`${productName} adicionado ao carrinho!`);
            }
            
            // Botões de ver detalhes
            if (e.target.closest('.view-details')) {
                const button = e.target.closest('.view-details');
                const productId = parseInt(button.getAttribute('data-product'));
                UI.openProductModal(productId);
            }
        });
        
        // Toggle do carrinho
        const cartIcon = document.getElementById('cartIcon');
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                cartIcon.classList.toggle('active');
            });
            
            // Fechar dropdown do carrinho ao clicar fora
            document.addEventListener('click', () => {
                cartIcon.classList.remove('active');
            });
            
            // Prevenir fechamento do dropdown ao clicar dentro
            const cartDropdown = cartIcon.querySelector('.cart-dropdown');
            if (cartDropdown) {
                cartDropdown.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        }
        
        // Checkout
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                UI.openCheckout();
            });
        }
        
        // Navegação do checkout
        document.querySelectorAll('.btn-next').forEach(button => {
            button.addEventListener('click', (e) => {
                const currentStep = parseInt(document.querySelector('.step.active').getAttribute('data-step'));
                const targetStep = parseInt(e.currentTarget.getAttribute('data-next'));
                UI.navigateCheckoutStep(currentStep, targetStep);
                
                if (targetStep === 3) {
                    this.completeOrder();
                }
            });
        });
        
        document.querySelectorAll('.btn-back').forEach(button => {
            button.addEventListener('click', (e) => {
                const targetStep = parseInt(e.currentTarget.getAttribute('data-prev'));
                const currentStep = parseInt(document.querySelector('.step.active').getAttribute('data-step'));
                UI.navigateCheckoutStep(currentStep, targetStep);
            });
        });
        
        // Confirmar pedido
        const confirmOrderBtn = document.getElementById('confirmOrder');
        if (confirmOrderBtn) {
            confirmOrderBtn.addEventListener('click', () => {
                UI.closeModal('checkoutModal');
            });
        }
        
        // Mostrar/ocultar campos de cartão de crédito
        const paymentMethodSelect = document.getElementById('paymentMethod');
        if (paymentMethodSelect) {
            paymentMethodSelect.addEventListener('change', function() {
                const creditCardFields = document.getElementById('creditCardFields');
                if (this.value === 'credit' || this.value === 'debit') {
                    creditCardFields.style.display = 'block';
                } else {
                    creditCardFields.style.display = 'none';
                }
            });
        }
    },
    
    loadCart() {
        const savedCart = localStorage.getItem('snoules-cart');
        this.cart = savedCart ? JSON.parse(savedCart) : [];
    },
    
    saveCart() {
        localStorage.setItem('snoules-cart', JSON.stringify(this.cart));
    },
    
    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    addToCart(productId) {
        const product = products[productId];
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                title: product.title,
                price: product.price,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        return product.title;
    },
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    },

    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeFromCart(productId);
            return;
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartUI();
        }
    },

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
    },
    
    updateCartUI() {
        const cartCountElement = document.querySelector('.cart-count');
        const cartTotalElement = document.getElementById('cartTotal');
        const cartDropdownItems = document.getElementById('cartDropdownItems');
        
        // Atualizar contador e total
        if (cartCountElement) {
            cartCountElement.textContent = this.getCartCount();
        }
        if (cartTotalElement) {
            cartTotalElement.textContent = this.formatPrice(this.getCartTotal());
        }
        
        // Atualizar itens do dropdown
        if (cartDropdownItems) {
            cartDropdownItems.innerHTML = '';
            
            if (this.cart.length === 0) {
                cartDropdownItems.innerHTML = '<div class="cart-dropdown-empty">Seu carrinho está vazio</div>';
            } else {
                this.cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-dropdown-item';
                    cartItem.innerHTML = `
                        <div class="cart-dropdown-item-info">
                            <div class="cart-dropdown-item-name">${item.title}</div>
                            <div class="cart-dropdown-item-price">${this.formatPrice(item.price)}</div>
                            <div class="cart-quantity-controls">
                                <button class="quantity-btn" data-id="${item.id}" data-action="decrease" aria-label="Diminuir quantidade">-</button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn" data-id="${item.id}" data-action="increase" aria-label="Aumentar quantidade">+</button>
                            </div>
                        </div>
                        <button class="cart-dropdown-remove" data-id="${item.id}" aria-label="Remover item">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    cartDropdownItems.appendChild(cartItem);
                });
                
                // Adicionar event listeners para controles de quantidade
                document.querySelectorAll('.quantity-btn').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
                        const action = e.currentTarget.getAttribute('data-action');
                        const item = this.cart.find(item => item.id === productId);
                        
                        if (item) {
                            if (action === 'increase') {
                                this.updateQuantity(productId, item.quantity + 1);
                            } else if (action === 'decrease') {
                                this.updateQuantity(productId, item.quantity - 1);
                            }
                        }
                    });
                });
                
                // Adicionar event listeners para remover itens
                document.querySelectorAll('.cart-dropdown-remove').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = parseInt(e.currentTarget.getAttribute('data-id'));
                        this.removeFromCart(productId);
                    });
                });
            }
        }
    },
    
    completeOrder() {
        const confirmBtn = document.querySelector('.btn-next[data-next="3"]');
        if (confirmBtn) {
            confirmBtn.classList.add('btn-loading');
            confirmBtn.disabled = true;
            
            setTimeout(() => {
                const step2 = document.getElementById('step2');
                const step3 = document.getElementById('step3');
                const comingSoonMessage = document.getElementById('comingSoonMessage');
                
                if (step2) step2.style.display = 'none';
                if (step3) step3.classList.add('active');
                if (comingSoonMessage) comingSoonMessage.style.display = 'block';
                
                // Limpar carrinho após finalização
                this.clearCart();
            }, 2000);
        }
    },
    
    formatPrice(price) {
        return new Intl.NumberFormat(CONFIG.locale, {
            style: 'currency',
            currency: CONFIG.currency
        }).format(price);
    }
};

// ===== GERENCIAMENTO DE UI =====
const UI = {
    init() {
        this.setupImageLoader();
        GalleryManager.init();
    },
    
    setupImageLoader() {
        const loadImage = (img) => {
            if (img.getAttribute('data-loaded')) return;
            
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.onload = function() {
                    img.src = this.src;
                    img.classList.add('loaded');
                    img.setAttribute('data-loaded', 'true');
                    
                    const placeholder = img.parentElement.querySelector('.product-image-placeholder, .modal-image-placeholder');
                    if (placeholder) {
                        placeholder.style.display = 'none';
                    }
                };
                newImg.onerror = function() {
                    const placeholder = img.parentElement.querySelector('.product-image-placeholder, .modal-image-placeholder');
                    if (placeholder) {
                        placeholder.style.display = 'flex';
                        placeholder.textContent = 'Imagem não disponível';
                    }
                };
                newImg.src = src;
            }
        };

        // Observer mais eficiente
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    imageObserver.unobserve(entry.target);
                }
            });
        }, { 
            rootMargin: '50px 0px',
            threshold: 0.01 
        });
        
        document.querySelectorAll('.product-image img, .modal-image img').forEach(img => {
            imageObserver.observe(img);
        });
    },
    
    openProductModal(productId) {
        const product = products[productId];
        const modalBody = document.getElementById('modalBody');
        const productModal = document.getElementById('productModal');
        
        if (!modalBody || !productModal) return;
        
        // Abrir galeria para o produto
        GalleryManager.openGallery(productId, 0);
        
        // Determinar qual imagem mostrar baseada no produto
        let imageHtml = GalleryManager.createGalleryHTML();
        
        modalBody.innerHTML = `
            ${imageHtml}
            <div class="modal-details">
                <h2 class="modal-title">${product.title}</h2>
                <div class="modal-price">${AppState.formatPrice(product.price)}</div>
                <p class="modal-description">${product.description}</p>
                
                <div class="modal-features">
                    <h3 class="features-title">Características</h3>
                    <ul class="features-list">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                ${product.gallery && product.gallery.length > 1 ? `
                    <div class="gallery-info">
                        <p><i class="fas fa-images"></i> ${product.gallery.length} fotos disponíveis</p>
                        <p class="gallery-hint">Use as setas ou clique nos pontos para navegar</p>
                    </div>
                ` : ''}
                
                <div class="modal-actions">
                    <button class="btn add-to-cart" data-product="${productId}" aria-label="Adicionar ${product.title} ao carrinho">ADICIONAR AO CARRINHO</button>
                    <button class="btn close-modal-btn">VOLTAR</button>
                </div>
            </div>
        `;
        
        this.openModal('productModal');
        
        // Carregar a primeira imagem da galeria imediatamente
        const modalImage = modalBody.querySelector('.gallery-main-image');
        if (modalImage) {
            const loadModalImage = () => {
                const src = modalImage.getAttribute('src');
                if (src) {
                    const newImg = new Image();
                    newImg.onload = function() {
                        modalImage.src = this.src;
                        modalImage.classList.add('loaded');
                        
                        // Ajustar layout baseado na proporção
                        const width = this.naturalWidth;
                        const height = this.naturalHeight;
                        const container = modalImage.parentElement;
                        
                        if (height > width) {
                            container.classList.add('portrait');
                            container.classList.remove('landscape');
                        } else {
                            container.classList.add('landscape');
                            container.classList.remove('portrait');
                        }
                        
                        const placeholder = container.querySelector('.modal-image-placeholder');
                        if (placeholder) placeholder.style.display = 'none';
                    };
                    newImg.onerror = function() {
                        const placeholder = modalImage.parentElement.querySelector('.modal-image-placeholder');
                        if (placeholder) {
                            placeholder.style.display = 'flex';
                            placeholder.textContent = 'Imagem não disponível';
                        }
                    };
                    newImg.src = src;
                }
            };
            
            // Carregar a imagem imediatamente
            loadModalImage();
        }
        
        // Adicionar event listeners dentro do modal
        const addToCartBtn = modalBody.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const productName = AppState.addToCart(productId);
                this.showNotification(`${productName} adicionado ao carrinho!`);
                this.closeModal('productModal');
            });
        }
        
        const closeModalBtn = modalBody.querySelector('.close-modal-btn');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeModal('productModal');
            });
        }
    },
    
    openCheckout() {
        if (AppState.cart.length === 0) {
            this.showNotification('Seu carrinho está vazio!', true);
            return;
        }
        
        // Atualizar resumo do pedido
        const summarySubtotal = document.getElementById('summarySubtotal');
        const summaryShipping = document.getElementById('summaryShipping');
        const summaryTotal = document.getElementById('summaryTotal');
        
        if (summarySubtotal) summarySubtotal.textContent = AppState.formatPrice(AppState.getCartTotal());
        if (summaryShipping) summaryShipping.textContent = AppState.formatPrice(CONFIG.shippingCost);
        if (summaryTotal) summaryTotal.textContent = AppState.formatPrice(AppState.getCartTotal() + CONFIG.shippingCost);
        
        this.openModal('checkoutModal');
    },
    
    navigateCheckoutStep(currentStep, targetStep) {
        // Validar passo atual antes de avançar
        if (targetStep > currentStep) {
            if (currentStep === 1) {
                const fullName = document.getElementById('fullName')?.value;
                const email = document.getElementById('email')?.value;
                const phone = document.getElementById('phone')?.value;
                const address = document.getElementById('address')?.value;
                const city = document.getElementById('city')?.value;
                const zipCode = document.getElementById('zipCode')?.value;
                
                if (!fullName || !email || !phone || !address || !city || !zipCode) {
                    this.showNotification('Por favor, preencha todos os campos obrigatórios.', true);
                    return;
                }

                // Validações específicas
                if (email && !FormValidator.validateEmail(email)) {
                    this.showNotification('Por favor, insira um email válido.', true);
                    return;
                }

                if (phone && !FormValidator.validatePhone(phone)) {
                    this.showNotification('Por favor, insira um telefone válido.', true);
                    return;
                }

                if (zipCode && !FormValidator.validateZipCode(zipCode)) {
                    this.showNotification('Por favor, insira um CEP válido.', true);
                    return;
                }
            }
        }
        
        // Atualizar passos
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
        
        document.querySelectorAll('.checkout-form').forEach(form => {
            form.classList.remove('active');
        });
        
        for (let i = 1; i <= targetStep; i++) {
            const stepElement = document.querySelector(`.step[data-step="${i}"]`);
            if (stepElement) {
                if (i < targetStep) {
                    stepElement.classList.add('completed');
                } else {
                    stepElement.classList.add('active');
                }
            }
        }
        
        const targetForm = document.getElementById(`step${targetStep}`);
        if (targetForm) {
            targetForm.classList.add('active');
        }
        AppState.currentCheckoutStep = targetStep;
    },
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    },
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    },
    
    showNotification(message, isError = false) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.classList.toggle('error', isError);
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Fechar modais
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            UI.closeModal('productModal');
        });
    }
    
    const closeCheckoutModalBtn = document.getElementById('closeCheckoutModal');
    if (closeCheckoutModalBtn) {
        closeCheckoutModalBtn.addEventListener('click', () => {
            UI.closeModal('checkoutModal');
        });
    }
    
    // Fechar modais ao clicar fora
    const productModal = document.getElementById('productModal');
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                UI.closeModal('productModal');
            }
        });
    }
    
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                UI.closeModal('checkoutModal');
            }
        });
    }
    
    // Inicializar aplicação
    AppState.init();
    UI.init();
    
    // Ativar animações fade-in
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});