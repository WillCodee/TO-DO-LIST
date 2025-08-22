
const getBanco = () => JSON.parse(localStorage.getItem('Tarefas')) || []
const setBanco = (banco) => localStorage.setItem('Tarefas', JSON.stringify(banco))
const banco = getBanco()

const criarItem = (tarefa, status='', indice) =>{
    const item  = document.createElement('label')
    item.classList.add('todo_item')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item)

}

const limparTarefas = () =>{
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    banco.forEach( (item, indice) => criarItem(item.tarefa, item.status, indice) )
}

const inserirItem = (event) => {
    const tecla = event.key
    const texto = event.target.value

    if (tecla == 'Enter' && texto == ''){
        alert('Favor Inserir uma Tarefa')
        atualizarTela()
    }else if( tecla == 'Enter'){
        banco.push({'tarefa': texto, 'status': ''})
        setBanco(banco)
        atualizarTela()

        event.target.value = '' /* Limpar Tarefa */
    }
}

const removerItem = (index) => {
    banco.splice(index, 1)
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (index) =>{
    
    banco[index].status = banco[index].status == '' ? 'checked' : '';
    setBanco(banco)
    atualizarTela()
}

const clickItem = (event) =>{
    const element = event.target;
    if(element.type == 'button'){
        // acessa os atributos data (data-set)
        const index = element.dataset.indice
        removerItem(index)
    }else if(element.type == 'checkbox'){
        const index = element.dataset.indice
        atualizarItem(index)
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click',clickItem)

atualizarTela()
