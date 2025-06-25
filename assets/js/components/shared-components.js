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
                                    <a href="${item.url || '#' + item.id}">${item.title}</a>
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
                            return `<li><a href="${item.url || '#' + item.id}">${item.title}</a></li>`;
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

        <!-- Overlay do Menu Mobile -->
        <div id="mobile-menu-overlay" class="mobile-menu-overlay"></div>

        <!-- Menu Mobile -->
        <div id="mobile-menu" class="mobile-menu">
            <div class="mobile-menu-header">
                <img src="assets/logos/aionLogoWhite.svg" alt="AION" class="mobile-menu-logo">
            </div>
            
            <ul class="mobile-menu-links">
                ${config.navigation.main.map(item => {
                    if (item.dropdown) {
                        return `
                            <li class="menu-dropdown">
                                <a href="${item.url || '#' + item.id}" class="dropdown-trigger">
                                    ${item.title} <i class="fas fa-chevron-down"></i>
                                </a>
                                <ul class="dropdown-content">
                                    ${item.dropdown.map(dropItem => `
                                        <li><a href="${dropItem.url}" ${dropItem.external ? 'target="_blank"' : ''}>• ${dropItem.title}</a></li>
                                    `).join('')}
                                </ul>
                            </li>
                        `;
                    } else {
                        return `<li><a href="${item.url || '#' + item.id}">${item.title}</a></li>`;
                    }
                }).join('')}
            </ul>
            
            <div class="mobile-menu-cta">
                <a href="${config.urls.whatsapp}" target="_blank">
                    Agendar Consultoria
                </a>
            </div>
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
                            <div class="footer-section ${section.type === 'sharing' ? 'footer-sharing-section' : ''}">
                                <h4>${section.title}</h4>
                                ${section.type === 'sharing' ? 
                                    `<div class="footer-sharing-buttons">
                                        ${section.links.map(link => `
                                            <a href="${link.url}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''} 
                                                                                               class="footer-share-btn" 
                                               title="Compartilhar no ${link.title}"
                                               aria-label="Compartilhar no ${link.title}">
                                                <i class="${link.icon}"></i>
                                            </a>
                                        `).join('')}
                                    </div>` 
                                    : 
                                    section.links.map(link => `
                                        <a href="${link.url}" ${link.external ? 'target="_blank"' : ''}>${link.title}</a>
                                    `).join('')
                                }
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

// Função para configurar dropdowns do menu mobile
function setupMobileDropdowns(mobileMenu) {
    if (!mobileMenu) return;
    
    const dropdownTriggers = mobileMenu.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        // Remover eventos anteriores para evitar duplicação
        trigger.removeEventListener('click', handleDropdownClick);
        trigger.addEventListener('click', handleDropdownClick);
    });
}

// Handler para clicks nos dropdowns
function handleDropdownClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Dropdown clicked!'); // Debug
    
    const trigger = e.currentTarget;
    const parentDropdown = trigger.closest('.menu-dropdown');
    const isActive = parentDropdown.classList.contains('active');
    
    // Fechar todos os outros dropdowns
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.querySelectorAll('.menu-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // Alternar o dropdown atual
    if (!isActive) {
        parentDropdown.classList.add('active');
        console.log('Dropdown opened!'); // Debug
    } else {
        console.log('Dropdown closed!'); // Debug
    }
}

// Função para configurar event listeners após inserir o HTML
function setupEventListeners() {
    // Hambúrguer e Menu Mobile
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    if (hamburger && mobileMenu) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.toggle('active');
            }
            // Bloquear scroll do body quando menu aberto
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        };

        hamburger.addEventListener('click', toggleMenu);

        // Fechar menu ao clicar no overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Fechar menu ao clicar em link (exceto dropdown triggers)
        const mobileLinks = mobileMenu.querySelectorAll('a:not(.dropdown-trigger)');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });

        // Fechar menu com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });

        // Inicializar dropdowns após menu ser criado
        setTimeout(() => {
            console.log('Setting up dropdowns from setupEventListeners...'); // Debug
            setupMobileDropdowns(mobileMenu);
        }, 200);
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
        
        // Configurar dropdowns após inserir HTML
        setTimeout(() => {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                console.log('Setting up mobile dropdowns...'); // Debug
                setupMobileDropdowns(mobileMenu);
            } else {
                console.log('Mobile menu not found!'); // Debug
            }
        }, 200);
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

// Função para compartilhamento nativo
function shareNative() {
    if (navigator.share) {
        const currentUrl = window.location.href;
        const pageTitle = document.title;
        
        navigator.share({
            title: pageTitle,
            text: 'Conheça a AION - Soluções de IA para empresas',
            url: currentUrl
        }).then(() => {
            console.log('Compartilhamento realizado com sucesso');
        }).catch((error) => {
            console.log('Erro no compartilhamento:', error);
            // Fallback para o compartilhamento manual
            copyToClipboard(currentUrl);
        });
    } else {
        // Fallback para navegadores que não suportam Web Share API
        copyToClipboard(window.location.href);
    }
}

// Função para copiar URL para clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('URL copiada para a área de transferência!');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// Fallback para copiar para clipboard
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('URL copiada para a área de transferência!');
    } catch (err) {
        console.error('Erro ao copiar:', err);
        showNotification('Erro ao copiar URL');
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-blue);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Adicionar botão de compartilhamento nativo como alternativa
function addNativeShareButton() {
    // Adiciona um botão de compartilhamento nativo se suportado
    if (navigator.share) {
        const shareButtons = document.querySelectorAll('.footer-sharing-buttons');
        shareButtons.forEach(container => {
            const nativeShareBtn = document.createElement('a');
            nativeShareBtn.href = '#';
            nativeShareBtn.className = 'footer-share-btn footer-native-share';
            nativeShareBtn.title = 'Compartilhar';
            nativeShareBtn.innerHTML = `
                <i class="fas fa-share-alt"></i>
            `;
            
            nativeShareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                shareNative();
            });
            
            container.appendChild(nativeShareBtn);
        });
    }
}

// Auto-inicialização quando o script é carregado
initSharedComponents();

// Adicionar botão nativo após componentes serem carregados
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addNativeShareButton, 1000);
}); 