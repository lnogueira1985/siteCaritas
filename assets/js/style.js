document.addEventListener('DOMContentLoaded', () => {
    // --- CÓDIGO DO CARROSSEL DE IMAGENS ---
    const mainImageContainer = document.querySelector('.main-image-container');
    let currentActiveIndex = 0; // Para controlar qual imagem está ativa

    // Array de caminhos das imagens para o carrossel automático
    const images = [
        'assets/img/hero-carousel/img1.png',
        'assets/img/hero-carousel/img2.png',
        'assets/img/hero-carousel/img3.png',
        'assets/img/hero-carousel/img4.png',
        'assets/img/hero-carousel/img5.png'
    ];

    // Verifica se o container do carrossel existe na página
    if (mainImageContainer) {
        const imageElements = [];

        // Crie e adicione elementos <img> para cada imagem no carrossel
        images.forEach((imageUrl, index) => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.classList.add('hero-main-img'); // Adiciona uma classe para estilização via CSS
            img.alt = `Imagem ${index + 1} do carrossel`; // Adiciona um alt text acessível
            
            // A primeira imagem é a ativa por padrão
            if (index === 0) {
                img.classList.add('active'); // CSS fará ela visível
            }
            
            mainImageContainer.appendChild(img);
            imageElements.push(img);

            // Pré-carrega a imagem (melhora a performance)
            const preLoadImg = new Image();
            preLoadImg.src = imageUrl;
            preLoadImg.onerror = () => console.error('Erro ao pré-carregar imagem:', imageUrl);
        });

        // Função para mostrar a próxima imagem no carrossel
        const showNextImage = () => {
            // Remove a classe 'active' da imagem atual
            if (imageElements[currentActiveIndex]) {
                imageElements[currentActiveIndex].classList.remove('active');
            }
            
            // Calcula o índice da próxima imagem (loop infinito)
            currentActiveIndex = (currentActiveIndex + 1) % imageElements.length;
            
            // Adiciona a classe 'active' à próxima imagem
            if (imageElements[currentActiveIndex]) {
                imageElements[currentActiveIndex].classList.add('active');
            }
        };

        // Inicia o carrossel automático se houver mais de uma imagem
        // Troca de imagem a cada 3 segundos (3000 milissegundos)
        if (imageElements.length > 1) { 
            setInterval(showNextImage, 3000); 
        }
    }
    
    // --- CÓDIGO DO MENU HAMBÚRGUER ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const headerNav = document.querySelector('header nav');

    // Verifica se os elementos do menu hambúrguer existem
    if (hamburgerMenu && headerNav) {
        // Adiciona um evento de clique ao botão do hambúrguer
        hamburgerMenu.addEventListener('click', () => {
            headerNav.classList.toggle('active'); // Alterna a visibilidade do menu
            hamburgerMenu.classList.toggle('active'); // Alterna a animação do ícone
        });

        // Fecha o menu quando um link é clicado (melhora a experiência do usuário)
        const mainNavLinks = headerNav.querySelectorAll('ul li a');
        mainNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (headerNav.classList.contains('active')) {
                    headerNav.classList.remove('active');
                    hamburgerMenu.classList.remove('active');
                }
            });
        });
    }
});