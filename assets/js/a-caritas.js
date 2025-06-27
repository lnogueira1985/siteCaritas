document.addEventListener('DOMContentLoaded', () => {
    // --- ANIMAÇÕES DE SCROLL DA PÁGINA A CARITAS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Para de observar após a animação ocorrer uma vez
            }
        });
    }, {
        threshold: 0.25 // Inicia a animação quando 15% do elemento estiver visível
    });

    // Observa cada uma das seções que devem ser animadas
    const sectionsToAnimate = document.querySelectorAll('#mission-section, #values-section, #history-section, #cta-section');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
});