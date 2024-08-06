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
  const url = 'http://localhost:8080/listaProdutos';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const tableBody = document.querySelector('#todosProdutosTable tbody');
    tableBody.innerHTML = '';


    data.forEach(Produtos => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${Produtos.nome}</td>
        <td>${Produtos.dataEntrada}</td>
        <td>${Produtos.nomeBordado}</td>
        <td>${Produtos.quantidade}</td>
        <td>${Produtos.Nome}</td >
        `;
      // <td><button class="detailButton" data-id="${Produtos.id}">Detalhe</button></td>
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Erro ao carregar Produtos:', error);
  }
}

function filterProdutos(searchValue) {
  const rows = document.querySelectorAll('#todosProdutosTable tbody tr');
  rows.forEach(row => {
    const nome = row.querySelector('td:first-child').textContent.toLowerCase();
    const descricao = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    if (nome.includes(searchValue) || descricao.includes(searchValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}


function voltar() {
  window.location.href = '/index.html';
}
