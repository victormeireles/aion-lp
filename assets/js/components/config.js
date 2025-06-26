/* eslint-disable no-unused-vars */

// Configurações centralizadas da aplicação AION
window.AION_CONFIG = {
    // Informações da empresa
    company: {
        name: "AION SOLUTION TECNOLOGIA EM INFORMACOES LTDA",
        shortName: "AION Solution",
        description: "Transformando pequenas empresas com inteligência artificial.",
        year: "2024"
    },

    // URLs principais
    urls: {
        consultation: "https://www.aionsolution.com.br/request_consulting?type=u",
        whatsapp: "https://whatsa.me/5511965833332/?t=Oi!%20Vi%20o%20site%20de%20voc%C3%AAs%20e%20quero%20saber%20mais%20sobre%20o%20Aion.&type=phone_number&app_absent=0",
        email: "mailto:contato@aionsolution.com.br",
        privacy: "/politica-privacidade",
        social: {
            instagram: "https://instagram.com/aionsolution",
            linkedin: "https://linkedin.com/company/aionsolution",
            youtube: "https://youtube.com/aionsolution"
        },
        tools: {
            metaAds: "https://typebot.co/resumo-meta-ads-por-email",
            campaigns: "https://typebot.co/criador-de-campanhas-meta-ads",
            referral: "https://typebot.co/campanha-de-indicacao",
            reactivation: "https://typebot.co/reativacao-de-clientes"
        }
    },

    // Estrutura de navegação
    navigation: {
        main: [
            {
                title: "Soluções",
                id: "solutions",
                dropdown: [
                    {
                        title: "Para Empresas de Serviços",
                        description: "Otimize sua operação e atendimento.",
                        url: "servicos.html"
                    },
                    {
                        title: "Para E-commerces",
                        description: "Transforme dados em lucro e eficiência.",
                        url: "ecommerce.html"
                    },
                    {
                        title: "Consultoria Estratégica",
                        description: "Estratégias de quem transformou bilhões.",
                        url: "consultoria.html"
                    }
                ]
            },
            {
                title: "Cases",
                id: "cases",
                url: "index.html#cases"
            },
            {
                title: "Fundadores",
                id: "fundadores",
                url: "index.html#founders"
            }
        ]
    },

    // Links do footer
    footer: {
        sections: [
            {
                title: "Soluções",
                links: [
                    { title: "Para Empresas de Serviços", url: "servicos.html" },
                    { title: "Para E-commerces", url: "ecommerce.html" },
                    { title: "Consultoria Estratégica", url: "consultoria.html" },
                ]
            },
            {
                title: "Empresa",
                links: [
                    { title: "Sobre Nós", url: "index.html#founders" },
                    { title: "Cases", url: "index.html#cases" },
                    { title: "Política de Privacidade", url: "#" }
                ]
            },
            {
                title: "Contato",
                links: [
                    { title: "Consultoria Gratuita", url: "https://www.aionsolution.com.br/request_consulting?type=u", external: true },
                    { title: "WhatsApp", url: "https://whatsa.me/5511965833332/?t=Oi!%20Vi%20o%20site%20de%20voc%C3%AAs%20e%20quero%20saber%20mais%20sobre%20o%20Aion.&type=phone_number&app_absent=0", external: true },
                    { title: "E-mail", url: "mailto:contato@aionsolution.com.br" }
                ]
            },
            {
                title: "Compartilhar",
                type: "sharing",
                links: [
                    { 
                        title: "Facebook", 
                        url: "https://www.facebook.com/dialog/share?href=https%3A%2F%2Fwww.aionsolution.com.br&app_id=289255557788943",
                        icon: "fab fa-facebook-f",
                        external: true 
                    },
                    { 
                        title: "WhatsApp", 
                        url: "https://api.whatsapp.com/send?text=Conheça%20a%20AION%20-%20Soluções%20de%20IA%20para%20empresas%20https%3A%2F%2Fwww.aionsolution.com.br",
                        icon: "fab fa-whatsapp",
                        external: true 
                    },
                    { 
                        title: "LinkedIn", 
                        url: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.aionsolution.com.br",
                        icon: "fab fa-linkedin-in",
                        external: true 
                    },
                    { 
                        title: "Twitter", 
                        url: "https://twitter.com/intent/tweet?text=Conheça%20a%20AION%20-%20Soluções%20de%20IA%20para%20empresas&url=https%3A%2F%2Fwww.aionsolution.com.br",
                        icon: "fab fa-twitter",
                        external: true 
                    }
                ]
            }
        ]
    }
};

// Configuração de navegação e rodapé
const navLinks = [
    { 
        title: "Soluções", 
        isDropdown: true,
        dropdownLinks: [
            { title: "Para Empresas de Serviços", url: "servicos.html", description: "Otimize sua operação e atendimento." },
            { title: "Para E-commerces", url: "ecommerce.html", description: "Transforme dados em lucro e eficiência." },
            { title: "Consultoria Estratégica", url: "consultoria.html", description: "Estratégias de quem transformou bilhões." }
        ]
    },
    { title: "Cases", url: "index.html#cases" },
    { title: "Fundadores", url: "index.html#founders" }
];

const footerSections = {
    services: {
        title: "Soluções",
        links: [
            { title: "Para Empresas de Serviços", url: "servicos.html" },
            { title: "Para E-commerces", url: "ecommerce.html" },
            { title: "Consultoria Estratégica", url: "consultoria.html" },
        ]
    },
    company: {
        title: "Institucional",
        links: [
            { title: "Home", url: "index.html" },
            { title: "Sobre Nós", url: "index.html#founders" },
            { title: "Cases", url: "index.html#cases" }
        ]
    },
    legal: {
        title: "Legal",
        links: [
            { title: "Política de Privacidade", url: "#" },
            { title: "Termos de Uso", url: "#" }
        ]
    }
};

const socialLinks = {
    linkedin: "https://www.linkedin.com/company/aion-solution/",
    instagram: "https://www.instagram.com/aion.solution/"
};


// Dados para componentes dinâmicos (SEO, Testemunhos, FAQ)
const testimonials = [
    {
        name: "Victor Meireles",
        role: "Fundador da AION",
        image: "assets/images/victorMeireles.webp",
        social: {
            linkedin: "https://www.linkedin.com/in/victor-meireles-desenvolvedor/"
        },
        quote: "Nosso objetivo na AION é transformar a complexidade dos dados em decisões simples e inteligentes para os nossos clientes. Usamos IA não como uma 'solução mágica', mas como uma ferramenta poderosa para gerar resultados reais e mensuráveis."
    },
    {
        name: "Gustavo Martins",
        role: "Fundador da AION",
        image: "assets/images/gustavoMartins.webp",
        social: {
            linkedin: "https://www.linkedin.com/in/gustavo-martins-de-oliveira-959334139/"
        },
        quote: "Acreditamos que a verdadeira inovação vem da aplicação prática da tecnologia. Na AION, construímos soluções que se integram perfeitamente às operações dos clientes, otimizando processos e liberando tempo para que eles foquem no que realmente importa: o crescimento do negócio."
    }
];


const faqData = [
    {
        "question": "Como a AION garante a segurança dos meus dados?",
        "answer": "A segurança é nossa prioridade máxima. Utilizamos criptografia de ponta para dados em trânsito e em repouso, seguimos as melhores práticas de segurança da informação e estamos em conformidade com a LGPD. Seus dados são processados em ambientes seguros e com acesso restrito."
    },
    {
        "question": "Preciso ter conhecimento técnico para usar as soluções da AION?",
        "answer": "Não. Nossas soluções são desenhadas para serem intuitivas e fáceis de usar. Fornecemos dashboards e interfaces amigáveis que apresentam os insights de forma clara. Além disso, oferecemos treinamento e suporte para garantir que sua equipe aproveite ao máximo a plataforma."
    },
    {
        "question": "A solução da AION se integra com os sistemas que já uso?",
        "answer": "Sim. Nossa plataforma é projetada para ser flexível e se integrar com uma vasta gama de sistemas, como ERPs (Bling, Tiny), plataformas de marketing (Google Ads, Meta Ads) e outras ferramentas de mercado. A integração é um passo fundamental do nosso processo de onboarding."
    },
    {
        "question": "Quanto tempo leva para ver os primeiros resultados?",
        "answer": "No nosso plano de organização de dados para e-commerce, você já tem uma base de dados centralizada e os primeiros dashboards em até 30 dias. Para soluções de IA mais complexas, como otimização de atendimento, os resultados iniciais podem ser percebidos nas primeiras semanas de uso."
    },
    {
        "question": "O que diferencia a AION de outras empresas de dados e IA?",
        "answer": "Nosso principal diferencial é o foco em resultados de negócio. Não entregamos apenas tecnologia, entregamos uma solução completa que inclui consultoria, implementação e acompanhamento. Somos parceiros na jornada de transformação digital dos nossos clientes, garantindo que o investimento em IA se traduza em crescimento real."
    }
];


const seoData = {
    "default": {
        title: "AION - Inteligência Artificial para Empresas de Serviço",
        description: "Transforme seus dados em lucro. A AION oferece soluções de IA para otimizar atendimento, vendas e operações em empresas de serviço.",
        keywords: "Inteligência Artificial, IA para serviços, automação de atendimento, otimização de vendas, análise de dados, AION",
        ogImage: "assets/images/solutions/servicos.webp"
    },
    "servicos.html": {
        title: "AION | Soluções de IA para Empresas de Serviço",
        description: "Automatize seu atendimento com assistentes de IA, otimize suas vendas com campanhas inteligentes e transforme sua operação. Conheça as soluções da AION para serviços.",
        keywords: "assistente de IA, vendas com IA, automação para serviços, IA para agendamento, gestão de clientes",
        ogImage: "assets/images/solutions/servicos.webp"
    },
    "ecommerce.html": {
        title: "AION | Inteligência de Dados para E-commerce",
        description: "Organize seus dados em 30 dias e ative módulos de IA para otimizar marketing, estoque e pricing. Transforme a gestão do seu e-commerce com a AION.",
        keywords: "BI para e-commerce, dados para e-commerce, IA para e-commerce, otimização de estoque, pricing inteligente",
        ogImage: "assets/images/solutions/aion-ecommerce.webp"
    }
}; 