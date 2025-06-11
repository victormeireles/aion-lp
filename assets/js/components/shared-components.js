// Sistema de Componentes Compartilhados AION
// Não requer módulos ES6 - funciona em qualquer ambiente

// Função para criar o Header/Navigation
function createHeader() {
    const config = window.AION_CONFIG;
    
    if (!config) {
        console.error('❌ AION_CONFIG não encontrado. Verifique se config.js foi carregado primeiro.');
        return '<div>Erro: Configuração não carregada</div>';
    }
    
    return `
        <!-- Barra de Progresso -->
        <div class="scroll-progress"></div>

        <!-- Header -->
        <header class="header">
            <nav class="nav">
                <a href="index.html" class="logo">
                    <img src="assets/logos/aionLogoWhite.svg" alt="AION Logo">
                </a>
                <ul class="nav-links">
                    ${config.navigation.main.map(item => {
                        if (item.dropdown) {
                            return `
                                <li class="nav-item">
                                    <a href="#${item.id}">${item.title}</a>
                                    <div class="dropdown-menu">
                                        ${item.dropdown.map(dropItem => `
                                            <a href="${dropItem.url}" ${dropItem.external ? 'target="_blank"' : ''} class="dropdown-item">
                                                <div class="dropdown-item-title">${dropItem.title}</div>
                                                <div class="dropdown-item-desc">${dropItem.description}</div>
                                            </a>
                                        `).join('')}
                                    </div>
                                </li>
                            `;
                        } else {
                            return `<li><a href="#${item.id}">${item.title}</a></li>`;
                        }
                    }).join('')}
                </ul>
                <a href="${config.urls.consultation}" target="_blank" class="nav-cta">Agendar Consultoria Gratuita</a>
            </nav>
        </header>
    `;
}

// Função para criar o Menu Mobile
function createMobileMenu() {
    const config = window.AION_CONFIG;
    
    if (!config) {
        console.error('❌ AION_CONFIG não encontrado para Menu Mobile.');
        return '<div>Erro: Configuração não carregada</div>';
    }
    
    return `
        <!-- Botão Hambúrguer -->
        <div id="hamburger" class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <!-- Menu Mobile -->
        <div id="mobile-menu" class="mobile-menu">
            <ul class="mobile-menu-links">
                <li><a href="index.html">Início</a></li>
                <li><a href="#solutions">Soluções</a></li>
                ${config.navigation.main[0].dropdown.map(item => `
                    <li style="padding-left: 1rem; border-left: 2px solid var(--color-purple);">
                        <a href="${item.url}" style="font-size: 0.9rem; color: var(--color-gray-400);">${item.title}</a>
                    </li>
                `).join('')}
                <li><a href="#ferramentas">Ferramentas de IA Gratuitas</a></li>
                ${config.navigation.main[1].dropdown.map(item => `
                    <li style="padding-left: 1rem; border-left: 2px solid var(--color-green);">
                        <a href="${item.url}" target="_blank" style="font-size: 0.9rem; color: var(--color-gray-400);">${item.title}</a>
                    </li>
                `).join('')}
                <li><a href="#cases">Cases</a></li>
                <li><a href="#founders">Fundadores</a></li>
                <li><a href="#contact">Contato</a></li>
            </ul>
        </div>
    `;
}

// Função para criar o Footer
function createFooter() {
    const config = window.AION_CONFIG;
    
    if (!config) {
        console.error('❌ AION_CONFIG não encontrado para Footer.');
        return '<div>Erro: Configuração não carregada</div>';
    }
    
    return `
        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-brand">
                        <img src="assets/logos/aionLogoWhite.svg" alt="AION Solution" class="footer-logo">
                        <p>${config.company.description}</p>
                        <div class="footer-social">
                            <a href="${config.urls.social.instagram}" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="${config.urls.social.linkedin}" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="${config.urls.social.youtube}" target="_blank" rel="noopener noreferrer">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div class="footer-links">
                        ${config.footer.sections.map(section => `
                            <div class="footer-section">
                                <h4>${section.title}</h4>
                                ${section.links.map(link => `
                                    <a href="${link.url}" ${link.external ? 'target="_blank"' : ''}>${link.title}</a>
                                `).join('')}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${config.company.year} ${config.company.name}. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    `;
}

// Função para criar o Botão WhatsApp Flutuante
function createWhatsAppButton() {
    const config = window.AION_CONFIG;
    
    if (!config) {
        console.error('❌ AION_CONFIG não encontrado para WhatsApp Button.');
        return '<div>Erro: Configuração não carregada</div>';
    }
    
    return `
        <!-- WhatsApp Floating Button -->
        <a href="${config.urls.whatsapp}" target="_blank" class="whatsapp-float">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
}

// Função para configurar event listeners após inserir o HTML
function setupEventListeners() {
    // Hambúrguer e Menu Mobile
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar em link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Scroll Progress Bar e Header Visibility
    const scrollProgress = document.querySelector('.scroll-progress');
    const header = document.querySelector('.header');
    const heroSection = document.getElementById('home');
    
    if (scrollProgress || header) {
        // Define o ponto em que o header deve aparecer.
        // Agora configurado para o meio da hero section.
        const showHeaderThreshold = heroSection ? (heroSection.offsetHeight / 2) : window.innerHeight * 0.5;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Barra de progresso
            if (scrollProgress) {
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                scrollProgress.style.width = scrollPercent + '%';
            }
            
            // Controle de visibilidade do header simplificado
            if (header) {
                if (scrollTop > showHeaderThreshold) {
                    header.classList.add('visible');
                    header.style.transform = 'translateY(0)';
                } else {
                    header.classList.remove('visible');
                    header.style.transform = 'translateY(-100%)';
                }
            }
        });
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para configurar o header (não mostra imediatamente)
function setupHeaderVisibility() {
    setTimeout(() => {
        const header = document.querySelector('.header');
        if (header) {
            // Header começa escondido - só aparece com scroll
            header.style.transform = 'translateY(-100%)';
            console.log('📱 Header configurado - aguardando scroll');
        } else {
            console.warn('⚠️ Header não encontrado para configurar');
        }
    }, 100);
}

// Função principal de inicialização
function initSharedComponents() {
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSharedComponents);
        return;
    }

    // Verifica se a configuração está disponível
    if (!window.AION_CONFIG) {
        console.error('❌ AION_CONFIG não está disponível. Aguardando...');
        // Tenta novamente após um breve delay
        setTimeout(initSharedComponents, 100);
        return;
    }

    // Insere os componentes nos containers
    const headerContainer = document.getElementById('shared-header');
    if (headerContainer) {
        headerContainer.innerHTML = createHeader();
    }

    const mobileMenuContainer = document.getElementById('shared-mobile-menu');
    if (mobileMenuContainer) {
        mobileMenuContainer.innerHTML = createMobileMenu();
    }

    const footerContainer = document.getElementById('shared-footer');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
    }

    const whatsappContainer = document.getElementById('shared-whatsapp');
    if (whatsappContainer) {
        whatsappContainer.innerHTML = createWhatsAppButton();
    }

    // Configura event listeners
    setupEventListeners();
    
    // Configura visibilidade do header (escondido inicialmente)
    setupHeaderVisibility();

    console.log('✅ AION Shared Components initialized successfully');
}

// Auto-inicialização quando o script é carregado
initSharedComponents(); 