document.addEventListener('DOMContentLoaded', function() {

    // Parallax Effect
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const video = document.querySelector('.hero-video');
        if (video) {
            video.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // Parallax for orbital solution items
        const solutionItems = document.querySelectorAll('.solution-orbit-item');
        solutionItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && window.innerWidth > 768) {
                const speed = 0.05 + (index * 0.01);
                const yPos = (rect.top - window.innerHeight / 2) * speed;
                const baseTransform = getComputedStyle(item).transform;
                item.style.transform = `${baseTransform} translateY(${yPos}px)`;
            }
        });

        // Parallax for solution icons
        const solutionIcons = document.querySelectorAll('.solution-orbit-icon');
        solutionIcons.forEach((icon, index) => {
            const rect = icon.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const rotation = (rect.top - window.innerHeight / 2) * 0.03;
                icon.style.transform = `rotate(${rotation}deg)`;
            }
        });
    }

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    // Video Management
    const heroVideo = document.querySelector('.hero-video');

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    }

    if (heroVideo) {
        heroVideo.addEventListener('loadedmetadata', function() {
            heroVideo.playbackRate = 0.7;
        });

        heroVideo.addEventListener('error', function() {
            console.log('Video failed to load');
            heroVideo.style.display = 'none';
        });
    }

    // Smooth Scrolling
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

    // Contact CTA Hover Effects
    const contactCta = document.querySelector('.contact-main-cta');
    if (contactCta) {
        contactCta.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(59, 130, 246, 0.1);
                width: 0;
                height: 0;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Initialize Scroll Events
    window.addEventListener('scroll', () => {
        updateParallax();
    });

    // Observe elements for animation
    document.querySelectorAll('.about-card, .solution-orbit-item, .contact-main-cta, .case-card, .founder-card, .founders-credibility').forEach(el => {
        observer.observe(el);
    });

    // Solution Cards Hover Effects
    document.querySelectorAll('.solution-orbit-item').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(139, 69, 255, 0.1);
                width: 0;
                height: 0;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Brasil image rotation effect
    const brasilImage = document.querySelector('.brasil-image');
    if (brasilImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            brasilImage.style.transform = `rotate(${rate * 0.02}deg)`;
        });
    }

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                margin-left: -150px;
                margin-top: -150px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize on load
    window.addEventListener('load', () => {
        // Funções de inicialização que dependem de todos os recursos carregados
    });

    // Solutions Interactive Zoom System
    function initSolutionsZoom() {
        const solutionCards = document.querySelectorAll('.solution-orbit-item');
        const solutionsSection = document.querySelector('.solutions-section');
        const solutionsContainer = document.querySelector('.solutions-container');
        
        solutionCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get solution data
                const title = this.querySelector('.solution-orbit-title').textContent;
                const subtitle = this.querySelector('.solution-orbit-subtitle').textContent;
                const href = this.querySelector('.solution-orbit-cta').getAttribute('href');
                
                // Create expanded view
                createExpandedSolutionView(title, subtitle, href);
            });
        });
    }

    function createExpandedSolutionView(title, subtitle, href) {
        const expandedHtml = `
            <div class="brasil-expanded-content">
                <p>Atendemos clientes em todo o Brasil, de pequenas a grandes empresas.</p>
                
            </div>
        `;
        
        const rangeLabel = document.querySelector('.range-label');
        const rangeValue = document.querySelector('.range-value');
        
        document.body.insertAdjacentHTML('beforeend', expandedHtml);
        
        // Add close functionality
        const closeBtn = document.querySelector('.solution-close-btn');
        const overlay = document.querySelector('.solution-expanded-overlay');
        
        closeBtn.addEventListener('click', closeSolutionView);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeSolutionView();
            }
        });
        
        // Animate in
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
    }

    function closeSolutionView() {
        const overlay = document.querySelector('.solution-expanded-overlay');
        overlay.classList.remove('active');
        
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }

    function getSolutionFeatures(title) {
        const features = {
            'AION Campanhas': `
                <div class="feature-item">
                    <i class="fas fa-robot"></i>
                    <span>Automação completa de campanhas</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-calendar-check"></i>
                    <span>Agendamento inteligente</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-target"></i>
                    <span>Segmentação avançada por IA</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-chart-line"></i>
                    <span>Otimização contínua de performance</span>
                </div>
            `,
            'AION Tráfego': `
                <div class="feature-item">
                    <i class="fas fa-brain"></i>
                    <span>IA para otimização de anúncios</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-chart-bar"></i>
                    <span>Relatórios diários automáticos</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-bullseye"></i>
                    <span>Segmentação inteligente</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-money-bill-trend-up"></i>
                    <span>Redução de custo por aquisição</span>
                </div>
            `,
            'AION Sites': `
                <div class="feature-item">
                    <i class="fas fa-code"></i>
                    <span>Sites criados por IA</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-search"></i>
                    <span>Otimização SEO/AEO automática</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-mobile-alt"></i>
                    <span>Design responsivo perfeito</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-rocket"></i>
                    <span>Velocidade otimizada</span>
                </div>
            `,
            'Atendente AION': `
                <div class="feature-item">
                    <i class="fas fa-comments"></i>
                    <span>Atendimento 24/7 automatizado</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-database"></i>
                    <span>Treinado com seus dados</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-heart"></i>
                    <span>Conversas humanizadas</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-cogs"></i>
                    <span>Integração completa com CRM</span>
                </div>
            `,
            'AION E-Commerce': `
                <div class="feature-item">
                    <i class="fas fa-chart-pie"></i>
                    <span>Business Intelligence completo</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-sync"></i>
                    <span>Integração de dados em tempo real</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-lightbulb"></i>
                    <span>Insights automáticos de vendas</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-trending-up"></i>
                    <span>Previsões de demanda</span>
                </div>
            `
        };
        
        return features[title] || '';
    }

    function getSolutionBenefits(title) {
        const benefits = {
            'AION Campanhas': `
                <ul class="benefits-list">
                    <li>Aumento de 300% na geração de leads qualificados</li>
                    <li>Redução de 80% no tempo gasto com campanhas</li>
                    <li>ROI médio de 450% em 90 dias</li>
                    <li>Agendas lotadas sem esforço manual</li>
                </ul>
            `,
            'AION Tráfego': `
                <ul class="benefits-list">
                    <li>Redução de 60% no custo por aquisição</li>
                    <li>Aumento de 200% na taxa de conversão</li>
                    <li>Otimização automática 24/7</li>
                    <li>Relatórios insights diários</li>
                </ul>
            `,
            'AION Sites': `
                <ul class="benefits-list">
                    <li>Site profissional em 48 horas</li>
                    <li>Rankeamento orgânico mais rápido</li>
                    <li>Aumento de 150% na velocidade</li>
                    <li>Investimento único de R$ 999</li>
                </ul>
            `,
            'Atendente AION': `
                <ul class="benefits-list">
                    <li>Redução de 90% no tempo de resposta</li>
                    <li>Atendimento humanizado 24/7</li>
                    <li>Aumento de 70% na satisfação do cliente</li>
                    <li>Qualificação automática de leads</li>
                </ul>
            `,
            'AION E-Commerce': `
                <ul class="benefits-list">
                    <li>Visão completa do negócio em tempo real</li>
                    <li>Decisões baseadas em dados precisos</li>
                    <li>Aumento médio de 40% no faturamento</li>
                    <li>Automação de relatórios gerenciais</li>
                </ul>
            `
        };
        
        return benefits[title] || '';
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize solutions zoom system - temporarily disabled
        // initSolutionsZoom();
    });

    // FAQ Functionality
    function initFAQ() {
        console.log('Inicializando FAQ...');
        const faqItems = document.querySelectorAll('.faq-item');
        console.log('FAQ items encontrados:', faqItems.length);
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = question ? question.querySelector('i') : null;
            
            console.log(`FAQ item ${index}:`, { question: !!question, answer: !!answer, icon: !!icon });
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    console.log(`FAQ item ${index} clicado`);
                    const isOpen = item.classList.contains('active');
                    
                    // Fechar todos os outros FAQs
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherIcon = otherItem.querySelector('.faq-question i');
                            if (otherAnswer) otherAnswer.style.maxHeight = null;
                            if (otherIcon) {
                                otherIcon.classList.remove('fa-chevron-up');
                                otherIcon.classList.add('fa-chevron-down');
                            }
                        }
                    });
                    
                    // Toggle do item atual
                    if (isOpen) {
                        console.log('Fechando FAQ');
                        item.classList.remove('active');
                        answer.style.maxHeight = null;
                        if (icon) {
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    } else {
                        console.log('Abrindo FAQ');
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        if (icon) {
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-up');
                        }
                    }
                });
            }
        });
    }

    // Lazy Loading de Imagens
    function initLazyLoading() {
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

    // Initialize FAQ when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initFAQ();
        initLazyLoading(); // Inicializar lazy loading
    });

    // Também inicializar se a página já estiver carregada
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initFAQ();
            initLazyLoading();
        });
    } else {
        initFAQ();
        initLazyLoading();
    }

}); 