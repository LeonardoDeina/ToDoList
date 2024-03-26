function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
}

function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    // guarda o tamanho da lista de tarefas
    let qtdTarefas   = listaTarefas.children.length

    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li')

    // adiciona o texto digitado no texto da tarefa
    novoItem.innerText = textoDaTarefa
    // adiciona um ID no novo elemento
    novoItem.id = `tarefa_id_${qtdTarefas++}`

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    novoItem.appendChild(criaRadio(novoItem.id))

    novoItem.appendChild(criaBotao(novoItem.id))

    listaTarefas.appendChild(novoItem)


}


function criaInputCheckBoxTarefa(idTarefa) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    const botaoSelecionado = document.getElementById(`bot${idTarefa}`)

    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style.textDecoration = 'none'
        botaoSelecionado.style.display = 'none' // Esconde o botão quando a tarefa não estiver concluída
    } else {
        tarefaSelecionada.style.textDecoration = 'line-through'
        botaoSelecionado.style.display = 'inline-block' // Mostra o botão quando a tarefa estiver concluída
    }    
}


function criaBotao(idTarefa){
    const botaoesconde = document.createElement('input')
    botaoesconde.setAttribute('type', 'button')
    botaoesconde.setAttribute('value', 'ocultar')
    botaoesconde.id = `bot${idTarefa}`
    botaoesconde.style.display = 'none'
    botaoesconde.setAttribute('onclick',`ocultaTarefa('${idTarefa}')`)

    return botaoesconde;
}

function ocultaTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    tarefaSelecionada.style.display = 'none'
}

    function criaRadio(idTarefa){
    const radioAltera = document.createElement('input')
    radioAltera.setAttribute('type','radio')
    radioAltera.setAttribute('name','radio.altera')
    radioAltera.id = `rad${idTarefa}`
    radioAltera.setAttribute('onclick',`editaTarefa('${idTarefa}')`)


    return radioAltera
}

function editaTarefa(idTarefa) {
    const antigaTarefa = document.getElementById(idTarefa);
    if (antigaTarefa) {
        const novoTexto = prompt('Editar tarefa:', antigaTarefa.innerText)
        if (novoTexto !== null) {
            antigaTarefa.innerText = novoTexto;
            // Recria os elementos de radio, checkbox e botão
            const radioTarefa = antigaTarefa.querySelector('input[type="radio"]')
            const checkboxTarefa = antigaTarefa.querySelector('input[type="checkbox"]')
            const botaoTarefa = antigaTarefa.querySelector('input[type="button"]')
            if (radioTarefa) {
                radioTarefa.remove();
            }
            if (checkboxTarefa) {
                checkboxTarefa.remove()
            }
            if (botaoTarefa) {
                botaoTarefa.remove()
            }
            antigaTarefa.appendChild(criaInputCheckBoxTarefa(idTarefa))
            antigaTarefa.appendChild(criaRadio(idTarefa))
            antigaTarefa.appendChild(criaBotao(idTarefa))
        }
    }    
}