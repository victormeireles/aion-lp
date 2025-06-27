import { HeaderComponent } from './components/header.js';
import { FooterComponent } from './components/footer.js';

class AIONApp {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.components = {
            header: null,
            footer: null
        };
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        console.log('Detectando página atual:', path);
        
        if (path === '/' || path.includes('index.html') || path.includes('index-refactored.html')) {
            return 'index';
        } else if (path.includes('campanhas.html')) {
            return 'campanhas';
        } else if (path.includes('ecommerce.html')) {
            return 'ecommerce';
        } else if (path.includes('agentes.html')) {
            return 'agentes';
        } else if (path.includes('consultoria.html')) {
            return 'consultoria';
        }
        
        return 'index'; // fallback
    }

    async init() {
        try {
            await this.loadComponents();
            this.initializePageSpecificFeatures();
            console.log(`AION App inicializado para a página: ${this.currentPage}`);
        } catch (error) {
            console.error('Erro ao inicializar AION App:', error);
        }
    }

    async loadComponents() {
        try {
            console.log('Carregando componentes...');
            
            // Verificar se containers existem
            const headerContainer = document.getElementById('header-container');
            const footerContainer = document.getElementById('footer-container');
            
            console.log('Header container encontrado:', !!headerContainer);
            console.log('Footer container encontrado:', !!footerContainer);
            
            if (!headerContainer || !footerContainer) {
                throw new Error('Containers necessários não encontrados');
            }
            
            // Carregar header
            console.log('Carregando header...');
            this.components.header = new HeaderComponent(this.currentPage);
            await this.components.header.render('header-container');
            this.components.header.updatePageTitle();
            console.log('Header carregado');

            // Carregar footer
            console.log('Carregando footer...');
            this.components.footer = new FooterComponent(this.currentPage);
            await this.components.footer.render('footer-container');
            console.log('Footer carregado');
        } catch (error) {
            console.error('Erro ao carregar componentes:', error);
            throw error;
        }
    }

    initializePageSpecificFeatures() {
        // Funcionalidades específicas por página
        switch (this.currentPage) {
            case 'index':
                this.initIndexPage();
                break;
            case 'campanhas':
            case 'ecommerce':
            case 'agentes':
            case 'consultoria':
                this.initProductPage();
                break;
        }

        // Funcionalidades globais
        this.initGlobalFeatures();
    }

    initIndexPage() {
        // Funcionalidades específicas da página inicial
        this.initSolutionsAnimation();
    }

    initProductPage() {
        // Funcionalidades específicas das páginas de produto
        this.initProductFeatures();
    }

    initSolutionsAnimation() {
        // Animação das soluções orbitais (se existir)
        const solutionsItems = document.querySelectorAll('.solution-orbit-item');
        if (solutionsItems.length > 0) {
            this.observeElements(solutionsItems, 'animate-in');
        }
    }

    initProductFeatures() {
        // Funcionalidades das páginas de produto
        const moduleCards = document.querySelectorAll('.module-card, .service-card');
        if (moduleCards.length > 0) {
            this.observeElements(moduleCards, 'animate-in');
        }
    }

    initGlobalFeatures() {
        // Intersection Observer para animações
        this.initScrollAnimations();
        
        // Lazy loading de imagens
        this.initLazyLoading();
        
        // Smooth scroll para links internos
        this.initSmoothScroll();
        
        // Analytics tracking (se necessário)
        this.initAnalytics();
    }

    initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.section-title, .section-subtitle, .hero-title, .hero-description, .card, .stat'
        );
        
        if (animatedElements.length > 0) {
            this.observeElements(animatedElements, 'fade-in-up');
        }
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Carrega a imagem
                        img.src = img.dataset.src;
                        
                        // Remove o atributo data-src para evitar reprocessamento
                        img.removeAttribute('data-src');
                        
                        // Remove classes relacionadas ao lazy loading
                        img.classList.remove('lazy');
                        
                        // Adiciona evento para quando a imagem carregar
                        img.addEventListener('load', function() {
                            // Adiciona classe fade-in para efeito suave
                            this.classList.add('loaded');
                        });
                        
                        // Para casos de erro no carregamento
                        img.addEventListener('error', function() {
                            console.warn('Erro ao carregar imagem:', this.dataset.src || this.src);
                            this.classList.add('error');
                        });
                        
                        // Para de observar esta imagem
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                // Configurações do observer
                threshold: 0.1,
                rootMargin: '50px 0px 50px 0px' // Carrega imagens um pouco antes de entrarem na viewport
            });

            // Observa todas as imagens lazy
            images.forEach(img => {
                // Adiciona classe inicial para styling
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
            
            console.log(`Lazy loading inicializado para ${images.length} imagens`);
        }
    }

    initSmoothScroll() {
        // Já implementado no HeaderComponent, mas pode ter funcionalidades adicionais aqui
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (target && this.currentPage === 'index') {
                e.preventDefault();
                const targetElement = document.querySelector(target.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    initAnalytics() {
        // Placeholder para analytics (Google Analytics, etc.)
        // Implementar conforme necessário
    }

    observeElements(elements, animationClass) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            observer.observe(el);
        });
    }

    // Método utilitário para reload de componentes
    async reloadComponents() {
        await this.loadComponents();
    }

    // Método para cleanup (se necessário)
    destroy() {
        // Cleanup de event listeners, observers, etc.
        this.components = {};
    }
}

// Inicializar app quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.aionApp = new AIONApp();
    window.aionApp.init();
});

// Disponibilizar globalmente para debug
window.AIONApp = AIONApp;

// Ativar o item do menu correspondente à página atual
const path = window.location.pathname;
if (path.includes('servicos.html')) {
    setActiveMenuItem('servicos.html');
} else if (path.includes('ecommerce.html')) {
    setActiveMenuItem('ecommerce.html');
} else {
    // Página inicial ou outra
    // Nenhuma ação específica necessária para o 'Home', pois não está no menu principal
} 