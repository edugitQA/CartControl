document.addEventListener('DOMContentLoaded', function() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) window.location.href = 'index.html';

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
    let historico = usuarios[usuarioLogado]?.historico || {};

    const historicoContainer = document.getElementById('historico-container');
    const btnLimparHistorico = document.getElementById('limpar-historico-btn');
    const btnVoltar = document.getElementById('voltar-btn');

    if (!historicoContainer || !btnLimparHistorico || !btnVoltar) {
        console.error('❌ Elementos do DOM não encontrados. Verifique os IDs no HTML.');
        return;
    }

    function exibirHistorico() {
        historicoContainer.innerHTML = '';

        const datas = Object.keys(historico).sort((a, b) => new Date(b) - new Date(a));

        if (datas.length === 0) {
            historicoContainer.innerHTML = '<p>⚠️ Nenhuma compra registrada no histórico.</p>';
            btnLimparHistorico.style.display = 'none';
            return;
        }

        datas.forEach((data, index) => {
            const compra = historico[data];
            const divCompra = document.createElement('div');
            divCompra.classList.add('historico-item');
            divCompra.innerHTML = `
                <h3 class="titulo-compra">🛒 Compra ${index + 1} - ${data}</h3>
                <div class="itens-compra" style="display: none;">
                    <ul>
                        ${compra.itens
                            .map(item => `<li>${item.nome} - R$ ${item.valor.toFixed(2)} x ${item.quantidade}</li>`)
                            .join('')}
                    </ul>
                    <p><strong>Total:</strong> R$ ${parseFloat(compra.total).toFixed(2)}</p>
                    <hr>
                </div>
            `;
            historicoContainer.appendChild(divCompra);

            // 👇 Exibe ou oculta os itens ao clicar no título
            const tituloCompra = divCompra.querySelector('.titulo-compra');
            const itensCompra = divCompra.querySelector('.itens-compra');
            tituloCompra.addEventListener('click', () => {
                itensCompra.style.display = itensCompra.style.display === 'none' ? 'block' : 'none';
            });
        });

        btnLimparHistorico.style.display = 'block';
    }

    function limparHistorico() {
        const confirmar = confirm('🗑️ Tem certeza que deseja apagar TODO o histórico de compras?');
        if (confirmar) {
            usuarios[usuarioLogado].historico = {};
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            historico = {};
            exibirHistorico();
            alert('✅ Histórico de compras apagado com sucesso!');
        }
    }

    btnLimparHistorico.addEventListener('click', limparHistorico);
    btnVoltar.addEventListener('click', () => window.location.href = 'carrinho.html');

    exibirHistorico();
});
