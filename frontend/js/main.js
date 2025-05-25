// --- Definições Globais (Mantenha as suas existentes e adicione estas) ---
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
    'Miscellaneous': 'executivos' // Use a categoria que mais se encaixa ou crie uma nova
};

const containersPorCategoria = {
    'destaques': document.getElementById('pratos-container-destaques'),
    'executivos': document.getElementById('pratos-container-executivos'),
    'massas': document.getElementById('pratos-container-massas'),
    'sobremesas': document.getElementById('pratos-container-sobremesas'),
    'bebidas': document.getElementById('pratos-container-bebidas')
};

// NOVO: Mapeamento manual de nomes de pratos (adicione mais traduções aqui conforme necessário)
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
    // Adicione mais traduções conforme os pratos apareçam ou se você quiser personalizar
};

// NOVO: Descrições genéricas em português por categoria
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

// --- NOVAS VARIÁVEIS GLOBAIS PARA A SACORA ---
const cart = []; // Array para armazenar os itens na sacola
const cartItemCountSpan = document.getElementById('cartItemCount');
const cartTotalSpan = document.getElementById('cartTotal');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartModal = document.getElementById('cartModal');
const closeButton = document.querySelector('.close-button');
const cartIcon = document.getElementById('cartIcon');
const checkoutButton = document.getElementById('checkoutButton');
const emptyCartMessage = document.getElementById('emptyCartMessage');

// NOVO: Elementos da busca
const searchForm = document.querySelector('header nav form'); // Seleciona o formulário de busca
const searchInput = document.querySelector('header nav input[type="text"]'); // Seleciona o input de busca
const searchResultsContainer = document.getElementById('searchResultsContainer'); // Container para os resultados da busca

// Função para gerar um preço aleatório (já que a API não oferece)
function gerarPrecoAleatorio() {
    const min = 30; // Preço mínimo
    const max = 120; // Preço máximo
    // Gera um preço entre min e max, com centavos
    return parseFloat((Math.random() * (max - min) + min).toFixed(2)); // Retorna como número
}

// Função para obter uma descrição genérica baseada na categoria local
function getDescricaoGenerica(categoriaLocal) {
    const descricoes = descricoesGenericas[categoriaLocal];
    if (descricoes && descricoes.length > 0) {
        const randomIndex = Math.floor(Math.random() * descricoes.length);
        return descricoes[randomIndex];
    }
    return 'Delicioso prato preparado com ingredientes frescos e muito carinho.';
}

// Função para criar e exibir um card de prato (reutilizável)
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

    const detailsButton = document.createElement('button');
    detailsButton.classList.add('btn', 'btn-details');
    detailsButton.textContent = 'Detalhes';
    detailsButton.addEventListener('click', () => {
        alert(`Detalhes do prato: ${nomeTraduzido}\nPreço: R$ ${precoPrato.toFixed(2).replace('.', ',')}\nDescrição: ${descricaoPrato}`);
        console.log('Detalhes do prato:', {
            id: pratoResumido.idMeal,
            name: nomeTraduzido,
            category: categoriaLocal, // Passa a categoria local aqui para o console.log
            description: descricaoPrato,
            price: precoPrato,
            image: pratoResumido.strMealThumb
        });
    });
    buttonContainer.appendChild(detailsButton);

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

// --- FUNÇÕES DA SACORA (NOVAS) ---
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual da sacola

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
    cartItemCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Atualiza o contador de itens na sacola
}

function addToCart(itemDetails) {
    const existingItem = cart.find(item => item.id === itemDetails.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...itemDetails, quantity: 1 });
    }
    updateCartDisplay();
    alert(`"${itemDetails.name}" adicionado à sacola! Quantidade: ${existingItem ? existingItem.quantity : 1}`);
}

function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1); // Remove o item
        updateCartDisplay();
    }
}

function updateItemQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        }
        updateCartDisplay();
    }
}

// --- Lógica de Busca de Pratos (NOVA FUNÇÃO) ---
async function searchMeals(query) {
    searchResultsContainer.innerHTML = ''; // Limpa resultados anteriores
    searchResultsContainer.style.display = 'block'; // Exibe o container de resultados

    // Esconde as seções de categorias normais enquanto os resultados da busca são exibidos
    for (const key in containersPorCategoria) {
        if (containersPorCategoria[key]) {
            containersPorCategoria[key].closest('.category-content').style.display = 'none';
        }
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        if (data.meals) {
            // Cria um cabeçalho para os resultados da busca
            const searchHeading = document.createElement('h2');
            searchHeading.textContent = `Resultados para "${query}"`;
            searchHeading.style.color = '#ebdd8f'; // Mesma cor dos títulos de categoria
            searchHeading.style.fontSize = '2em';
            searchHeading.style.marginBottom = '10px';
            searchResultsContainer.appendChild(searchHeading);

            const resultsGrid = document.createElement('div');
            resultsGrid.classList.add('pratos-categoria-container'); // Reutiliza o estilo de grid dos cards

            // Limita o número de resultados da busca para evitar sobrecarga
            const mealsToDisplay = data.meals.slice(0, 12); // Exemplo: até 12 resultados

            mealsToDisplay.forEach(meal => {
                // Tentativa de mapear a categoria da API para uma categoria local para a descrição
                const categoriaTheMealDB = meal.strCategory;
                const categoriaLocalParaDescricao = mapeamentoCategorias[categoriaTheMealDB] || 'executivos'; // Fallback

                const card = criarCardPrato(meal, categoriaLocalParaDescricao);
                resultsGrid.appendChild(card);
            });
            searchResultsContainer.appendChild(resultsGrid);
        } else {
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

// --- Lógica de Carregamento dos Pratos da TheMealDB ---
fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list') // URL para listar todas as categorias
    .then(response => response.json())
    .then(categoriasData => {
        if (!categoriasData.meals) {
            console.error('Nenhuma categoria encontrada na API TheMealDB.');
            return;
        }

        categoriasData.meals.forEach(categoriaTheMealDB => {
            const nomeCategoriaTheMealDB = categoriaTheMealDB.strCategory;
            const nomeCategoriaLocal = mapeamentoCategorias[nomeCategoriaTheMealDB];

            if (nomeCategoriaLocal && containersPorCategoria[nomeCategoriaLocal]) {
                const containerParaPratos = containersPorCategoria[nomeCategoriaLocal];

                // Limpa o conteúdo existente do container antes de adicionar novos pratos
                containerParaPratos.innerHTML = '';

                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nomeCategoriaTheMealDB}`)
                    .then(response => response.json())
                    .then(async pratosData => { // Usar async aqui para poder usar await
                        if (!pratosData.meals) {
                            console.warn(`Nenhum prato encontrado para a categoria '${nomeCategoriaTheMealDB}'.`);
                            return;
                        }

                        // Limita o número de pratos por categoria para não sobrecarregar
                        const pratosParaExibir = pratosData.meals.slice(0, 6); // Exemplo: 6 pratos por categoria

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

// --- Lógica do Carrossel (Mantenha a sua existente) ---
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlide = document.querySelector('.carousel-slide');

    if (carouselSlide && carouselContainer) {
        const images = document.querySelectorAll('.carousel-slide img');
        const numOriginalImages = images.length;

        // Garante que haja imagens para o carrossel
        if (numOriginalImages > 0) {
            // Cria clones da primeira e última imagem para o efeito de loop infinito
            const firstImageClone = images[0].cloneNode(true);
            const lastImageClone = images[numOriginalImages - 1].cloneNode(true);

            // Adiciona o clone da primeira imagem no final e o clone da última no início
            carouselSlide.appendChild(firstImageClone);
            carouselSlide.prepend(lastImageClone);
        }

        const allImages = document.querySelectorAll('.carousel-slide img');
        const totalImages = allImages.length;

        let counter = 1; // Começa na primeira imagem real (após o clone da última)
        let slideWidth = carouselContainer.clientWidth;

        // --- CORREÇÃO AQUI: Definir a largura total do carouselSlide ---
        // Isso é crucial para que o flexbox saiba o quanto de espaço as imagens precisam,
        // garantindo que fiquem lado a lado sem corte.
        carouselSlide.style.width = `${slideWidth * totalImages}px`;

        // Posiciona o carrossel no início da primeira imagem real sem transição
        carouselSlide.style.transition = 'none';
        carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
        // Reabilita a transição após o posicionamento inicial
        setTimeout(() => {
            carouselSlide.style.transition = "transform 0.5s ease-in-out";
        }, 0);

        // Função para mover o carrossel
        function slideCarousel() {
            carouselSlide.style.transition = "transform 0.5s ease-in-out";
            carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
        }

        // Auto-slide a cada 3 segundos
        setInterval(() => {
            counter++;
            slideCarousel();
        }, 3000);

        // Lidar com o loop infinito após a transição
        carouselSlide.addEventListener('transitionend', () => {
            // Se chegou ao clone da primeira imagem, volta para a primeira imagem real
            if (counter >= totalImages - 1) {
                carouselSlide.style.transition = 'none';
                counter = 1;
                carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
            }
            // Se chegou ao clone da última imagem, volta para a última imagem real
            if (counter <= 0) {
                carouselSlide.style.transition = 'none';
                counter = numOriginalImages;
                carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
            }
        });

        // --- CORREÇÃO AQUI: Ajusta a largura do slide em caso de redimensionamento da janela ---
        // Isso é vital para a responsividade! Quando a tela muda, o carrossel se adapta.
        window.addEventListener('resize', () => {
            slideWidth = carouselContainer.clientWidth;
            // Recalcula a largura total do carouselSlide para o novo tamanho do container
            carouselSlide.style.width = `${slideWidth * totalImages}px`;

            carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
            // Reabilita a transição após um pequeno atraso para que a próxima animação seja suave
            setTimeout(() => {
                carouselSlide.style.transition = "transform 0.5s ease-in-out";
            }, 0);
        });
    } else {
        console.warn("Elemento .carousel-slide ou .carousel-container não encontrado.");
    }

    // --- Lógica do Botão Voltar ao Topo (Mantenha a sua existente) ---
    const backToTopButton = document.getElementById('scrollToTopBtn'); // Corrigi o ID aqui
    const scrollThreshold = 300; // Distância em pixels para mostrar o botão
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            backToTopButton.style.display = 'block'; // Mostra o botão
        } else {
            backToTopButton.style.display = 'none'; // Esconde o botão
        }
    });

    // Adiciona evento de clique para o botão "Voltar ao Topo"
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Rolagem suave
        });
    });

    // --- Event Listeners para o Modal da Sacola (NOVOS) ---
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex'; // Exibe o modal (usando flex para centralizar)
        updateCartDisplay(); // Garante que a sacola esteja atualizada ao abrir
    });

    closeButton.addEventListener('click', () => {
        cartModal.style.display = 'none'; // Esconde o modal
    });

    // Fecha o modal se clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Adiciona listener para os botões de controle de quantidade e remover na sacola
    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target;
        const itemId = target.dataset.id; // Pega o ID do item do atributo data-id

        if (target.classList.contains('increase-quantity')) {
            updateItemQuantity(itemId, 1);
        } else if (target.classList.contains('decrease-quantity')) {
            updateItemQuantity(itemId, -1);
        } else if (target.classList.contains('remove-item-btn')) {
            removeFromCart(itemId);
        }
    });

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

    // --- Event Listener para o formulário de busca (NOVO) ---
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o recarregamento da página
        const searchTerm = searchInput.value.trim(); // Pega o valor do input e remove espaços em branco

        if (searchTerm) {
            // Esconde o carrossel quando a busca é ativada
            if (carouselContainer) {
                carouselContainer.style.display = 'none';
            }
            await searchMeals(searchTerm);
        } else {
            alert('Por favor, digite um termo para buscar.');
        }
    });
});

// NOVO: Obtenha a referência ao link da logo
const logoLink = document.getElementById('logoLink'); // Ou use querySelector('.nav-logo')

// ... (suas outras variáveis e funções) ...

// Adicione este event listener dentro do DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... (seus event listeners existentes) ...

    logoLink.addEventListener('click', (event) => {
        event.preventDefault(); // Impede o comportamento padrão de link
        resetView(); // Chama a função que reseta a visualização
    });
});