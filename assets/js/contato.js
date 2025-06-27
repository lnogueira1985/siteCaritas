// assets/js/contato.js

document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Alterna a classe 'active' no header para mudar o ícone
            header.classList.toggle('active');

            // Encontra o conteúdo do acordeão associado
            const accordionContent = header.nextElementSibling;

            // Alterna a classe 'active' no conteúdo para expandir/recolher
            accordionContent.classList.toggle('active');

            // Ajusta a altura máxima do conteúdo para a transição
            if (accordionContent.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = '0';
            }
        });
    });
});