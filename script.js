// script.js — versão resiliente (colocar no fim do body ou usar <script src="script.js" defer>)

// placeholders via.placeholder + fallback inline SVG caso o carregamento falhe
const defaultBefore = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="720">
    <rect width="100%" height="100%" fill="#e6e6e6"/>
    <text x="50%" y="50%" font-size="56" fill="#9a9a9a" text-anchor="middle" dominant-baseline="middle">ANTES</text>
  </svg>`
);
const defaultAfter = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="720">
    <rect width="100%" height="100%" fill="#f5f5f5"/>
    <text x="50%" y="50%" font-size="56" fill="#9a9a9a" text-anchor="middle" dominant-baseline="middle">DEPOIS</text>
  </svg>`
);

// Dados das categorias (usando placeholders públicos; se algum falhar, o fallback SVG será usado)
const categories = [
    {
        id: "afinamento", title: "Afinamento Capilar", subtitle: "Nossa Maior Especialidade",
        description: "Tratamentos específicos para cabelos finos e com pouco volume, devolvendo densidade e força.",
        image: "https://via.placeholder.com/1080x720.png?text=Antes",
        afterImage: "https://via.placeholder.com/1080x720.png?text=Depois",
        featured: true
    },
    {
        id: "queda", title: "Queda Capilar",
        description: "Tratamentos eficazes para diferentes tipos de queda, fortalecendo os fios desde a raiz.",
        image: "https://via.placeholder.com/1080x720.png?text=Antes",
        afterImage: "https://via.placeholder.com/1080x720.png?text=Depois"
    },
    {
        id: "inflamacao", title: "Inflamação",
        description: "Cuidados especializados para couro cabeludo inflamado, proporcionando alívio e cicatrização.",
        image: "https://via.placeholder.com/1080x720.png?text=Antes",
        afterImage: "https://via.placeholder.com/1080x720.png?text=Depois"
    },
    {
        id: "transicao", title: "Transição Capilar",
        description: "Acompanhamento completo para quem está assumindo a textura natural dos cabelos.",
        image: "https://via.placeholder.com/1080x720.png?text=Antes",
        afterImage: "https://via.placeholder.com/1080x720.png?text=Depois"
    },
    {
        id: "volume", title: "Volume e Comprimento",
        description: "Técnicas para aumentar o volume natural e promover o crescimento saudável dos fios.",
        image: "https://via.placeholder.com/1080x720.png?text=Antes",
        afterImage: "https://via.placeholder.com/1080x720.png?text=Depois"
    },
    {
        id: "pontas", title: "Recuperação de Pontas",
        description: "Tratamentos intensivos para reparar pontas ressecadas e danificadas.",
        image: "https://via.placeholder.com/1080x720.png?text=Antes",
        afterImage: "https://via.placeholder.com/1080x720.png?text=Depois"
    },
    {
        id: "descoloridos", title: "Cabelos Descoloridos",
        description: "Reconstrução e hidratação intensiva para cabelos danificados por processos químicos.",
        image: "https://via.placeholder.com/1080x720.png?text=Antes",
        afterImage: "https://via.placeholder.com/1080x720.png?text=Depois"
    },
    {
        id: "peso", title: "Cabelos Sem Volume e Peso",
        description: "Soluções para cabelos oleosos e pesados, devolvendo leveza e movimento.",
        image: "https://via.placeholder.com/1080x720.png?text=Antes",
        afterImage: "https://via.placeholder.com/1080x720.png?text=Depois"
    }
];

// estado
let activeCategory = 'afinamento';
let isMobileMenuOpen = false;

// scroll suave
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    if (isMobileMenuOpen) toggleMobileMenu();
}

// toggle mobile menu
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');
    if (!mobileNav || !menuIcon) return;
    isMobileMenuOpen = !isMobileMenuOpen;
    mobileNav.classList.toggle('active', isMobileMenuOpen);
    menuIcon.textContent = isMobileMenuOpen ? '✕' : '☰';
}

// atualiza categoria e conteúdo
function setActiveCategory(categoryId) {
    activeCategory = categoryId;
    // abas
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-category') === categoryId);
    });

    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    // textos
    const titleEl = document.getElementById('category-title');
    const subtitleEl = document.getElementById('category-subtitle');
    const descEl = document.getElementById('category-description');
    if (titleEl) titleEl.textContent = category.title || '';
    if (subtitleEl) {
        if (category.subtitle) { subtitleEl.style.display = 'block'; subtitleEl.textContent = category.subtitle; }
        else subtitleEl.style.display = 'none';
    }
    if (descEl) descEl.textContent = category.description || '';

    // imagens — BEFORE (tem id no HTML)
    const beforeImg = document.getElementById('before-image');
    if (beforeImg) {
        beforeImg.onerror = () => { beforeImg.src = defaultBefore; };
        beforeImg.src = category.image || defaultBefore;
        beforeImg.alt = `Antes - ${category.title}`;
        beforeImg.loading = 'lazy';
    }

    // imagens — AFTER (tenta por id, se não existir usa querySelector)
    const afterImg = document.getElementById('after-image') || document.querySelector('.after-image-container img');
    if (afterImg) {
        afterImg.onerror = () => { afterImg.src = defaultAfter; };
        afterImg.src = category.afterImage || defaultAfter;
        afterImg.alt = `Depois - ${category.title}`;
        afterImg.loading = 'lazy';
    }

    // depoimento
    const testimonial = document.getElementById('testimonial-author');
    if (testimonial) testimonial.textContent = `- Cliente Satisfeita, ${category.title}`;
}

// inicialização
document.addEventListener('DOMContentLoaded', () => {
    // liga os botões das abas caso não estejam com onclick em HTML
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const cat = tab.getAttribute('data-category');
            if (cat) setActiveCategory(cat);
        });
    });

    // mobile nav links (fecha menu)
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileMenuOpen) toggleMobileMenu();
        });
    });

    // fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
        const mobileNav = document.getElementById('mobile-nav');
        const menuButton = document.querySelector('.menu-toggle');
        if (!mobileNav || !menuButton) return;
        if (isMobileMenuOpen && !mobileNav.contains(e.target) && !menuButton.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // ESC fecha menu
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && isMobileMenuOpen) toggleMobileMenu();
    });

    // smooth anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // categoria inicial
    setActiveCategory(activeCategory);
});
