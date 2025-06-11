import { AION_CONFIG } from './config.js';

export class HeaderComponent {
    constructor(currentPage = 'index') {
        this.currentPage = currentPage;
        this.config = AION_CONFIG;
    }

    generateNavigation() {
        const nav = this.config.navigation;
        
        // Menu principal
        const mainMenuItems = nav.main.map(item => `
            <a href="${item.href}" class="nav-link ${this.currentPage === item.page ? 'active' : ''}">${item.name}</a>
        `).join('');

        // Menu soluções
        const solutionsMenuItems = nav.products.map(item => `
            <a href="${item.href}" class="dropdown-item">
                <strong>${item.name}</strong>
                <span class="dropdown-description">${item.description}</span>
            </a>
        `).join('');

        // Menu ferramentas
        const toolsMenuItems = nav.tools.map(item => `
            <a href="${item.href}" target="_blank" class="dropdown-item">
                <strong>${item.name}</strong>
                <span class="dropdown-description">${item.description}</span>
            </a>
        `).join('');

        return {
            mainMenuItems,
            solutionsMenuItems,
            toolsMenuItems
        };
    }

    generateMobileNavigation() {
        const nav = this.config.navigation;
        
        // Menu mobile
        const mobileMenuItems = nav.main.map(item => `
            <a href="${item.href}" class="mobile-nav-link ${this.currentPage === item.page ? 'active' : ''}">${item.name}</a>
        `).join('');

        const mobileSolutionsItems = nav.products.map(item => `
            <a href="${item.href}" class="mobile-submenu-item">${item.name}</a>
        `).join('');

        const mobileToolsItems = nav.tools.map(item => `
            <a href="${item.href}" target="_blank" class="mobile-submenu-item">${item.name}</a>
        `).join('');

        return {
            mobileMenuItems,
            mobileSolutionsItems,
            mobileToolsItems
        };
    }

    getHeaderHTML() {
        const { mainMenuItems, solutionsMenuItems, toolsMenuItems } = this.generateNavigation();
        const { mobileMenuItems, mobileSolutionsItems, mobileToolsItems } = this.generateMobileNavigation();

        return `
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <a href="/" class="brand-link">
                            <img src="assets/logos/aionLogoWhite.svg" alt="AION Solution" class="brand-logo">
                        </a>
                    </div>

                    <!-- Desktop Navigation -->
                    <div class="navbar-menu" id="navbar-menu">
                        <div class="navbar-nav">
                            ${mainMenuItems}

                            <!-- Soluções Dropdown -->
                            <div class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle">
                                    Soluções
                                    <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="dropdown-menu">
                                    ${solutionsMenuItems}
                                </div>
                            </div>

                            <!-- Ferramentas de IA Gratuitas Dropdown -->
                            <div class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle">
                                    Ferramentas de IA Gratuitas
                                    <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="dropdown-menu">
                                    ${toolsMenuItems}
                                </div>
                            </div>

                            <!-- CTA Button -->
                            <a href="${this.config.consulting.free}" target="_blank" class="nav-cta">
                                Consultoria Gratuita
                            </a>
                        </div>
                    </div>

                    <!-- Mobile Menu Toggle -->
                    <div class="navbar-toggle" id="navbar-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <!-- Mobile Navigation -->
                <div class="mobile-nav" id="mobile-nav">
                    <div class="mobile-nav-content">
                        ${mobileMenuItems}

                        <!-- Mobile Soluções -->
                        <div class="mobile-nav-item">
                            <button class="mobile-nav-link mobile-dropdown-toggle">
                                Soluções
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="mobile-submenu">
                                ${mobileSolutionsItems}
                            </div>
                        </div>

                        <!-- Mobile Ferramentas -->
                        <div class="mobile-nav-item">
                            <button class="mobile-nav-link mobile-dropdown-toggle">
                                Ferramentas de IA Gratuitas
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="mobile-submenu">
                                ${mobileToolsItems}
                            </div>
                        </div>

                        <!-- Mobile CTA -->
                        <a href="${this.config.consulting.free}" target="_blank" class="mobile-cta">
                            Consultoria Gratuita
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }

    async render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container com ID '${containerId}' não encontrado`);
        }

        container.innerHTML = this.getHeaderHTML();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('navbar-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        
        if (mobileToggle && mobileNav) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                mobileNav.classList.toggle('active');
                document.body.classList.toggle('mobile-nav-open');
            });
        }

        // Desktop dropdown functionality
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                let hoverTimeout;
                
                dropdown.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        dropdown.classList.remove('active');
                    }, 200);
                });
            }
        });

        // Mobile dropdown functionality
        const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-toggle');
        mobileDropdowns.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const submenu = toggle.nextElementSibling;
                const icon = toggle.querySelector('i');
                
                toggle.classList.toggle('active');
                submenu.classList.toggle('active');
                icon.style.transform = toggle.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            });
        });

        // Smooth scroll for internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (this.currentPage === 'index') {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        if (mobileNav && mobileNav.classList.contains('active')) {
                            mobileToggle.classList.remove('active');
                            mobileNav.classList.remove('active');
                            document.body.classList.remove('mobile-nav-open');
                        }
                    }
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileNav && mobileNav.classList.contains('active')) {
                if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                    mobileToggle.classList.remove('active');
                    mobileNav.classList.remove('active');
                    document.body.classList.remove('mobile-nav-open');
                }
            }
        });
    }

    updatePageTitle() {
        const pageConfig = this.config.pages[this.currentPage];
        if (pageConfig) {
            document.title = pageConfig.title;
            
            // Update meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', pageConfig.description);
            }
            
            // Update meta keywords if exists
            if (pageConfig.keywords) {
                let metaKeywords = document.querySelector('meta[name="keywords"]');
                if (!metaKeywords) {
                    metaKeywords = document.createElement('meta');
                    metaKeywords.setAttribute('name', 'keywords');
                    document.head.appendChild(metaKeywords);
                }
                metaKeywords.setAttribute('content', pageConfig.keywords);
            }
        }
    }
} 