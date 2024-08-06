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
  const url = 'https://aguia-bordados.vercel.app/listaEstoque';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const tableBody = document.querySelector('#todosEstoqueTable tbody');
    tableBody.innerHTML = '';

    data.forEach(estoque => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${estoque.nome || 'N/A'}</td>
        <td>${estoque.quantidade !== undefined ? estoque.quantidade : 'N/A'}</td>
        <td>${estoque.datacompra ? new Date(estoque.datacompra).toLocaleDateString() : 'N/A'}</td>
        <td>${estoque.valorpago !== undefined ? parseFloat(estoque.valorpago).toFixed(2) : 'N/A'}</td>
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
    const quantidade = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const dataCompra = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const valorPago = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
    if (nome.includes(searchValue) || quantidade.includes(searchValue) || dataCompra.includes(searchValue) || valorPago.includes(searchValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function voltar() {
  window.location.href = '/index.html';
}
