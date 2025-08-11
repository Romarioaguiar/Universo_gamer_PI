/*
-------------------------------------------------
ARQUIVO DE SCRIPTS PRINCIPAIS (MAIN.JS)
-------------------------------------------------
Este arquivo contém as lógicas de interatividade do site.
O script espera o DOM ser totalmente carregado para garantir
que todos os elementos HTML estejam disponíveis para manipulação.
-------------------------------------------------
*/

// Adiciona um "ouvinte de evento" que espera todo o conteúdo da página (DOM) carregar para executar os scripts.
document.addEventListener('DOMContentLoaded', function () {

    /*
    -------------------------------------------------
    SEÇÃO: ROLAGEM SUAVE PARA A SEÇÃO DE TORNEIOS
    -------------------------------------------------
    Esta seção de código implementa a funcionalidade de
    rolagem suave da página até a seção de torneios
    quando um dos botões correspondentes é clicado.
    -------------------------------------------------
    */

    const tournamentsSection = document.getElementById('tournaments'); // Seleciona a seção de torneios pelo seu ID.
    const menuTournamentsBtn = document.getElementById('show-tournaments-btn'); // Seleciona o botão de torneios no menu.
    const carouselTournamentsBtn = document.getElementById('carousel-tournaments-btn'); // Seleciona o botão de torneios no carrossel do banner.

    // Define uma função reutilizável para rolar a tela até a seção de torneios.
    const showAndScrollToTournaments = (event) => {
        event.preventDefault(); // Impede o comportamento padrão do link (que seria pular para a âncora bruscamente).
        if (tournamentsSection) { // Verifica se a seção de torneios realmente existe na página.
            tournamentsSection.scrollIntoView({ // Inicia a API de rolagem do navegador.
                behavior: 'smooth', // Define a animação de rolagem como suave.
                block: 'start' // Alinha o topo da seção com o topo da área visível da tela.
            });
        }
    };

    // Adiciona o "ouvinte de clique" ao botão do menu, se ele existir.
    if (menuTournamentsBtn) {
        menuTournamentsBtn.addEventListener('click', showAndScrollToTournaments); // Ao clicar, executa a função de rolagem.
    }
    // Adiciona o "ouvinte de clique" ao botão do carrossel, se ele existir.
    if (carouselTournamentsBtn) {
        carouselTournamentsBtn.addEventListener('click', showAndScrollToTournaments); // Ao clicar, executa a função de rolagem.
    }

    /*
    -------------------------------------------------
    SEÇÃO: INICIALIZAÇÃO DO CARROSSEL DE TORNEIOS (SWIPER.JS)
    -------------------------------------------------
    Esta seção inicializa o carrossel da biblioteca Swiper.js,
    com lógica para se adaptar à quantidade de slides disponíveis.
    -------------------------------------------------
    */

    const tournamentSwiperContainer = document.querySelector('.tournament-swiper'); // Seleciona o contêiner principal do carrossel.

    // Apenas executa a lógica se o contêiner do carrossel existir na página atual.
    if (tournamentSwiperContainer) {
        const slides = tournamentSwiperContainer.querySelectorAll('.swiper-slide'); // Conta quantos slides existem dentro do contêiner.

        // REMOVIDO: a variável 'slidesPerView' fixa foi removida para dar lugar à configuração responsiva.
        // const slidesPerView = 5;

        // Cria um objeto com as configurações base do Swiper.
        let swiperOptions = {
            effect: 'slide',
            centeredSlides: true,
            grabCursor: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // ⭐ NOVO: Bloco de breakpoints para responsividade.
            // Esta é a correção principal. O Swiper aplicará as configurações abaixo
            // de acordo com a largura da tela do usuário.
            breakpoints: {
                // Em telas de 0px até 768px
                0: {
                    slidesPerView: 1.2, // Mostra 1 slide completo e um pedaço do próximo
                    spaceBetween: 15    // Espaço menor entre os slides
                },
                // Em telas maiores que 768px
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                // Em telas maiores que 992px
                992: {
                    slidesPerView: 4,
                    spaceBetween: 30
                },
                // Em telas maiores que 1200px
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 30
                }
            }
        };

        // --- LÓGICA CONDICIONAL AJUSTADA ---
        // Ativa o loop e autoplay se houver um número razoável de slides (ex: mais de 3).
        // Isso funciona melhor com a configuração responsiva.
        if (slides.length > 3) {
            swiperOptions.loop = true;
            swiperOptions.autoplay = {
                delay: 4000, // Aumentei um pouco o tempo para o usuário poder ver o slide ativo com calma
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            };
        } else {
            // Se houver poucos slides, desativamos o loop para evitar comportamento estranho
            // e mantemos a centralização para um bom alinhamento.
            swiperOptions.loop = false;
            swiperOptions.autoplay = false;
        }

        // Finalmente, inicializa o Swiper no contêiner especificado com as opções configuradas.
        const tournamentSwiper = new Swiper(tournamentSwiperContainer, swiperOptions);
    }


    /*
    -------------------------------------------------
    SEÇÃO: LÓGICA DO PLAYER DE VÍDEO DO YOUTUBE
    (Nenhuma alteração necessária aqui)
    -------------------------------------------------
    */

    const players = document.querySelectorAll('.youtube-player');
    players.forEach(playerContainer => {
        playerContainer.addEventListener('click', function () {
            const iframe = this.querySelector('iframe');
            if (iframe) {
                const videoSrc = iframe.getAttribute('data-src');
                iframe.setAttribute('src', videoSrc + '?autoplay=1&mute=1');
                this.classList.add('playing');
            }
        });
    });

    /*
    -------------------------------------------------
    SEÇÃO: VALIDAÇÃO DE FORMULÁRIOS (BOOTSTRAP)
    (Nenhuma alteração necessária aqui)
    -------------------------------------------------
    */

    const formsToValidate = document.querySelectorAll('.needs-validation');
    Array.from(formsToValidate).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    /*
    -------------------------------------------------
    SEÇÃO: CAMPOS CONDICIONAIS EM FORMULÁRIOS
    (Nenhuma alteração necessária aqui)
    -------------------------------------------------
    */

    const typeDiscussionRadio = document.getElementById('id_tipo_0');
    const typeImageRadio = document.getElementById('id_tipo_1');
    const imageUploadField = document.getElementById('imageUploadField');

    if (typeDiscussionRadio && typeImageRadio && imageUploadField) {
        const fileInput = document.getElementById('id_arquivo');

        function toggleImageUploadField() {
            if (typeImageRadio.checked) {
                imageUploadField.style.display = 'block';
                if (fileInput) fileInput.required = true;
            } else {
                imageUploadField.style.display = 'none';
                if (fileInput) {
                    fileInput.required = false;
                    fileInput.value = '';
                }
            }
        }

        toggleImageUploadField();
        typeDiscussionRadio.addEventListener('change', toggleImageUploadField);
        typeImageRadio.addEventListener('change', toggleImageUploadField);
    }
});
