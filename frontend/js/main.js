// ========================================
// 1. DEFINIÇÕES GLOBAIS E MAPEAMENTOS
// Variáveis e objetos que são acessíveis em todo o script.
// Inclui mapeamentos de categorias e traduções para nomes/descrições de pratos.
// ========================================

/**
 * @property {Object} mapeamentoCategorias - Mapeia as categorias da API TheMealDB para categorias locais do site.
 * Isso permite organizar os pratos da API em seções customizadas no seu frontend.
 */
const mapeamentoCategorias = {
    'Beef': 'destaques',
    'Chicken': 'executivos',
    'Pasta': 'massas',
    'Dessert': 'sobremesas',
    'Seafood': 'destaques',
    'Lamb': 'executivos',
    'Pork': 'executivos',
    'Vegan': 'massas',
    'Vegetarian': 'massas',
    'Breakfast': 'destaques',
    'Goat': 'executivos',
    'Side': 'executivos',
    'Starter': 'executivos',
    'Miscellaneous': 'executivos' // Categoria padrão se não houver mapeamento específico
};

/**
 * @property {Object} containersPorCategoria - Mapeia as categorias locais para os elementos HTML (containers)
 * onde os cards dos pratos serão exibidos.
 */
const containersPorCategoria = {
    'destaques': document.getElementById('pratos-container-destaques'),
    'executivos': document.getElementById('pratos-container-executivos'),
    'massas': document.getElementById('pratos-container-massas'),
    'sobremesas': document.getElementById('pratos-container-sobremesas'),
    'bebidas': document.getElementById('pratos-container-bebidas')
};

/**
 * @property {Object} nomePratoTraduzido - Dicionário para traduzir nomes de pratos da API para português.
 * Útil para personalizar a exibição dos pratos no site.
 */
const nomePratoTraduzido = {
    "Bread Omelette": "Omelete de Pão",
    "Beef and Mustard Pie": "Torta de Carne e Mostarda",
    "Breakfast Potatoes": "Batatas do Café da Manhã",
    "Baked salmon with fennel & tomatoes": "Salmão Assado com Erva-doce e Tomates",
    "Beef and Oyster pie": "Torta de Carne e Ostra",
    "English Breakfast": "Café da Manã Inglês",
    "Chicken Handi": "Frango Handi",
    "Chicken Alfredo": "Frango Alfredo",
    "Spaghetti Bolognese": "Espaguete à Bolonhesa",
    "Chocolate Gateau": "Bolo de Chocolate",
    "Apple Crumble": "Crumble de Maçã",
    "Pancakes": "Panquecas",
    "Tuna Nicoise": "Salada Niçoise de Atum",
    "Vegetable Curry": "Curry de Vegetais",
    "Chicken Fajita Mac and Cheese": "Macarrão com Queijo e Fajita de Frango",
    "Creamy Tomato Pasta": "Massa ao Molho Cremoso de Tomate",
    "Fish Stew": "Ensopado de Peixe",
    "Mushroom Soup": "Sopa de Cogumelos",
    // Adicione mais traduções conforme necessário
};

/**
 * @property {Object} descricoesGenericas - Descrições predefinidas por categoria local.
 * Usadas para dar uma descrição aos pratos, já que a API não fornece uma descrição curta.
 */
const descricoesGenericas = {
    'destaques': [
        'Uma delícia que você não pode perder. Perfeito para qualquer ocasião, com sabor inesquecível e ingredientes frescos.',
        'Sabor marcante e apresentação impecável. Este prato é a escolha ideal para quem busca uma experiência única.',
        'Fresco, saboroso e preparado com o máximo cuidado. Uma verdadeira explosão de sabores em cada mordida.',
        'Nosso carro-chefe! Uma combinação perfeita de texturas e aromas que agradará a todos os paladares.'
    ],
    'executivos': [
        'Opção rápida e nutritiva para o seu almoço. Ingredientes selecionados e preparo cuidadoso para o seu dia.',
        'Refeição completa e equilibrada, ideal para o dia a dia. Desfrute de um almoço saboroso sem preocupações.',
        'Perfeito para o seu almoço de negócios ou uma refeição rápida. Qualidade e sabor garantidos em cada porção.',
        'Um clássico reimaginado para o seu almoço. Combinação perfeita de ingredientes frescos e um toque especial.'
    ],
    'massas': [
        'Massa fresca e molho artesanal que derretem na boca. Uma verdadeira experiência da culinária italiana.',
        'Deliciosas massas com opções de molhos ricos e cremosos. Preparadas com carinho para o seu paladar.',
        'Clássicas massas com um toque caseiro. Perfeitas para um jantar aconchegante e saboroso.',
        'Feita com ingredientes frescos e temperos selecionados. Uma massa que conforta e surpreende.'
    ],
    'sobremesas': [
        'Adoce seu dia com essa sobremesa irresistível. Perfeita para finalizar qualquer refeição com chave de ouro.',
        'Uma explosão de sabor em cada colher. Delicadamente preparada para os amantes de doces.',
        'Leve e refrescante, ideal para um momento de prazer. Ingredientes frescos para um sabor inigualável.',
        'O final perfeito para sua refeição. Texturas e sabores que encantam e deixam um gostinho de quero mais.'
    ],
    'bebidas': [ // Embora a API não tenha bebidas, mantemos a categoria para consistência
        'Refresque-se com nossas opções de bebidas. Escolha a sua favorita para acompanhar sua refeição.',
        'Bebidas geladas para todos os gostos. Perfeitas para hidratar e completar sua experiência.',
        'Naturais e cheias de sabor. Nossas bebidas são a pedida certa para qualquer hora do dia.',
        'Variedade de sucos e coquetéis refrescantes. Experimente e encontre a sua combinação ideal.'
    ]
};

// --- VARIÁVEIS GLOBAIS PARA A SACORA (CARRINHO DE COMPRAS) ---
/**
 * @property {Array<Object>} cart - Array que armazena os itens adicionados à sacola de compras.
 * Cada item inclui id, nome, preço, imagem e quantidade.
 */
const cart = [];
/** @property {HTMLElement} cartItemCountSpan - Elemento HTML que exibe o número total de itens na sacola. */
const cartItemCountSpan = document.getElementById('cartItemCount');
/** @property {HTMLElement} cartTotalSpan - Elemento HTML que exibe o valor total da sacola. */
const cartTotalSpan = document.getElementById('cartTotal');
/** @property {HTMLElement} cartItemsContainer - Container onde os itens da sacola são listados no modal. */
const cartItemsContainer = document.getElementById('cartItemsContainer');
/** @property {HTMLElement} cartModal - O elemento do modal (pop-up) da sacola de compras. */
const cartModal = document.getElementById('cartModal');
/** @property {HTMLElement} closeButton - Botão para fechar o modal da sacola. */
const closeButton = document.querySelector('.close-button');
/** @property {HTMLElement} cartIcon - Ícone flutuante da sacola, que abre o modal. */
const cartIcon = document.getElementById('cartIcon');
/** @property {HTMLElement} checkoutButton - Botão para finalizar o pedido dentro do modal da sacola. */
const checkoutButton = document.getElementById('checkoutButton');
/** @property {HTMLElement} emptyCartMessage - Mensagem exibida no modal quando a sacola está vazia. */
const emptyCartMessage = document.getElementById('emptyCartMessage');

// --- VARIÁVEIS GLOBAIS PARA A BUSCA ---
/** @property {HTMLElement} searchForm - O formulário HTML de busca. */
const searchForm = document.querySelector('header nav form');
/** @property {HTMLElement} searchInput - O campo de input de texto do formulário de busca. */
const searchInput = document.querySelector('header nav input[type="text"]');
/** @property {HTMLElement} searchResultsContainer - Container onde os resultados da busca serão exibidos. */
const searchResultsContainer = document.getElementById('searchResultsContainer');

// --- VARIÁVEL GLOBAL PARA O LINK DA LOGO ---
/** @property {HTMLElement} logoLink - O link da logo no cabeçalho. Usado para resetar a visualização. */
const logoLink = document.getElementById('logoLink'); // Ou use querySelector('.nav-logo')

// ========================================
// 2. FUNÇÕES AUXILIARES
// Funções de suporte para gerar dados e manipular o DOM.
// ========================================

/**
 * Gera um preço aleatório para um prato.
 * @returns {number} O preço gerado, formatado com duas casas decimais.
 */
function gerarPrecoAleatorio() {
    const min = 30; // Preço mínimo
    const max = 120; // Preço máximo
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

/**
 * Obtém uma descrição genérica para um prato com base em sua categoria local.
 * @param {string} categoriaLocal - A categoria local do prato (ex: 'destaques', 'massas').
 * @returns {string} Uma descrição aleatória da lista de descrições genéricas para a categoria.
 */
function getDescricaoGenerica(categoriaLocal) {
    const descricoes = descricoesGenericas[categoriaLocal];
    if (descricoes && descricoes.length > 0) {
        const randomIndex = Math.floor(Math.random() * descricoes.length);
        return descricoes[randomIndex];
    }
    return 'Delicioso prato preparado com ingredientes frescos e muito carinho.';
}

/**
 * Cria e retorna um elemento HTML (card) para exibir um prato.
 * Popula o card com imagem, nome (traduzido), descrição, preço e botões de ação.
 * @param {Object} pratoResumido - Objeto com detalhes básicos do prato da API.
 * @param {string} categoriaLocal - A categoria local à qual o prato pertence.
 * @returns {HTMLElement} O elemento DIV que representa o card do prato.
 */
function criarCardPrato(pratoResumido, categoriaLocal) {
    const nomeOriginal = pratoResumido.strMeal;
    const nomeTraduzido = nomePratoTraduzido[nomeOriginal] || nomeOriginal;
    const descricaoPrato = getDescricaoGenerica(categoriaLocal);
    const precoPrato = gerarPrecoAleatorio();

    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = pratoResumido.strMealThumb;
    img.alt = nomeTraduzido;
    card.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = nomeTraduzido;
    card.appendChild(h2);

    const pDescription = document.createElement('p');
    pDescription.textContent = descricaoPrato;
    card.appendChild(pDescription);

    const pPrice = document.createElement('p');
    pPrice.classList.add('dish-price');
    pPrice.textContent = `R$ ${precoPrato.toFixed(2).replace('.', ',')}`;
    card.appendChild(pPrice);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('card-buttons');
    card.appendChild(buttonContainer);

    // Botão "Detalhes": exibe um alerta com informações do prato ao ser clicado.
    const detailsButton = document.createElement('button');
    detailsButton.classList.add('btn', 'btn-details');
    detailsButton.textContent = 'Detalhes';
    detailsButton.addEventListener('click', () => {
        alert(`Detalhes do prato: ${nomeTraduzido}\nPreço: R$ ${precoPrato.toFixed(2).replace('.', ',')}\nDescrição: ${descricaoPrato}`);
        console.log('Detalhes do prato:', {
            id: pratoResumido.idMeal,
            name: nomeTraduzido,
            category: categoriaLocal,
            description: descricaoPrato,
            price: precoPrato,
            image: pratoResumido.strMealThumb
        });
    });
    buttonContainer.appendChild(detailsButton);

    // Botão "Adicionar à Sacola": adiciona o prato ao carrinho de compras ao ser clicado.
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('btn', 'btn-add-to-cart');
    addToCartButton.textContent = '+';
    addToCartButton.addEventListener('click', () => {
        addToCart({
            id: pratoResumido.idMeal,
            name: nomeTraduzido,
            price: precoPrato,
            image: pratoResumido.strMealThumb
        });
    });
    buttonContainer.appendChild(addToCartButton);

    return card;
}

// ========================================
// 3. FUNÇÕES DA SACOLA (CARRINHO DE COMPRAS)
// Lógica para adicionar, remover e atualizar itens no carrinho,
// além de manter a exibição do carrinho sincronizada.
// ========================================

/**
 * Atualiza a interface de usuário do carrinho (modal da sacola, contador de itens, total).
 * Limpa e recria a lista de itens, calcula o total e ajusta a visibilidade de mensagens/botões.
 */
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block'; // Mostra a mensagem de sacola vazia
        checkoutButton.disabled = true; // Desabilita o botão de finalizar pedido
    } else {
        emptyCartMessage.style.display = 'none'; // Esconde a mensagem de sacola vazia
        checkoutButton.disabled = false; // Habilita o botão de finalizar pedido
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                    <button class="remove-item-btn" data-id="${item.id}">Remover</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    // Atualiza o contador de itens na sacola no ícone flutuante
    cartItemCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Adiciona um item à sacola. Se o item já existir, aumenta a quantidade. Caso contrário, adiciona como um novo item.
 * @param {Object} itemDetails - Objeto contendo id, name, price e image do item a ser adicionado.
 */
function addToCart(itemDetails) {
    const existingItem = cart.find(item => item.id === itemDetails.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...itemDetails, quantity: 1 });
    }
    updateCartDisplay(); // Atualiza a UI da sacola
    alert(`"${itemDetails.name}" adicionado à sacola! Quantidade: ${existingItem ? existingItem.quantity : 1}`);
}

/**
 * Remove um item completamente da sacola.
 * @param {string} itemId - O ID do item a ser removido.
 */
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1); // Remove o item do array
        updateCartDisplay(); // Atualiza a UI
    }
}

/**
 * Atualiza a quantidade de um item específico na sacola.
 * @param {string} itemId - O ID do item.
 * @param {number} change - O valor da mudança na quantidade (+1 para aumentar, -1 para diminuir).
 */
function updateItemQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId); // Remove se a quantidade for zero ou negativa
        }
        updateCartDisplay(); // Atualiza a UI
    }
}

// ========================================
// 4. LÓGICA DE BUSCA DE PRATOS
// Funcionalidade para buscar pratos na API TheMealDB com base em um termo.
// ========================================

/**
 * Realiza uma busca de pratos na API TheMealDB e exibe os resultados na página.
 * Esconde as seções de categorias normais e mostra um container de resultados.
 * @param {string} query - O termo de busca digitado pelo usuário.
 */
async function searchMeals(query) {
    searchResultsContainer.innerHTML = ''; // Limpa resultados anteriores
    searchResultsContainer.style.display = 'block'; // Exibe o container de resultados

    // Esconde as seções de categorias normais para dar lugar aos resultados da busca
    for (const key in containersPorCategoria) {
        if (containersPorCategoria[key]) {
            containersPorCategoria[key].closest('.category-content').style.display = 'none';
        }
    }

    try {
        // Faz a requisição à API para buscar pratos pelo termo
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        if (data.meals) {
            // Cria e adiciona um cabeçalho para os resultados da busca
            const searchHeading = document.createElement('h2');
            searchHeading.textContent = `Resultados para "${query}"`;
            searchHeading.style.color = '#ebdd8f';
            searchHeading.style.fontSize = '2em';
            searchHeading.style.marginBottom = '10px';
            searchResultsContainer.appendChild(searchHeading);

            // Cria um grid para os cards dos resultados (reutiliza estilo existente)
            const resultsGrid = document.createElement('div');
            resultsGrid.classList.add('pratos-categoria-container');

            // Limita o número de resultados para evitar sobrecarga na UI
            const mealsToDisplay = data.meals.slice(0, 12);

            // Cria e adiciona um card para cada prato encontrado na busca
            mealsToDisplay.forEach(meal => {
                const categoriaTheMealDB = meal.strCategory;
                const categoriaLocalParaDescricao = mapeamentoCategorias[categoriaTheMealDB] || 'executivos';
                const card = criarCardPrato(meal, categoriaLocalParaDescricao);
                resultsGrid.appendChild(card);
            });
            searchResultsContainer.appendChild(resultsGrid);
        } else {
            // Mensagem se nenhum resultado for encontrado
            const noResults = document.createElement('p');
            noResults.textContent = `Nenhum prato encontrado para "${query}".`;
            noResults.style.color = '#CCCCCC';
            noResults.style.fontSize = '1.2em';
            noResults.style.textAlign = 'center';
            searchResultsContainer.appendChild(noResults);
        }
    } catch (error) {
        console.error('Erro ao buscar pratos:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Ocorreu um erro ao buscar os pratos. Tente novamente mais tarde.';
        errorMessage.style.color = 'red';
        errorMessage.style.textAlign = 'center';
        searchResultsContainer.appendChild(errorMessage);
    }
}

/**
 * Reseta a visualização da página, escondendo resultados de busca e exibindo as categorias normais.
 * Ideal para ser chamado ao clicar na logo ou em um botão "limpar busca".
 */
function resetView() {
    // Esconde os resultados da busca
    if (searchResultsContainer) {
        searchResultsContainer.innerHTML = '';
        searchResultsContainer.style.display = 'none';
    }

    // Mostra o carrossel novamente (se ele existir)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.style.display = 'block';
    }

    // Mostra as seções de categorias normais
    for (const key in containersPorCategoria) {
        if (containersPorCategoria[key]) {
            containersPorCategoria[key].closest('.category-content').style.display = 'block';
        }
    }
    // Opcional: Limpar o input de busca
    if (searchInput) {
        searchInput.value = '';
    }
}

// ========================================
// 5. CARREGAMENTO INICIAL DOS PRATOS DA API
// Busca categorias e pratos da TheMealDB API para popular as seções iniciais.
// ========================================

/**
 * Faz requisições à TheMealDB API para listar categorias e, para cada categoria mapeada,
 * busca os pratos correspondentes e os exibe nos respectivos containers no DOM.
 */
fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list') // Busca todas as categorias disponíveis na API
    .then(response => response.json())
    .then(categoriasData => {
        if (!categoriasData.meals) {
            console.error('Nenhuma categoria encontrada na API TheMealDB.');
            return;
        }

        // Itera sobre as categorias da API
        categoriasData.meals.forEach(categoriaTheMealDB => {
            const nomeCategoriaTheMealDB = categoriaTheMealDB.strCategory;
            const nomeCategoriaLocal = mapeamentoCategorias[nomeCategoriaTheMealDB]; // Mapeia para categoria local

            // Verifica se a categoria da API tem um mapeamento local e um container HTML correspondente
            if (nomeCategoriaLocal && containersPorCategoria[nomeCategoriaLocal]) {
                const containerParaPratos = containersPorCategoria[nomeCategoriaLocal];

                containerParaPratos.innerHTML = ''; // Limpa o container antes de adicionar novos pratos

                // Busca os pratos para a categoria específica na API
                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nomeCategoriaTheMealDB}`)
                    .then(response => response.json())
                    .then(async pratosData => {
                        if (!pratosData.meals) {
                            console.warn(`Nenhum prato encontrado para a categoria '${nomeCategoriaTheMealDB}'.`);
                            return;
                        }

                        // Limita o número de pratos por categoria para manter a performance da página
                        const pratosParaExibir = pratosData.meals.slice(0, 6);

                        // Cria e adiciona o card para cada prato no container da categoria
                        for (const pratoResumido of pratosParaExibir) {
                            const card = criarCardPrato(pratoResumido, nomeCategoriaLocal);
                            containerParaPratos.appendChild(card);
                        }
                    })
                    .catch(error => console.error(`Erro ao buscar pratos da categoria '${nomeCategoriaTheMealDB}':`, error));
            } else {
                console.warn(`Categoria TheMealDB '${nomeCategoriaTheMealDB}' não mapeada para um contêiner local ou o contêiner não existe.`);
            }
        });
    })
    .catch(error => console.error('Erro ao buscar categorias principais da TheMealDB:', error));

// ========================================
// 6. EVENT LISTENERS E INICIALIZAÇÃO DO DOM
// Funções que são executadas após o carregamento do DOM,
// configurando interações do usuário e componentes dinâmicos.
// ========================================

/**
 * Listener que garante que o código só será executado após o DOM estar completamente carregado.
 * Evita erros de "Cannot read properties of null".
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica do Carrossel ---
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlide = document.querySelector('.carousel-slide');

    // Verifica se os elementos do carrossel existem antes de tentar manipulá-los
    if (carouselSlide && carouselContainer) {
        const images = document.querySelectorAll('.carousel-slide img');
        const numOriginalImages = images.length;

        if (numOriginalImages > 0) {
            // Clona a primeira e a última imagem para criar um efeito de loop infinito suave
            const firstImageClone = images[0].cloneNode(true);
            const lastImageClone = images[numOriginalImages - 1].cloneNode(true);
            carouselSlide.appendChild(firstImageClone);
            carouselSlide.prepend(lastImageClone);
        }

        const allImages = document.querySelectorAll('.carousel-slide img');
        const totalImages = allImages.length;

        let counter = 1; // Começa na primeira imagem real (após o clone da última)
        let slideWidth = carouselContainer.clientWidth;

        // Define a largura total do container do slide para que as imagens se alinhem horizontalmente
        carouselSlide.style.width = `${slideWidth * totalImages}px`;

        // Posiciona o carrossel na primeira imagem real sem transição para evitar flash inicial
        carouselSlide.style.transition = 'none';
        carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
        // Reabilita a transição após o posicionamento inicial
        setTimeout(() => {
            carouselSlide.style.transition = "transform 0.5s ease-in-out";
        }, 0);

        /**
         * Move o carrossel para a próxima imagem.
         */
        function slideCarousel() {
            carouselSlide.style.transition = "transform 0.5s ease-in-out";
            carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
        }

        // Configura o avanço automático do carrossel a cada 3 segundos
        setInterval(() => {
            counter++;
            slideCarousel();
        }, 3000);

        // Listener para o final da transição do carrossel, lidando com o loop infinito
        carouselSlide.addEventListener('transitionend', () => {
            // Se chegou ao clone da primeira imagem (no final), volta para a primeira imagem real
            if (counter >= totalImages - 1) {
                carouselSlide.style.transition = 'none';
                counter = 1;
                carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
            }
            // Se chegou ao clone da última imagem (no início), volta para a última imagem real
            if (counter <= 0) {
                carouselSlide.style.transition = 'none';
                counter = numOriginalImages;
                carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
            }
        });

        // Ajusta a largura do slide em caso de redimensionamento da janela, garantindo responsividade
        window.addEventListener('resize', () => {
            slideWidth = carouselContainer.clientWidth;
            carouselSlide.style.width = `${slideWidth * totalImages}px`;
            carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
            // Reabilita a transição após um pequeno atraso para que a próxima animação seja suave
            setTimeout(() => {
                carouselSlide.style.transition = "transform 0.5s ease-in-out";
            }, 0);
        });
    } else {
        console.warn("Elemento .carousel-slide ou .carousel-container não encontrado. Carrossel não inicializado.");
    }

    // --- Lógica do Botão "Voltar ao Topo" ---
    const backToTopButton = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 300; // Define quantos pixels de rolagem são necessários para exibir o botão

    // Adiciona um listener de rolagem à janela para mostrar/esconder o botão "Voltar ao Topo"
    window.addEventListener('scroll', () => {
        if (backToTopButton) { // Verifica se o botão existe antes de manipulá-lo
            if (window.scrollY > scrollThreshold) {
                backToTopButton.style.display = 'block'; // Mostra o botão
            } else {
                backToTopButton.style.display = 'none'; // Esconde o botão
            }
        }
    });

    // Adiciona um listener de clique ao botão "Voltar ao Topo" para rolar suavemente para o topo da página
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Rolagem suave
            });
        });
    }


    // --- Event Listeners para o Modal da Sacola ---
    // Adiciona listener de clique ao ícone da sacola para exibir o modal e atualizar seu conteúdo
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (cartModal) {
                cartModal.style.display = 'flex'; // Exibe o modal (usando flex para centralizar via CSS)
                updateCartDisplay(); // Garante que a sacola esteja atualizada ao abrir
            }
        });
    }

    // Adiciona listener de clique ao botão de fechar do modal para escondê-lo
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    // Adiciona listener de clique à janela para fechar o modal se o clique for fora do conteúdo do modal
    if (cartModal) { // Verifica se o modal existe para evitar erro se ele não estiver no HTML
        window.addEventListener('click', (event) => {
            if (event.target == cartModal) { // Se o clique foi no fundo escuro do modal
                cartModal.style.display = 'none';
            }
        });
    }


    // Adiciona um listener de clique ao container de itens da sacola para gerenciar ações em seus botões internos
    // Usa "event delegation" para lidar com cliques em botões de quantidade e remoção de itens dinamicamente adicionados
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            const target = event.target;
            const itemId = target.dataset.id; // Pega o ID do item do atributo `data-id`

            if (target.classList.contains('increase-quantity')) {
                updateItemQuantity(itemId, 1); // Aumenta a quantidade
            } else if (target.classList.contains('decrease-quantity')) {
                updateItemQuantity(itemId, -1); // Diminui a quantidade
            } else if (target.classList.contains('remove-item-btn')) {
                removeFromCart(itemId); // Remove o item
            }
        });
    }

    // Adiciona listener de clique ao botão "Finalizar Pedido"
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                alert('Pedido finalizado! Obrigado por sua compra.');
                cart.length = 0; // Esvazia a sacola
                updateCartDisplay(); // Atualiza a exibição da sacola
                cartModal.style.display = 'none'; // Fecha o modal
            } else {
                alert('Sua sacola está vazia. Adicione itens antes de finalizar o pedido.');
            }
        });
    }

    // --- Event Listener para o formulário de busca ---
    // Adiciona listener de 'submit' ao formulário de busca para processar a consulta do usuário
    if (searchForm) {
        searchForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
            const searchTerm = searchInput.value.trim(); // Obtém o termo de busca, removendo espaços extras

            if (searchTerm) {
                // Esconde o carrossel quando a busca é ativada para dar destaque aos resultados
                const carouselContainerCheck = document.querySelector('.carousel-container'); // Re-seleciona para garantir que existe
                if (carouselContainerCheck) {
                    carouselContainerCheck.style.display = 'none';
                }
                await searchMeals(searchTerm); // Executa a função de busca
            } else {
                alert('Por favor, digite um termo para buscar.');
            }
        });
    }


    // --- Event Listener para o link da Logo ---
    // Adiciona listener de clique ao link da logo para resetar a visualização da página (voltar ao estado inicial)
    if (logoLink) {
        logoLink.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão de link (navegar para outra página)
            resetView(); // Chama a função que reseta a visualização
        });
    }
}); // Fim do DOMContentLoaded