document.addEventListener('DOMContentLoaded', () => {
  loadAllClientes();

  document.getElementById('searchButton').addEventListener('click', () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    filterClientes(searchValue);
  });

  document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase();
    filterClientes(searchValue);
  });
});

async function loadAllClientes() {
  const url = 'http://localhost:8080/listaClientes';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const tableBody = document.querySelector('#todosClientesTable tbody');
    tableBody.innerHTML = '';

    data.forEach(Clientes => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${Clientes.nome}</td>
        <td>${Clientes.email}</td>
        <td>${Clientes.endCompleto}</td>
        <td>${Clientes.telefone}</td>
        
      `;
      // <td><button class="detailButton" data-id="${estoque.id}">Detalhe</button></td>
      tableBody.appendChild(row);
    });

    document.querySelectorAll('.detailButton').forEach(button => {
      button.addEventListener('click', async (event) => {
        const bordadoId = event.target.getAttribute('data-id');
        await showBordadoDetalhes(bordadoId);
      });
    });
  } catch (error) {
    console.error('Erro ao carregar Clientes:', error);
  }
}

function filterClientes(searchValue) {
  const rows = document.querySelectorAll('#todosClientesTable tbody tr');
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
