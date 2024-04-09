// Função para adicionar uma tarefa à lista
function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    criaNovoItemDaLista(novaTarefa);
    // Salvar tarefas no armazenamento local
    salvarTarefasNoLocalStorage();
}

// Função para criar um novo item de tarefa
function criaNovoItemDaLista(textoDaTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    let qtdTarefas = listaTarefas.children.length;
    const novoItem = document.createElement('li');
    novoItem.innerText = textoDaTarefa;
    novoItem.id = `tarefa_id_${qtdTarefas++}`;
    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id));
    novoItem.appendChild(criaRadio(novoItem.id));
    novoItem.appendChild(criaBotao(novoItem.id));
    listaTarefas.appendChild(novoItem);
}

// Função para criar uma caixa de seleção para uma tarefa
function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input');
    inputTarefa.type = 'checkbox';
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    return inputTarefa;
}

// Função para alternar o estado de uma tarefa
function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    const botaoSelecionado = document.getElementById(`bot${idTarefa}`);
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style.textDecoration = 'none';
        botaoSelecionado.style.display = 'none';
    } else {
        tarefaSelecionada.style.textDecoration = 'line-through';
        botaoSelecionado.style.display = 'inline-block';
    }
    // Salvar tarefas no armazenamento local após a alteração de estado
    salvarTarefasNoLocalStorage();
}

// Função para criar um botão para ocultar uma tarefa
function criaBotao(idTarefa) {
    const botaoesconde = document.createElement('input');
    botaoesconde.setAttribute('type', 'button');
    botaoesconde.setAttribute('value', 'ocultar');
    botaoesconde.id = `bot${idTarefa}`;
    botaoesconde.style.display = 'none';
    botaoesconde.setAttribute('onclick', `ocultaTarefa('${idTarefa}')`);
    return botaoesconde;
}

// Função para ocultar uma tarefa
function ocultaTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    tarefaSelecionada.style.display = 'none';
    // Salvar tarefas no armazenamento local após ocultar
    salvarTarefasNoLocalStorage();
}

// Função para criar um botão de rádio para editar uma tarefa
function criaRadio(idTarefa) {
    const radioAltera = document.createElement('input');
    radioAltera.setAttribute('type', 'radio');
    radioAltera.setAttribute('name', 'radio.altera');
    radioAltera.id = `rad${idTarefa}`;
    radioAltera.setAttribute('onclick', `editaTarefa('${idTarefa}')`);
    return radioAltera;
}

// Função para editar uma tarefa
function editaTarefa(idTarefa) {
    const antigaTarefa = document.getElementById(idTarefa);
    if (antigaTarefa) {
        const novoTexto = prompt('Editar tarefa:', antigaTarefa.innerText);
        if (novoTexto !== null) {
            antigaTarefa.innerText = novoTexto;
            const radioTarefa = antigaTarefa.querySelector('input[type="radio"]');
            const checkboxTarefa = antigaTarefa.querySelector('input[type="checkbox"]');
            const botaoTarefa = antigaTarefa.querySelector('input[type="button"]');
            if (radioTarefa) radioTarefa.remove();
            if (checkboxTarefa) checkboxTarefa.remove();
            if (botaoTarefa) botaoTarefa.remove();
            antigaTarefa.appendChild(criaInputCheckBoxTarefa(idTarefa));
            antigaTarefa.appendChild(criaRadio(idTarefa));
            antigaTarefa.appendChild(criaBotao(idTarefa));
            // Salvar tarefas no armazenamento local após editar
            salvarTarefasNoLocalStorage();
        }
    }
}

// Função para salvar tarefas no armazenamento local
function salvarTarefasNoLocalStorage() {
    const listaTarefas = document.getElementById('lista_de_tarefas').innerHTML;
    localStorage.setItem('tarefas', listaTarefas);
}

// Função para carregar tarefas do armazenamento local
function carregarTarefasDoLocalStorage() {
    const listaTarefas = localStorage.getItem('tarefas');
    if (listaTarefas) document.getElementById('lista_de_tarefas').innerHTML = listaTarefas;
}

// Carregar tarefas do armazenamento local quando a página é carregada
window.onload = carregarTarefasDoLocalStorage;
