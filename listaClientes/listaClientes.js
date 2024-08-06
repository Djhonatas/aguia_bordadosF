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
  const url = 'https://aguia-bordados.vercel.app/listaClientes'; // Atualize para URL de produção

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Resposta da API:', data)
    const tableBody = document.querySelector('#todosClientesTable tbody');
    tableBody.innerHTML = '';

    data.forEach(cliente => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.endcompleto}</td>
        <td>${cliente.telefone}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
}

function filterClientes(searchValue) {
  const rows = document.querySelectorAll('#todosClientesTable tbody tr');
  rows.forEach(row => {
    const nome = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
    const email = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const endereco = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const telefone = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
    if (nome.includes(searchValue) || email.includes(searchValue) || endereco.includes(searchValue) || telefone.includes(searchValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function voltar() {
  window.location.href = '/index.html';
}
