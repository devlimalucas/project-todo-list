const pegaBotao = document.querySelector('#criar-tarefa');
const pegaInput = document.querySelector('#texto-tarefa');
const pegaLista = document.querySelector('#lista-tarefas');
const pegaBotaoApagaTudo = document.querySelector('#apaga-tudo');
const pegaBotaoApagaFinalizados = document.querySelector('#remover-finalizados');
const saveListButton = document.getElementById('salvar-tarefas');
const moveUpButton = document.getElementById('mover-cima');
const moveDownButton = document.getElementById('mover-baixo');
const deleteItemButton = document.getElementById('remover-selecionado');

function mudaBackgroundLi(event) {
  const item = event.target;
  const selecionaLi = document.querySelectorAll('li');
  for (let index = 0; index < selecionaLi.length; index += 1) {
    selecionaLi[index].classList.remove('selected');
    selecionaLi[index].style.backgroundColor = 'white';
  }
  item.classList.add('selected');
  item.style.backgroundColor = 'rgb(128, 128, 128)';
}

function riscaELimpa(event) {
  const item = event.target;
  const className = 'completed';
  if (item.classList.contains(className)) {
    event.target.classList.remove('completed');
  } else {
    item.classList.add(className);
  }
}

const saveList = () => {
  const list = document.querySelectorAll('li');
  const arrayToSave = [];
  const markedItens = [];
  if (list.length > 0) {
    for (let index = 0; index < list.length; index += 1) {
      if (list[index].classList.contains('completed')) {
        markedItens.push(index);
      }
      const itemToSave = list[index].innerText;
      arrayToSave.push(itemToSave);
    }
    const listToSave = JSON.stringify(arrayToSave);
    const markedToSave = JSON.stringify(markedItens);
    localStorage.setItem('myList', listToSave);
    localStorage.setItem('marked', markedToSave);
  }
};

const takeAndDisplayList = () => {
  const listToDisplay = JSON.parse(localStorage.getItem('myList'));
  const markedItens = JSON.parse(localStorage.getItem('marked'));
  if (listToDisplay !== null) {
    for (let index = 0; index < listToDisplay.length; index += 1) {
      const list = document.getElementById('lista-tarefas');
      const li = document.createElement('li');
      li.innerText = listToDisplay[index];
      if (markedItens.includes(index)) {
        li.classList.add('completed');
      }
      li.addEventListener('click', mudaBackgroundLi);
      li.addEventListener('dblclick', riscaELimpa);
      list.appendChild(li);
    }
  }
};

function adicionaTarefa(event) {
  event.preventDefault();
  if (pegaInput.value === '') return window.alert('Para criar uma tarefa deve-se preencher o campo.');
  const li = document.createElement('li');
  li.innerText = pegaInput.value;
  pegaLista.appendChild(li);
  pegaInput.value = '';
  li.addEventListener('click', mudaBackgroundLi);
  li.addEventListener('dblclick', riscaELimpa);
}

function apagaTudo(event) {
  event.preventDefault();
  const selecionaLi3 = document.querySelectorAll('li');
  for (let index = 0; index < selecionaLi3.length; index += 1) {
    selecionaLi3[index].remove();
  }
}

function apagaFinalizados(event) {
  event.preventDefault();
  const selecionaFinalizados = document.querySelectorAll('.completed');
  for (let index = 0; index < selecionaFinalizados.length; index += 1) {
    selecionaFinalizados[index].remove();
  }
}

const moveUp = () => {
  const selectedItem = Array.from(document.querySelectorAll('.selected'));
  const takeListItens = Array.from(document.querySelectorAll('li'));
  const indexOfItem = takeListItens.indexOf(selectedItem[0]);
  if (indexOfItem > 0 && selectedItem.length) {
    const previusItem = takeListItens[indexOfItem - 1];
    takeListItens[indexOfItem - 1] = selectedItem[0];
    takeListItens[indexOfItem] = previusItem;
    for (let index = 0; index < takeListItens.length; index += 1) {
      pegaLista.appendChild(takeListItens[index]);
    }
  }
};

const moveDown = () => {
  const selectedItem = Array.from(document.querySelectorAll('.selected'));
  const takeListItens = Array.from(document.querySelectorAll('li'));
  const indexOfItem = takeListItens.indexOf(selectedItem[0]);
  if (selectedItem.length > 0 && takeListItens.length - indexOfItem > 1) {
    const nextItem = takeListItens[indexOfItem + 1];
    takeListItens[indexOfItem + 1] = selectedItem[0];
    takeListItens[indexOfItem] = nextItem;
    for (let index = 0; index < takeListItens.length; index += 1) {
      pegaLista.appendChild(takeListItens[index]);
    }
  }
};

const deleteItem = () => {
  const selectedItem = Array.from(document.querySelectorAll('.selected'));
  const takeListItens = Array.from(document.querySelectorAll('li'));
  if (selectedItem.length > 0) {
    const filteredItens = takeListItens.filter((item) => item !== selectedItem[0]);
    pegaLista.innerText = '';
    for (let index = 0; index < filteredItens.length; index += 1) {
      pegaLista.appendChild(filteredItens[index]);
    }
  }
};

pegaBotaoApagaFinalizados.addEventListener('click', apagaFinalizados);
pegaBotao.addEventListener('click', adicionaTarefa);
pegaBotaoApagaTudo.addEventListener('click', apagaTudo);
saveListButton.addEventListener('click', saveList);
moveUpButton.addEventListener('click', moveUp);
moveDownButton.addEventListener('click', moveDown);
deleteItemButton.addEventListener('click', deleteItem);

window.onload = () => {
  takeAndDisplayList();
};
