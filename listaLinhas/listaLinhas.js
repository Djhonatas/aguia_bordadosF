document.addEventListener('DOMContentLoaded', () => {
  loadAllLinhas();

  document.getElementById('searchButton').addEventListener('click', () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    filterLinhas(searchValue);
  });

  document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase();
    filterLinhas(searchValue);
  });
});

async function loadAllLinhas() {
  const url = 'http://localhost:8080/listaLinhas';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const tableBody = document.querySelector('#todasLinhasTable tbody');
    tableBody.innerHTML = '';

    data.forEach(linhas => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${linhas.nome}</td>
        <td>${linhas.codLinha}</td>
      `;
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Erro ao carregar Linhas:', error);
  }
}

function filterLinhas(searchValue) {
  const rows = document.querySelectorAll('#todasLinhasTable tbody tr');
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
