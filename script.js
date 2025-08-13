// ===== Botão do WhatsApp =====
const numeroWhatsApp = "557182925755";
const mensagem = "Vim fazer meu orçamento!";

// WhatsApp do cabeçalho
const btnWhatsappHeader = document.getElementById('btn-whatsapp-header');
if (btnWhatsappHeader) {
    btnWhatsappHeader.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });
}

// WhatsApp do rodapé (novo ID para não conflitar)
const btnWhatsappFooter = document.getElementById('btn-whatsapp-footer');
if (btnWhatsappFooter) {
    btnWhatsappFooter.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });
}

// Botão de Orçamentos no rodapé (novo ID)
const btnOrcamentosFooter = document.getElementById('btn-orcamentos-footer');
if (btnOrcamentosFooter) {
    btnOrcamentosFooter.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent('Gostaria de solicitar um orçamento.')}`;
        window.open(url, '_blank');
    });
}


// ===== Lógica do Modal de Imagem (AJUSTADO) =====
const modal = document.getElementById('modal-imagem');
const modalImage = document.getElementById('imagem-ampliada');
const captionText = document.getElementById('caption');
const closeButton = modal.querySelector('.fechar'); // Seleciona o botão de fechar dentro do modal

// Seleciona TODOS os elementos 'servico' para abrir o modal
const servicoItems = document.querySelectorAll('.servico');

servicoItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgElement = this.querySelector('img');

        if (imgElement) {
            modal.classList.add('active'); // Adiciona a classe 'active' para mostrar e animar o modal
            modalImage.src = imgElement.src;
            captionText.innerHTML = imgElement.alt;
            document.body.style.overflow = 'hidden'; // Evita rolagem do fundo
        } else {
            console.warn("Elemento clicado não contém uma tag <img>.", this);
        }
    });
});

closeButton.addEventListener('click', function() {
    modal.classList.remove('active'); // Remove a classe 'active' para esconder e animar o modal
    document.body.style.overflow = ''; // Restaura a rolagem do fundo
});

// Fecha o modal ao clicar fora do conteúdo
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Fecha o modal ao pressionar a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});


// ===== Animação de Revelação ao Rolar para TODOS os itens =====

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const offset = 100;
    return (
        rect.top <= (window.innerHeight - offset) &&
        rect.bottom >= offset &&
        rect.left <= (window.innerWidth - offset) &&
        rect.right >= offset
    );
}

function revealElements() {
    const elementsToReveal = document.querySelectorAll('.servico:not(.revealed)');

    elementsToReveal.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealElements);
document.addEventListener('DOMContentLoaded', revealElements);
window.addEventListener('resize', revealElements);


// ===== Botão Voltar ao Topo =====
const backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

backToTopBtn.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// ===== Lógica de Filtro por Categoria e Busca por Texto =====

const categoriaLinks = document.querySelectorAll('.categorias a');
const campoBusca = document.getElementById('busca');
const servicos = document.querySelectorAll('.servico'); // Todos os cards de serviço

function filterServices() {
    const activeCategory = document.querySelector('.categorias a.ativo').dataset.category;
    const searchTerm = campoBusca.value.toLowerCase().trim();

    servicos.forEach(servico => {
        const categoriaServico = servico.dataset.categoria;
        const textoServico = servico.textContent.toLowerCase();

        const matchesCategory = (activeCategory === 'todos' || categoriaServico === activeCategory);
        const matchesSearch = textoServico.includes(searchTerm);

        if (matchesCategory && matchesSearch) {
            servico.style.display = 'flex'; // Mostra o item
            // Adiciona a classe 'revealed' para reativar a animação se necessário
            setTimeout(() => {
                servico.classList.add('revealed');
            }, 50); // Pequeno atraso para a animação ter efeito
        } else {
            servico.style.display = 'none'; // Esconde o item
            servico.classList.remove('revealed'); // Remove a classe para esconder sem animação
        }
    });

    // Garante que a animação de revelação seja disparada para os elementos visíveis após o filtro
    revealElements();
}

// Event Listeners para os links de categoria
categoriaLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que a página recarregue

        // Remove a classe 'ativo' de todos os links de categoria
        categoriaLinks.forEach(item => item.classList.remove('ativo'));

        // Adiciona a classe 'ativo' apenas ao link clicado
        link.classList.add('ativo');

        filterServices(); // Aplica o filtro
    });
});

// Event Listener para o campo de busca (ao digitar)
campoBusca.addEventListener('input', filterServices);

// Chama o filtro uma vez ao carregar a página para garantir que o estado inicial esteja correto
document.addEventListener('DOMContentLoaded', filterServices);