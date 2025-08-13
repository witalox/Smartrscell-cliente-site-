// ===== Botão do WhatsApp =====
const numeroWhatsApp = "557182925755";
const mensagem = "Vim fazer meu orçamento!";

const btnWhatsapp = document.getElementById('btn-whatsapp');
if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });
}

// ===== Lógica do Modal de Imagem =====
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeButton = document.getElementsByClassName('close-button')[0];

// Seleciona TODOS os elementos que têm a classe 'modal-trigger-img'
const modalTriggers = document.querySelectorAll('.modal-trigger-img');

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
        // Dentro do 'trigger' (que pode ser um .card, .product-item, .sobre-img, etc.),
        // procuramos a primeira tag <img>
        const imgElement = this.querySelector('img');

        // Verificamos se encontramos uma imagem antes de tentar acessá-la
        if (imgElement) {
            modal.style.display = "flex";
            modalImage.src = imgElement.src; // Pegamos o src da imagem ENCONTRADA
            captionText.innerHTML = imgElement.alt; // Pegamos o alt da imagem ENCONTRADA
        } else {
            // Caso o próprio elemento clicado seja a imagem (como no caso da hero-img se não estiver dentro de um div pai específico)
            // Ou se você tiver imagens diretamente com a classe 'modal-trigger-img'
            if (this.tagName === 'IMG') {
                modal.style.display = "flex";
                modalImage.src = this.src;
                captionText.innerHTML = this.alt;
            } else {
                console.warn("Elemento clicado com 'modal-trigger-img' não contém uma tag <img> diretamente e não é uma IMG.", this);
            }
        }
    });
});

closeButton.addEventListener('click', function() {
    modal.style.display = "none";
});

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// ===== Animação de Revelação ao Rolar para TODOS os itens =====

// Esta função verifica se o elemento está visível na viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    // Um offset de 100px para que a animação comece um pouco antes do elemento estar totalmente visível
    const offset = 100;
    return (
        rect.top <= (window.innerHeight - offset) &&
        rect.bottom >= offset &&
        rect.left <= (window.innerWidth - offset) &&
        rect.right >= offset
    );
}

// Função para revelar elementos
function revealElements() {
    // Seleciona todos os elementos que têm a classe 'reveal-item', 'card' ou 'product-item'
    // E que AINDA NÃO FORAM REVELADOS
    const elementsToReveal = document.querySelectorAll('.reveal-item:not(.revealed), .card:not(.revealed), .product-item:not(.revealed)');

    elementsToReveal.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('revealed'); // Adiciona a classe 'revealed' para ativar a transição
        }
    });
}

// Adiciona um listener para o evento de rolagem (scroll)
window.addEventListener('scroll', revealElements);

// Chama a função uma vez ao carregar a página para revelar elementos já visíveis
document.addEventListener('DOMContentLoaded', revealElements);

// Opcional: Chamar a função em redimensionamento de janela (para mobile)
window.addEventListener('resize', revealElements);