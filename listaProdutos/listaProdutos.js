document.addEventListener('DOMContentLoaded', () => {
  loadAllProdutos();

  document.getElementById('searchButton').addEventListener('click', () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    filterProdutos(searchValue);
  });

  document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase();
    filterProdutos(searchValue);
  });
});

async function loadAllProdutos() {
  const url = 'https://aguia-bordados.vercel.app/listaProdutos';

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Dados recebidos:', data); // Verifique os dados aqui
    const tableBody = document.querySelector('#todosProdutosTable tbody');
    tableBody.innerHTML = '';

    data.forEach(produto => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.dataentrada}</td>
        <td>${produto.nomebordado}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.nomecliente}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Erro ao carregar Produtos:', error);
  }
}


function filterProdutos(searchValue) {
  const rows = document.querySelectorAll('#todosProdutosTable tbody tr');
  rows.forEach(row => {
    const nome = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
    const data = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const bordado = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const quantidade = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
    const cliente = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
    if (nome.includes(searchValue) || data.includes(searchValue) || bordado.includes(searchValue) || quantidade.includes(searchValue) || cliente.includes(searchValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function voltar() {
  window.location.href = '/index.html';
}
