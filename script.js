// ===== MENU HAMBURGUER MOBILE =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mainMenu = document.getElementById('main-menu');
    
    if (mobileMenu && mainMenu) {
        // Toggle menu
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const menuLinks = mainMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mainMenu.contains(event.target);
            const isClickOnToggle = mobileMenu.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && mainMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });
    }
    
    // ===== MENU ATIVO =====
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ===== MODAL PARA JOGADORES =====
    const modal = document.getElementById('modal');
    if (modal) {
        const modalBody = document.getElementById('modalBody');
        const closeModalBtn = document.getElementById('closeModal');
        
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const nome = card.querySelector('h3').textContent;
                const bio = card.getAttribute('data-bio');
                const titulos = card.getAttribute('data-titulos')?.split(';') || [];
                const curiosidades = card.getAttribute('data-curiosidades')?.split(';') || [];
                const times = card.getAttribute('data-times')?.split(';') || [];
                
                modalBody.innerHTML = `
                    <h2>${nome}</h2>
                    <p>${bio}</p>
                    
                    <h3>Times que Jogou:</h3>
                    <ul>${times.map(t => `<li>${t.trim()}</li>`).join('')}</ul>
                    
                    <h3>Principais Títulos:</h3>
                    <ul>${titulos.map(t => `<li>${t.trim()}</li>`).join('')}</ul>
                    
                    <h3>Curiosidades:</h3>
                    <ul>${curiosidades.map(c => `<li>${c.trim()}</li>`).join('')}</ul>
                `;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModalBtn.onclick = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
        
        window.onclick = (e) => { 
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };
    }
    
    // ===== MODAL PARA TIMES =====
    const modalTime = document.getElementById('modalTime');
    if (modalTime) {
        const modalTimeBody = document.getElementById('modalTimeBody');
        const closeModalTimeBtn = document.getElementById('closeModalTime');
        
        document.querySelectorAll('.time-card').forEach(card => {
            card.addEventListener('click', () => {
                const nome = card.querySelector('h4').textContent;
                const pais = card.getAttribute('data-pais');
                const titulos = card.getAttribute('data-titulos')?.split(';') || [];
                const curiosidades = card.getAttribute('data-curiosidade')?.split(';') || [];
                
                modalTimeBody.innerHTML = `
                    <h2>${nome}</h2>
                    <p><strong>País:</strong> ${pais}</p>
                    <h3>Principais Títulos:</h3>
                    <ul>${titulos.map(t => `<li>${t.trim()}</li>`).join('')}</ul>
                    <h3>Curiosidade:</h3>
                    <ul>${curiosidades.map(c => `<li>${c.trim()}</li>`).join('')}</ul>
                `;
                modalTime.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeModalTimeBtn.onclick = () => {
            modalTime.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
        
        window.onclick = (e) => { 
            if (e.target === modalTime) {
                modalTime.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };
    }
    
    // ===== FUNCIONALIDADE DE PESQUISA PARA JOGADORES =====
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const cardsContainer = document.querySelector('.cards-container');
    
    if (searchInput && searchButton && cardsContainer) {
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.card');
            let hasResults = false;
    
            cards.forEach(card => {
                const playerName = card.querySelector('h3').textContent.toLowerCase();
                
                if (playerName.includes(searchTerm)) {
                    card.style.display = 'flex';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });
    
            // Mostrar mensagem se não houver resultados
            let noResultsMsg = document.querySelector('.no-results');
            if (!hasResults && searchTerm !== '') {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.textContent = `Nenhum jogador encontrado para "${searchTerm}"`;
                    cardsContainer.appendChild(noResultsMsg);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
    
        // Evento no botão de pesquisa
        searchButton.addEventListener('click', performSearch);
    
        // Evento ao pressionar Enter no input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    
        // Limpar pesquisa quando o input estiver vazio
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.style.display = 'flex';
                });
                const noResultsMsg = document.querySelector('.no-results');
                if (noResultsMsg) {
                    noResultsMsg.remove();
                }
            }
        });
    }
    
    // ===== ROLAGEM SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== BOTÃO VOLTAR AO TOPO =====
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Mostrar/ocultar botão baseado no scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });
}

// ===== FUNÇÕES UTILITÁRIAS =====
function formatarLista(itens) {
    return itens.map(item => `<li>${item.trim()}</li>`).join('');
}

function abrirModal(modal, conteudo) {
    modal.innerHTML = conteudo;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fecharModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== FILTRO POR PAÍS =====
const filtroPais = document.getElementById('filtroPais');
const limparFiltro = document.getElementById('limparFiltro');
const categoriasTimes = document.querySelectorAll('.categoria-times');
const timesExtras = document.getElementById('times-extras');

if (filtroPais && limparFiltro) {
  // Função para limpar elementos do filtro
  function limparElementosFiltro() {
    const tituloPais = document.querySelector('.titulo-pais-filtrado');
    const listaPais = document.querySelector('.lista-times:not(.categoria-times .lista-times)');
    
    if (tituloPais) tituloPais.remove();
    if (listaPais) listaPais.remove();
  }
  
  // Função para mostrar todas as categorias originais
  function mostrarCategoriasOriginais() {
    categoriasTimes.forEach(categoria => {
      categoria.style.display = 'block';
    });
    // Esconde os times extras
    if (timesExtras) timesExtras.style.display = 'none';
  }
  
  // Evento de mudança no filtro
  filtroPais.addEventListener('change', function() {
    const paisSelecionado = this.value;
    
    // Limpar elementos do filtro anterior
    limparElementosFiltro();
    
    // Se selecionou "todos", mostrar todas as categorias
    if (paisSelecionado === 'todos') {
      mostrarCategoriasOriginais();
      return;
    }
    
    // Esconder todas as categorias originais
    categoriasTimes.forEach(categoria => {
      categoria.style.display = 'none';
    });
    
    // Esconder times extras
    if (timesExtras) timesExtras.style.display = 'none';
    
    // Encontrar todos os times do país selecionado (dos originais + extras)
    const timesDoPais = [];
    
    // Buscar nos times originais
    document.querySelectorAll('.categoria-times .time-card').forEach(time => {
      if (time.getAttribute('data-pais') === paisSelecionado) {
        timesDoPais.push(time.cloneNode(true));
      }
    });
    
    // Buscar nos times extras
    if (timesExtras) {
      timesExtras.querySelectorAll('.time-card').forEach(time => {
        if (time.getAttribute('data-pais') === paisSelecionado) {
          timesDoPais.push(time.cloneNode(true));
        }
      });
    }
    
    // Criar uma nova seção para mostrar os times do país
    if (timesDoPais.length > 0) {
      // Criar título do país
      const tituloPais = document.createElement('h2');
      tituloPais.className = 'titulo-pais-filtrado';
      tituloPais.textContent = ` ${paisSelecionado} `;
      
      // Criar container para os times
      const containerPais = document.createElement('div');
      containerPais.className = 'lista-times times-filtrados';
      
      // Adicionar os times ao container
      timesDoPais.forEach(time => {
        containerPais.appendChild(time);
      });
      
      // Inserir antes do primeiro container de times
      const primeiroContainer = document.querySelector('.times-container');
      primeiroContainer.parentNode.insertBefore(tituloPais, primeiroContainer);
      primeiroContainer.parentNode.insertBefore(containerPais, primeiroContainer);
      
      // Reaplicar eventos de clique aos novos cards
      setTimeout(() => {
        document.querySelectorAll('.times-filtrados .time-card').forEach(card => {
          card.addEventListener('click', function() {
            const nome = card.querySelector('h4').textContent;
                const pais = card.getAttribute('data-pais');
                const titulos = card.getAttribute('data-titulos')?.split(';') || [];
                const curiosidades = card.getAttribute('data-curiosidade')?.split(';') || [];
                git
                modalTimeBody.innerHTML = `
                    <h2>${nome}</h2>
                    <p><strong>País:</strong> ${pais}</p>
                    <h3>Principais Títulos:</h3>
                    <ul>${titulos.map(t => `<li>${t.trim()}</li>`).join('')}</ul>
                    <h3>Curiosidade:</h3>
                    <ul>${curiosidades.map(c => `<li>${c.trim()}</li>`).join('')}</ul>
                `;
            modalTime.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          });
        });
      }, 100);
    }
  });
  
  // Evento para limpar o filtro
  limparFiltro.addEventListener('click', function() {
    filtroPais.value = 'todos';
    
    // Limpar elementos do filtro
    limparElementosFiltro();
    
    // Mostrar categorias originais
    mostrarCategoriasOriginais();
  });
}

