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
    ---------------------------------
    */

    const tournamentSwiperContainer = document.querySelector('.tournament-swiper'); // Seleciona o contêiner principal do carrossel.

    // Apenas executa a lógica se o contêiner do carrossel existir na página atual.
    if (tournamentSwiperContainer) {
        const slides = tournamentSwiperContainer.querySelectorAll('.swiper-slide'); // Conta quantos slides existem dentro do contêiner.
        const slidesPerView = 5; // Define o número de slides que queremos que fiquem visíveis ao mesmo tempo.

        // Cria um objeto com as configurações base do Swiper.
        let swiperOptions = {
            effect: 'slide', // Define o efeito de transição padrão.
            slidesPerView: slidesPerView, // Define quantos slides são visíveis por vez.
            centeredSlides: true, // Centraliza o slide ativo.
            spaceBetween: 15, // Define o espaço em pixels entre os slides.
            grabCursor: true, // Mostra um ícone de "mão" para indicar que o carrossel é arrastável.
            navigation: { // Habilita e configura os botões de navegação (setas).
                nextEl: '.swiper-button-next', // Seletor do botão "próximo".
                prevEl: '.swiper-button-prev', // Seletor do botão "anterior".
            },
        };

        // --- LÓGICA CONDICIONAL ---
        // Só ativa o loop infinito e a reprodução automática se houver mais slides do que o visível.
        if (slides.length > slidesPerView) {
            swiperOptions.loop = true; // Ativa o modo de loop infinito.
            swiperOptions.autoplay = { // Configura a reprodução automática.
                delay: 3000, // Define o tempo de espera de 3 segundos entre as transições.
                disableOnInteraction: false, // Não para o autoplay após interação manual do usuário.
                pauseOnMouseEnter: true, // Pausa o autoplay quando o mouse está sobre o carrossel.
            };
        } else {
            // Se não houver slides suficientes, desativa a centralização.
            // Isso evita que poucos slides fiquem centralizados com espaços vazios nas laterais.
            swiperOptions.centeredSlides = false;
        }

        // Finalmente, inicializa o Swiper no contêiner especificado com as opções configuradas.
        const tournamentSwiper = new Swiper(tournamentSwiperContainer, swiperOptions);
    }


    /*
    -------------------------------------------------
    SEÇÃO: LÓGICA DO PLAYER DE VÍDEO DO YOUTUBE
    -------------------------------------------------
    Esta seção implementa um "lazy load" para os vídeos.
    O vídeo só é carregado quando o usuário clica na thumbnail,
    melhorando o desempenho inicial da página.
    -------------------------------------------------
    */

    const players = document.querySelectorAll('.youtube-player'); // Seleciona todos os contêineres de vídeo.
    players.forEach(playerContainer => { // Itera sobre cada contêiner de vídeo encontrado.
        playerContainer.addEventListener('click', function () { // Adiciona um ouvinte de clique a cada um.
            const iframe = this.querySelector('iframe'); // Encontra o elemento iframe dentro do contêiner clicado.
            if (iframe) { // Verifica se o iframe existe.
                const videoSrc = iframe.getAttribute('data-src'); // Pega a URL do vídeo armazenada no atributo 'data-src'.
                iframe.setAttribute('src', videoSrc + '?autoplay=1&mute=1'); // Define o atributo 'src' do iframe com a URL, adicionando parâmetros para autoplay e mudo.
                this.classList.add('playing'); // Adiciona a classe 'playing' ao contêiner para remover a thumbnail e o ícone de play via CSS.
            }
        });
    });

    /*
    -------------------------------------------------
    SEÇÃO: VALIDAÇÃO DE FORMULÁRIOS (BOOTSTRAP)
    -------------------------------------------------
    Ativa a validação nativa do Bootstrap nos formulários que
    possuem a classe `.needs-validation`.
    -------------------------------------------------
    */

    const formsToValidate = document.querySelectorAll('.needs-validation'); // Seleciona todos os formulários que precisam de validação.
    Array.from(formsToValidate).forEach(form => { // Itera sobre cada formulário encontrado.
        form.addEventListener('submit', event => { // Adiciona um ouvinte para o evento de envio do formulário.
            if (!form.checkValidity()) { // Verifica se o formulário NÃO é válido de acordo com as regras do HTML (ex: required, type="email").
                event.preventDefault(); // Impede o envio do formulário.
                event.stopPropagation(); // Impede que o evento se propague para elementos "pai".
            }
            form.classList.add('was-validated'); // Adiciona a classe que exibe os feedbacks de validação (mensagens de erro/sucesso) do Bootstrap.
        }, false);
    });

    /*
    -------------------------------------------------
    SEÇÃO: CAMPOS CONDICIONAIS EM FORMULÁRIOS
    -------------------------------------------------
    Mostra ou esconde o campo de upload de imagem com base
    na seleção do tipo de postagem (Discussão vs. Imagem).
    -------------------------------------------------
    */
   
    const typeDiscussionRadio = document.getElementById('id_tipo_0'); // Seleciona o botão de rádio para "Discussão".
    const typeImageRadio = document.getElementById('id_tipo_1'); // Seleciona o botão de rádio para "Imagem".
    const imageUploadField = document.getElementById('imageUploadField'); // Seleciona o contêiner do campo de upload.

    // Executa a lógica apenas se todos os elementos necessários existirem na página.
    if (typeDiscussionRadio && typeImageRadio && imageUploadField) {
        // Seleciona o campo de input do arquivo.
        const fileInput = document.getElementById('id_arquivo');

        // Função para mostrar ou esconder o campo de upload.
        function toggleImageUploadField() {
            if (typeImageRadio.checked) { // Se a opção "Imagem" estiver marcada:
                imageUploadField.style.display = 'block'; // Mostra o contêiner do campo de upload.
                if (fileInput) fileInput.required = true; // Torna o campo de arquivo obrigatório.
            } else { // Se qualquer outra opção (Discussão) estiver marcada:
                imageUploadField.style.display = 'none'; // Esconde o contêiner do campo de upload.
                if (fileInput) { // Se o campo de arquivo existir:
                    fileInput.required = false; // Remove a obrigatoriedade do campo.
                    fileInput.value = ''; // Limpa qualquer arquivo que já tenha sido selecionado para evitar envio acidental.
                }
            }
        }

        // Executa a função uma vez no carregamento da página para definir o estado inicial correto.
        toggleImageUploadField();

        // Adiciona ouvintes de evento para os botões de rádio.
        typeDiscussionRadio.addEventListener('change', toggleImageUploadField); // Executa a função sempre que a seleção mudar para "Discussão".
        typeImageRadio.addEventListener('change', toggleImageUploadField); // Executa a função sempre que a seleção mudar para "Imagem".
    }
});