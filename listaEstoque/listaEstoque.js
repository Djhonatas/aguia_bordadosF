document.addEventListener('DOMContentLoaded', () => {
  loadAllEstoque();

  document.getElementById('searchButton').addEventListener('click', () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    filterEstoque(searchValue);
  });

  document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase();
    filterEstoque(searchValue);
  });
});

async function loadAllEstoque() {
  const url = 'http://localhost:8080/listaEstoque';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const tableBody = document.querySelector('#todosEstoqueTable tbody');
    tableBody.innerHTML = '';

    data.forEach(estoque => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${estoque.nome}</td>
        <td>${estoque.quantidade}</td>
        <td>${estoque.dataCompra}</td>
        <td>${estoque.valorPago}</td>
      `;
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Erro ao carregar Estoque:', error);
  }
}

function filterEstoque(searchValue) {
  const rows = document.querySelectorAll('#todosEstoqueTable tbody tr');
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
