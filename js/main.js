// js/main.js
const CommonUtils = {
    // Inicialização geral
    init() {
        this.setupIntersectionObserver();
        this.setupHeaderScroll();
        this.setupSmoothScroll();
        this.setupAccessibility();
    },
    
    // Observer para animações de entrada
    setupIntersectionObserver() {
        const fadeElements = document.querySelectorAll('.fade-in');
        if (fadeElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => observer.observe(element));
    },
    
    // Controle do header no scroll
    setupHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            header.style.background = window.scrollY > 100 ? 
                'rgba(10, 10, 10, 0.98)' : 'rgba(10, 10, 10, 0.95)';
        });
    },
    
    // Scroll suave para âncoras
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },
    
    // Melhorias de acessibilidade
    setupAccessibility() {
        // Adicionar skip link se não existir
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Pular para conteúdo principal';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--text-primary);
                color: var(--primary-black);
                padding: 8px;
                z-index: 10000;
                text-decoration: none;
                border-radius: 4px;
            `;
            skipLink.addEventListener('click', function() {
                const main = document.querySelector('main') || document.querySelector('.hero');
                if (main) main.focus();
            });
            document.body.prepend(skipLink);
        }
    },
    
    // Utilitário para formatação de preço
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    },
    
    // Carregamento otimizado de imagens
    setupImageLoader(selector = 'img[loading="lazy"]') {
        const images = document.querySelectorAll(selector);
        if (images.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    imageObserver.unobserve(img);
                }
            });
        }, { 
            rootMargin: '50px 0px',
            threshold: 0.01 
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    CommonUtils.init();
});

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommonUtils;
}
// === ADICIONAR ESTE CÓDIGO NO FINAL DO ARQUIVO ===

// Indicador de página ativa no menu
document.addEventListener('DOMContentLoaded', function() {
    // Obter o caminho atual da URL
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Encontrar todos os links do menu
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remover classe active de todos os links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Adicionar classe active ao link correspondente à página atual
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Verificar se é a página inicial
        if (currentPage === 'index.html' || currentPage === '') {
            if (linkHref === 'index.html') {
                link.classList.add('active');
            }
        } 
        // Verificar outras páginas
        else if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});