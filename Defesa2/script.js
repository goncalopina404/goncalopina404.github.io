// Carregar categorias
function carregarCategorias() {
  fetch('https://deisishop.pythonanywhere.com/categories/')
      .then(response => {
          if (!response.ok) {
              throw new Error(`Erro ao carregar categorias: ${response.statusText}`);
          }
          return response.json();
      })
      .then(categorias => {
          const selectCategoria = document.getElementById('select-categoria');
          categorias.forEach(categoria => {
              const option = document.createElement('option');
              option.value = categoria;
              option.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
              selectCategoria.appendChild(option);
          });
      })
      .catch(error => console.error('Erro ao carregar categorias:', error));
}

// Carregar produtos
let todosProdutos = [];
let carrinho = [];

function carregarProdutos() {
  fetch('https://deisishop.pythonanywhere.com/products/')
      .then(response => {
          if (!response.ok) {
              throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
          }
          return response.json();
      })
      .then(produtos => {
          todosProdutos = produtos;
          exibirProdutos(produtos);
      })
      .catch(error => {
          console.error('Erro ao carregar produtos:', error);
          document.getElementById('lista-produtos').innerHTML = '<li>Erro ao carregar os produtos. Tente novamente mais tarde.</li>';
      });
}

// Exibir produtos na lista
function exibirProdutos(produtos) {
  const listaProdutos = document.getElementById('lista-produtos');
  listaProdutos.innerHTML = '';
  produtos.forEach(produto => {
      const item = document.createElement('li');
      item.innerHTML = `
          <img src="${produto.image}" alt="${produto.title}">
          <span>${produto.title} - R$${produto.price.toFixed(2)}</span>
          <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
      `;
      listaProdutos.appendChild(item);
  });
}

// Ordenar produtos por preço
function ordenarProdutos(ordenacao) {
  let produtosOrdenados;
  if (ordenacao === 'crescente') {
      produtosOrdenados = todosProdutos.slice().sort((a, b) => a.rating - b.rating);
  } else if (ordenacao === 'decrescente') {
      produtosOrdenados = todosProdutos.slice().sort((a, b) => b.rating - a.rating);
  }
  exibirProdutos(produtosOrdenados);
}

// Adicionar evento para o seletor de ordenação
document.getElementById('select-ordenacao').addEventListener('change', function () {
  const ordenacaoSelecionada = this.value;
  ordenarProdutos(ordenacaoSelecionada);
});

// Adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
  const produto = todosProdutos.find(produto => produto.id === id);
  if (produto) {
      carrinho.push(produto);
      atualizarCarrinho();
      alert(`Produto "${produto.title}" adicionado ao carrinho!`);
  } else {
      alert('Produto não encontrado.');
  }
}
// Defesa2 
function adicionarTodos(){
    todosProdutos.forEach(produto =>{
        carrinho.push(produto);
    });
    atualizarCarrinho();
}


// Remover produto do carrinho
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// Atualizar carrinho
function atualizarCarrinho() {
  const listaCarrinho = document.getElementById('lista-carrinho');
  const totalElement = document.getElementById('total');
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((produto, index) => {
      total += produto.price;
      const item = document.createElement('li');
      item.innerHTML = `
          <img src="${produto.image}" alt="${produto.title}">
          <span>${produto.title} - R$${produto.price.toFixed(2)}</span>
          <button onclick="removerDoCarrinho(${index})">Remover</button>
      `;
      listaCarrinho.appendChild(item);
  });

  totalElement.textContent = `Total: R$${total.toFixed(2)}`;
}

function finalizarCompra() {
    // Verifica se a caixa de estudante está marcada e captura o desconto do input
    const estudante = document.getElementById('check-estudante').checked;
    const desconto = document.getElementById('input-desconto').value;
    const morada = document.getElementById('input-morada');

    let totalComDesconto = carrinho.reduce((total, produto) => total + produto.price, 0);
    if (estudante) {
        totalComDesconto *= 0.95; // Aplica um desconto de 5% se for estudante
    }
    if (desconto) {
        // Aqui, você pode implementar a lógica de validação do código de desconto se necessário
        console.log(`Desconto aplicado: ${desconto}`);
    }

    // Verifica se o carrinho está vazio antes de prosseguir
    if (carrinho.length === 0) {
        alert('O carrinho está vazio. Adicione produtos antes de finalizar a compra.');
        return;
    }

    const requestData = {
        products: carrinho.map(item => item.id), // Envia os IDs dos produtos
        student: estudante,
        coupon: desconto,
        address: morada
    };

    // Faz a requisição para a API de compra
    fetch('https://deisishop.pythonanywhere.com/buy/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao processar a compra: ' + response.statusText);
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        // Exibe o valor total e a referência de pagamento
        const valorFinalElement = document.getElementById('valor-final');
        const referenciaElement = document.getElementById('referencia');
        const moradas = document.getElementById('morada');


        valorFinalElement.textContent = `Valor final a pagar: R$ ${parseFloat(data.totalCost).toFixed(2)}`;
        referenciaElement.textContent = `Referência de pagamento: ${data.reference}`;
        moradas.textContent = `Morada onde vai ser mandado: ${data.address}`;


        // Exibe a seção de resultado
        document.getElementById('resultado-compra').style.display = 'block';
    })
    .catch(error => {
        console.error('Erro ao finalizar a compra:', error);
        alert('Houve um erro ao processar a compra. Tente novamente mais tarde.');
    });
}


// Filtrar produtos por categoria
function filtrarPorCategoria(categoria) {
  if (categoria === 'todas') {
      exibirProdutos(todosProdutos);
  } else {
      const produtosFiltrados = todosProdutos.filter(produto => produto.category === categoria);
      exibirProdutos(produtosFiltrados);
  }
}

// Pesquisar produtos por nome
function pesquisarProdutos(nome) {
  const produtosFiltrados = todosProdutos.filter(produto => produto.title.toLowerCase().includes(nome.toLowerCase()));
  exibirProdutos(produtosFiltrados);
}

// Configurar eventos de mudança
document.getElementById('select-categoria').addEventListener('change', function () {
  const categoriaSelecionada = this.value;
  filtrarPorCategoria(categoriaSelecionada);
});

document.getElementById('input-pesquisa').addEventListener('input', function () {
  const termoPesquisa = this.value;
  pesquisarProdutos(termoPesquisa);
});

// Inicializar ao carregar a página
carregarCategorias();
carregarProdutos();
