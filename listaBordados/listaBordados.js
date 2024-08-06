document.addEventListener('DOMContentLoaded', () => {
  loadAllBordados();

  document.getElementById('searchButton').addEventListener('click', () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    filterBordados(searchValue);
  });

  document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase();
    filterBordados(searchValue);
  });
});

async function loadAllBordados() {
  const url = 'http://localhost:8080/listaBordados';

  try {
    const response = await fetch(url);
    const data = await response.json();
    const tableBody = document.querySelector('#todosBordadosTable tbody');
    tableBody.innerHTML = '';

    data.forEach(bordado => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${bordado.nome}</td>
        <td>${bordado.descricao}</td>
        <td><button class="detailButton" data-id="${bordado.id}">Detalhe</button></td>
      `;
      tableBody.appendChild(row);
    });

    document.querySelectorAll('.detailButton').forEach(button => {
      button.addEventListener('click', async (event) => {
        const bordadoId = event.target.getAttribute('data-id');
        await showBordadoDetalhes(bordadoId);
      });
    });
  } catch (error) {
    console.error('Erro ao carregar bordados:', error);
  }
}

function filterBordados(searchValue) {
  const rows = document.querySelectorAll('#todosBordadosTable tbody tr');
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

async function showBordadoDetalhes(bordadoId) {
  const url = `http://localhost:8080/listaBordados/${bordadoId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const detalhes = `
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Descrição:</strong> ${data.descricao}</p>
      <p><strong>Cores:</strong> ${data.cores.join(', ')}</p>
    `;
    document.getElementById('bordadoDetalhes').innerHTML = detalhes;

    const modal = document.getElementById('detailDialog');
    modal.style.display = 'block';

    document.querySelector('.close').onclick = function () {
      modal.style.display = 'none';
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  } catch (error) {
    console.error('Erro ao carregar detalhes do bordado:', error);
  }
}

function voltar() {
  window.location.href = '/index.html';
}
