document.addEventListener('DOMContentLoaded', () => {
  const forms = [
    { id: 'clienteForm', handler: handleSubmitCliente },
    { id: 'produtoForm', handler: handleSubmitProduto },
    { id: 'linhaForm', handler: handleSubmitLinha },
    { id: 'estoqueForm', handler: handleSubmitEstoque },
    { id: 'bordadoForm', handler: handleSubmitBordado }
  ];

  forms.forEach(({ id, handler }) => {
    const form = document.getElementById(id);
    if (form) {
      form.addEventListener('submit', handler);
    }
  });

  const linksNavbar = document.querySelectorAll('nav ul li a');
  linksNavbar.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionId = link.getAttribute('href');
      showSection(sectionId);
    });
  });

  const defaultSection = 'home';
  showSection(`#${defaultSection}`);
  loadHomeTable();

  // Adiciona o listener para o campo de pesquisa
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', filterTable);

  const verTodosBordadosBtn = document.getElementById('verTodosBordados');
  if (verTodosBordadosBtn) {
    verTodosBordadosBtn.addEventListener('click', () => {
      window.location.href = '/listaBordados/listaBordados.html'; // Redireciona para a nova página
    });
  }

  const listaEstoque = document.getElementById('listaEstoque');
  if (listaEstoque) {
    listaEstoque.addEventListener('click', () => {
      window.location.href = '/listaEstoque/listaEstoque.html';
    });
  }

  const listaClientes = document.getElementById('listaClientes');
  if (listaClientes) {
    listaClientes.addEventListener('click', () => {
      window.location.href = '/listaClientes/listaClientes.html';
    });
  }

  const listaProdutos = document.getElementById('listaProdutos');
  if (listaProdutos) {
    listaProdutos.addEventListener('click', () => {
      window.location.href = '/listaProdutos/listaProdutos.html';
    });
  }

  const listaLinhas = document.getElementById('listaLinhas');
  if (listaLinhas) {
    listaLinhas.addEventListener('click', () => {
      window.location.href = '/listaLinhas/listaLinhas.html';
    });
  }
});

async function filterTable() {
  const filterValue = document.getElementById('searchInput').value.toUpperCase();
  const table = document.getElementById('homeTable');
  const rows = table.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let found = false;
    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent || cells[j].innerText;
      if (cellText.toUpperCase().indexOf(filterValue) > -1) {
        found = true;
        break;
      }
    }
    rows[i].style.display = found ? '' : 'none';
  }
}

// Função da Home
async function loadHomeTable() {
  const url = 'https://aguia-bordados.vercel.app/home'; // Atualize para URL de produção

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Verifique o formato dos dados recebidos
    console.log('Dados recebidos:', data);

    const tableBody = document.querySelector('#homeTable tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.clientenome || 'N/A'}</td>
        <td>${item.produtonome || 'N/A'}</td>
        <td>${item.quantidade || 'N/A'}</td>
        <td>${item.bordadonome || 'N/A'}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    showAlert('Erro ao carregar dados da tabela. Tente novamente.', 'error');
  }
}


function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = section.id === sectionId.substring(1) ? 'block' : 'none';
  });
}

// Função de mensagens
function showAlert(message, type = 'success') {
  const alertBox = document.createElement('div');
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;

  const formSection = document.querySelector('.content-section.show') || document.querySelector('.content-section');
  if (formSection) {
    formSection.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 5000);
  } else {
    console.error('Element .content-section or .content-section.show not found.');
  }
}

// Função de inserção dos clientes
async function handleSubmitCliente(event) {
  event.preventDefault();
  const form = event.target;
  const url = 'https://aguia-bordados.vercel.app/clientes'; // Atualize para URL de produção

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });

    const data = await response.json();
    form.reset();
    if (!response.ok) {
      showAlert(data.mensagem || 'Erro ao criar cliente. Verifique os dados e tente novamente.', 'error');
    } else {
      showAlert('Cliente criado com sucesso!');
    }
  } catch (error) {
    showAlert('Erro ao criar cliente. Verifique os dados e tente novamente.', 'error');
  }
}

// Função de inserção dos produtos
async function handleSubmitProduto(event) {
  event.preventDefault();
  const form = event.target;
  const url = 'https://aguia-bordados.vercel.app/produtos'; // Atualize para URL de produção

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });

    const data = await response.json();
    if (!response.ok) {
      if (response.status === 404) {
        showAlert('Cliente não encontrado. Cadastre o cliente primeiro.', 'error');
      } else {
        showAlert(data.mensagem || 'Erro ao criar produto. Verifique os dados e tente novamente.', 'error');
      }
    } else {
      form.reset();
      showAlert('Produto criado com sucesso!');
    }
  } catch (error) {
    showAlert('Erro ao criar produto. Verifique os dados e tente novamente.', 'error');
  }
}

// Função de inserção de linhas
async function handleSubmitLinha(event) {
  event.preventDefault();
  const form = event.target;
  const url = 'https://aguia-bordados.vercel.app/linhas'; // Atualize para URL de produção

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });

    const data = await response.json();
    form.reset();
    if (!response.ok) {
      showAlert(data.mensagem || 'Erro ao criar linha. Verifique os dados e tente novamente.', 'error');
    } else {
      showAlert('Linha criada com sucesso!');
    }
  } catch (error) {
    showAlert('Erro ao criar linha. Verifique os dados e tente novamente.', 'error');
  }
}

// Função de inserção de estoque
async function handleSubmitEstoque(event) {
  event.preventDefault();
  const form = event.target;
  const url = 'https://aguia-bordados.vercel.app/estoque'; // Atualize para URL de produção

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });

    const data = await response.json();
    form.reset();
    if (!response.ok) {
      showAlert(data.mensagem || 'Erro ao criar estoque. Verifique os dados e tente novamente.', 'error');
    } else {
      showAlert('Estoque criado com sucesso!');
    }
  } catch (error) {
    showAlert('Erro ao criar estoque. Verifique os dados e tente novamente.', 'error');
  }
}

// Função de inserção de bordado
async function handleSubmitBordado(event) {
  event.preventDefault();
  const form = event.target;
  const url = 'https://aguia-bordados.vercel.app/bordados'; // Atualize para URL de produção

  try {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Processar o campo cores
    data.cores = data.cores.split(' ').map(cor => cor.trim());

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    form.reset();
    if (!response.ok) {
      showAlert(responseData.mensagem || 'Erro ao criar bordado. Verifique os dados e tente novamente.', 'error');
    } else {
      showAlert('Bordado criado com sucesso!');
    }
  } catch (error) {
    showAlert('Erro ao criar bordado. Verifique os dados e tente novamente.', 'error');
  }
}
