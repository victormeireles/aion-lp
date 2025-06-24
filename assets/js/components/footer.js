import { AION_CONFIG } from './config.js';

export class FooterComponent {
    constructor(currentPage = 'index') {
        this.currentPage = currentPage;
        this.config = AION_CONFIG;
        this.faqData = null;
    }

    async loadFAQData() {
        try {
            const response = await fetch('assets/data/faq.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.faqData = await response.json();
        } catch (error) {
            console.error('Erro ao carregar dados do FAQ:', error);
            this.faqData = { [this.currentPage]: [] }; // Fallback vazio
        }
    }

    generateFAQHTML() {
        if (!this.faqData || !this.faqData[this.currentPage]) {
            return '<p>FAQ não disponível no momento.</p>';
        }

        const faqItems = this.faqData[this.currentPage];
        
        if (!faqItems || faqItems.length === 0) {
            return '<p>Nenhuma pergunta frequente disponível para esta página.</p>';
        }

        const faqSchemaItems = faqItems.map(item => `{
            "@type": "Question",
            "name": "${item.question}",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "${item.answer}"
            }
        }`).join(',');

        const faqItemsHTML = faqItems.map((item, index) => `
            <div class="faq-item" itemprop="mainEntity" itemscope itemtype="http://schema.org/Question">
                <div class="faq-question">
                    <h3 itemprop="name">${item.question}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" itemprop="acceptedAnswer" itemscope itemtype="http://schema.org/Answer">
                    <p itemprop="text">${item.answer}</p>
                </div>
            </div>
        `).join('');

        return `
            <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [${faqSchemaItems}]
            }
            </script>
            ${faqItemsHTML}
        `;
    }

    getFooterHTML() {
        const faqHTML = this.generateFAQHTML();
        
        return `
            <!-- FAQ Section -->
            <section class="section faq-section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Perguntas Frequentes</h2>
                        <p class="section-subtitle">Tire suas dúvidas sobre nossa empresa e soluções</p>
                    </div>
                    
                    <div class="faq-container">
                        ${faqHTML}
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-brand">
                            <img src="assets/logos/aionLogoWhite.svg" alt="${this.config.company.shortName}" class="footer-logo">
                            <p>${this.config.company.tagline}</p>
                            <div class="footer-social">
                                <a href="${this.config.social.instagram}" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-instagram"></i>
                                </a>
                                <a href="${this.config.social.linkedin}" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                                <a href="${this.config.social.youtube}" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div class="footer-links">
                            <div class="footer-section">
                                <h4>Soluções</h4>
                                ${this.config.navigation.products.map(product => `
                                    <a href="${product.href}">${product.name}</a>
                                `).join('')}
                            </div>
                            
                            <div class="footer-section">
                                <h4>Empresa</h4>
                                <a href="#about">Sobre Nós</a>
                                <a href="#founders">Fundadores</a>
                                <a href="#cases">Cases</a>
                                <a href="/politica-privacidade">Política de Privacidade</a>
                            </div>
                            
                            <div class="footer-section">
                                <h4>Contato</h4>
                                <a href="${this.config.consulting.free}" target="_blank">Consultoria Gratuita</a>
                                <a href="${this.config.company.whatsapp.url}" target="_blank" aria-label="Fale conosco pelo WhatsApp">WhatsApp</a>
                                <a href="mailto:${this.config.company.email}">E-mail</a>
                            </div>

                            <div class="footer-section">
                                <h4>Compartilhe</h4>
                                <div class="footer-sharing">
                                    <a href="#" class="share-facebook" aria-label="Compartilhar no Facebook"><i class="fab fa-facebook-f"></i></a>
                                    <a href="#" class="share-twitter" aria-label="Compartilhar no Twitter"><i class="fab fa-twitter"></i></a>
                                    <a href="#" class="share-linkedin" aria-label="Compartilhar no LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                                    <a href="#" class="share-whatsapp" aria-label="Compartilhar no WhatsApp"><i class="fab fa-whatsapp"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>&copy; 2025 ${this.config.company.name}. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        `;
    }

    async render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container com ID '${containerId}' não encontrado`);
        }

        // Carregar dados do FAQ antes de renderizar
        await this.loadFAQData();
        
        container.innerHTML = this.getFooterHTML();
        this.initializeFAQAccordion();
        this.initializeSharingButtons();
    }

    initializeFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fechar todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        otherAnswer.style.maxHeight = null;
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle do item atual
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    initializeSharingButtons() {
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        const shareText = `Confira isso: ${pageTitle}`;

        const shareLinks = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
            twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`,
            linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`,
            whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${pageUrl}`
        };

        const openShareWindow = (url) => {
            window.open(url, 'sharer', 'toolbar=0,status=0,width=580,height=325');
        };

        document.querySelector('.share-facebook')?.addEventListener('click', (e) => {
            e.preventDefault();
            openShareWindow(shareLinks.facebook);
        });
        document.querySelector('.share-twitter')?.addEventListener('click', (e) => {
            e.preventDefault();
            openShareWindow(shareLinks.twitter);
        });
        document.querySelector('.share-linkedin')?.addEventListener('click', (e) => {
            e.preventDefault();
            openShareWindow(shareLinks.linkedin);
        });
        document.querySelector('.share-whatsapp')?.addEventListener('click', (e) => {
            e.preventDefault();
            openShareWindow(shareLinks.whatsapp);
        });
    }

    // Método para atualizar FAQ dinamicamente
    async updateFAQ(newPage) {
        this.currentPage = newPage;
        await this.loadFAQData();
        
        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer) {
            faqContainer.innerHTML = this.generateFAQHTML();
            this.initializeFAQAccordion();
        }
    }
} 