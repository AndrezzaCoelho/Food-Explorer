// --- Definições Globais ---
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

// Função para gerar um preço aleatório (já que a API não oferece)
function gerarPrecoAleatorio() {
    const min = 30; // Preço mínimo
    const max = 120; // Preço máximo
    // Gera um preço entre min e max, com centavos
    return (Math.random() * (max - min) + min).toFixed(2);
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
                            const nomeOriginal = pratoResumido.strMeal;
                            // Usar a tradução manual se existir, senão, usar o nome original
                            const nomeTraduzido = nomePratoTraduzido[nomeOriginal] || nomeOriginal;
                            
                            const descricaoPrato = getDescricaoGenerica(nomeCategoriaLocal);
                            const precoPrato = gerarPrecoAleatorio();

                            // --- INÍCIO: ALTERAÇÃO PARA CRIAR ELEMENTOS E BOTÕES ---
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
                            pPrice.textContent = `R$ ${precoPrato.replace('.', ',')}`;
                            card.appendChild(pPrice);

                            // Container para os botões
                            const buttonContainer = document.createElement('div');
                            buttonContainer.classList.add('card-buttons');
                            card.appendChild(buttonContainer);

                            // Botão Detalhes
                            const detailsButton = document.createElement('button');
                            detailsButton.classList.add('btn', 'btn-details');
                            detailsButton.textContent = 'Detalhes';
                            // Adicionando um listener de evento para o botão Detalhes
                            detailsButton.addEventListener('click', () => {
                                // Aqui você pode adicionar sua lógica para mostrar detalhes do prato
                                // Por exemplo, abrir um modal com mais informações ou navegar para uma página de detalhes
                                alert(`Detalhes do prato: ${nomeTraduzido}\nPreço: R$ ${precoPrato.replace('.', ',')}\nDescrição: ${descricaoPrato}`);
                                console.log('Detalhes do prato:', {
                                    id: pratoResumido.idMeal,
                                    name: nomeTraduzido,
                                    category: nomeCategoriaTheMealDB,
                                    description: descricaoPrato,
                                    price: precoPrato,
                                    image: pratoResumido.strMealThumb
                                });
                            });
                            buttonContainer.appendChild(detailsButton);

                            // Botão Adicionar à Sacola
                            const addToCartButton = document.createElement('button');
                            addToCartButton.classList.add('btn', 'btn-add-to-cart');
                            addToCartButton.textContent = '+';
                            // Adicionando um listener de evento para o botão Adicionar à Sacola
                            addToCartButton.addEventListener('click', () => {
                                // Aqui você pode adicionar sua lógica para adicionar o item ao carrinho
                                // Por exemplo, adicionar a um array no seu JavaScript, atualizar um contador, etc.
                                alert(`"${nomeTraduzido}" adicionado à sacola!`);
                                console.log('Item adicionado à sacola:', {
                                    id: pratoResumido.idMeal,
                                    name: nomeTraduzido,
                                    price: precoPrato
                                });
                            });
                            buttonContainer.appendChild(addToCartButton);

                            containerParaPratos.appendChild(card);
                            // --- FIM: ALTERAÇÃO PARA CRIAR ELEMENTOS E BOTÕES ---
                        }
                    })
                    .catch(error => console.error(`Erro ao buscar pratos da categoria '${nomeCategoriaTheMealDB}':`, error));
            } else {
                console.warn(`Categoria TheMealDB '${nomeCategoriaTheMealDB}' não mapeada para um contêiner local ou o contêiner não existe.`);
            }
        });
    })
    .catch(error => console.error('Erro ao buscar categorias principais da TheMealDB:', error));

// --- Lógica do Carrossel ---
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
        
        //logica do botão voltar ao topo
        

        // Ajusta a largura do slide em caso de redimensionamento da janela
        window.addEventListener('resize', () => {
            slideWidth = carouselContainer.clientWidth;
            carouselSlide.style.transition = 'none'; // Desabilita transição para ajuste instantâneo
            carouselSlide.style.transform = 'translateX(' + (-slideWidth * counter) + 'px)';
        });
    } else {
        console.warn("Elemento .carousel-slide ou .carousel-container não encontrado.");
    }
});