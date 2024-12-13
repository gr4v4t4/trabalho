let carrinho = [];

function mostrarCarrinho() {
    const carrinhoElement = document.getElementById('carrinho-flutuante');
    atualizarCarrinho();
    carrinhoElement.style.display = 'block';
}

function fecharCarrinho() {
    document.getElementById('carrinho-flutuante').style.display = 'none';
}

function fazerPedido(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    alert(`${nome} adicionado ao carrinho!`);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    const totalElement = document.getElementById('total-carrinho');
    lista.innerHTML = '';
    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco * item.quantidade;
        lista.innerHTML += `
            <li>${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
                <button onclick="alterarQuantidade(${index}, 1)">+</button>
                <button onclick="alterarQuantidade(${index}, -1)">-</button>
            </li>`;
    });
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function alterarQuantidade(index, valor) {
    if (carrinho[index]) {
        carrinho[index].quantidade += valor;
        if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
        }
        atualizarCarrinho();
    }
}

function finalizarPedido() {
    const botao = document.getElementById('btn-finalizar');
    botao.textContent = 'Finalizando...';
    botao.disabled = true;
    setTimeout(() => {
        alert('Pedido finalizado com sucesso!');
        carrinho = [];
        atualizarCarrinho();
        botao.textContent = 'Finalizar Pedido';
        botao.disabled = false;
    }, 3000);
}

