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
                        title: "AION Vendas",
                        description: "Automatize campanhas, otimize anúncios e lote sua agenda",
                        url: "campanhas.html"
                    },
                    {
                        title: "Agentes de IA",
                        description: "WhatsApp automático e sites inteligentes",
                        url: "agentes.html"
                    },
                    {
                        title: "Consultoria AION",
                        description: "Estratégias baseadas em dados e IA",
                        url: "consultoria.html"
                    },
                    {
                        title: "AION E-Commerce",
                        description: "Decisões baseadas em dados",
                        url: "ecommerce.html"
                    }
                ]
            },
            {
                title: "Ferramentas de IA Gratuitas",
                id: "ferramentas",
                dropdown: [
                    {
                        title: "📊 Resumo Meta Ads por IA",
                        description: "Performance das campanhas no seu email diariamente",
                        url: "https://typebot.co/resumo-meta-ads-por-email",
                        external: true
                    },
                    {
                        title: "🚀 Criador de Campanhas",
                        description: "Primeiras campanhas Meta Ads e Google Ads",
                        url: "https://typebot.co/criador-de-campanhas-meta-ads",
                        external: true
                    },
                    {
                        title: "👥 Campanha de Indicação",
                        description: "Transforme clientes em embaixadores da marca",
                        url: "https://typebot.co/campanha-de-indicacao",
                        external: true
                    },
                    {
                        title: "🔄 Reativação de Clientes",
                        description: "Desperte clientes antigos com campanhas inteligentes",
                        url: "https://typebot.co/reativacao-de-clientes",
                        external: true
                    }
                ]
            },
            {
                title: "Cases",
                id: "cases"
            },
            {
                title: "Fundadores",
                id: "founders"
            },
            {
                title: "Contato",
                id: "contact"
            }
        ]
    },

    // Links do footer
    footer: {
        sections: [
            {
                title: "Soluções",
                links: [
                    { title: "AION Vendas", url: "campanhas.html" },
                    { title: "AION E-Commerce", url: "ecommerce.html" },
                    { title: "Soluções de IA", url: "agentes.html" },
                    { title: "Consultoria", url: "consultoria.html" }
                ]
            },
            {
                title: "Empresa",
                links: [
                    { title: "Sobre Nós", url: "#about" },
                    { title: "Fundadores", url: "#founders" },
                    { title: "Cases", url: "#cases" },
                    { title: "Política de Privacidade", url: "/politica-privacidade" }
                ]
            },
            {
                title: "Contato",
                links: [
                    { title: "Consultoria Gratuita", url: "https://www.aionsolution.com.br/request_consulting?type=u", external: true },
                    { title: "WhatsApp", url: "https://whatsa.me/5511965833332/?t=Oi!%20Vi%20o%20site%20de%20voc%C3%AAs%20e%20quero%20saber%20mais%20sobre%20o%20Aion.&type=phone_number&app_absent=0", external: true },
                    { title: "E-mail", url: "mailto:contato@aionsolution.com.br" }
                ]
            }
        ]
    }
}; 