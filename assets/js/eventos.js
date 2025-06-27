document.addEventListener('DOMContentLoaded', () => {
    // --- Múltiplos Carrosséis de Eventos Passados ---

    // Função para inicializar um único carrossel
    function initializeEventCarousel(carouselContainer) {
        // Seleciona os elementos específicos DESTE carrossel
        const carouselImagesContainer = carouselContainer.querySelector('.event-carousel-images');
        const images = carouselImagesContainer.querySelectorAll('img');
        const prevButton = carouselContainer.querySelector('.event-carousel-nav.prev');
        const nextButton = carouselContainer.querySelector('.event-carousel-nav.next');

        let currentImageIndex = 0; // Índice da imagem atual para ESTE carrossel
        let autoSlideInterval;     // Intervalo para o auto-slide DESTE carrossel
        const slideDuration = 5000; // Tempo em milissegundos para cada slide (5 segundos)

        // Se não houver imagens ou apenas uma, desativa os botões e não inicia o auto-slide
        if (images.length <= 1) {
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            return; // Sai da função se não houver necessidade de carrossel
        }

        // Função para mostrar a imagem atual ajustando o 'transform'
        function showImage(index) {
            // Calcula o deslocamento horizontal para mostrar a imagem correta
            // Multiplica o índice pela largura de 100% (da imagem) e nega para mover para a esquerda
            const offset = -index * 100;
            carouselImagesContainer.style.transform = `translateX(${offset}%)`;

            // Atualiza o índice, garantindo que ele esteja sempre dentro dos limites
            currentImageIndex = index;
        }

        // Função para navegar para a próxima imagem (circular)
        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        }

        // Função para navegar para a imagem anterior (circular)
        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        }

        // Função para iniciar a navegação automática
        function startAutoSlide() {
            clearInterval(autoSlideInterval); // Limpa qualquer intervalo anterior para evitar duplicação
            autoSlideInterval = setInterval(nextImage, slideDuration);
        }

        // Função para parar a navegação automática
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Adiciona event listeners aos botões de navegação
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                stopAutoSlide(); // Pausa o auto-slide ao interagir manualmente
                prevImage();
                startAutoSlide(); // Reinicia o auto-slide após a interação
            });
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                stopAutoSlide(); // Pausa o auto-slide ao interagir manualmente
                nextImage();
                startAutoSlide(); // Reinicia o auto-slide após a interação
            });
        }

        // Opcional: Pausar o carrossel ao passar o mouse sobre ele e reiniciar ao sair
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);

        // --- Inicialização do Carrossel ---
        // Mostra a primeira imagem imediatamente
        showImage(currentImageIndex);

        // Inicia o auto-slide apenas se houver mais de uma imagem
        if (images.length > 1) {
            startAutoSlide();
        }
    }

    // --- Início do Script Principal ---
    // Encontra TODOS os contêineres de carrossel de eventos passados na página
    const allEventCarousels = document.querySelectorAll('.event-carousel-container');

    // Para cada contêiner de carrossel encontrado, inicializa a funcionalidade
    allEventCarousels.forEach(carousel => {
        initializeEventCarousel(carousel);
    });

    // --- Animações de Scroll da Página A Caritas (se ainda estiver aqui, remova para a-caritas.js) ---
    // Se você tiver a classe 'eventos-page' no body, pode adicionar animações específicas para ela aqui
    // Exemplo:
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add('animated');
    //             observer.unobserve(entry.target);
    //         }
    //     });
    // }, {
    //     threshold: 0.15
    // });
    // const sectionsToAnimate = document.querySelectorAll('#eventos-passados, #eventos-futuros');
    // sectionsToAnimate.forEach(section => {
    //     observer.observe(section);
    // });
});