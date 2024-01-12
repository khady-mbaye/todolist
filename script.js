const theme = document.getElementById('theme');
const newItemInput = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
let numitem = document.querySelector('.items-leftt span')
const array = []
theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];
});

document.querySelector('.add-new-item span').addEventListener('click', () => {
    if (newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value);
        newItemInput.value = '';

    }
});

newItemInput.addEventListener('keypress', (e) => {
    if (e.charCode === 13 && newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value);
        array.push(newItemInput.value)
        console.log(array.length)
        numitem.innerHTML = `${array.length}`
        if (array.length === 5) {
            todoList.style.cssText = ' margin:5px;position: relative;height: 350px;overflow-y: auto;';
        }
        newItemInput.value = '';
    }
});

function createNewTodoItem(text) {
    const elem = document.createElement('li');
    elem.classList.add('flex-row');

    elem.innerHTML = `
        <label class="list-item">
        <input type="checkbox" name="todoItem">
        <span class="checkmark"></span>
        <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    `;


    if (document.querySelector('.filter input[type="radio"]:checked').id === 'completed') {
        elem.classList.add('hidden');

    }
    todoList.append(elem);
}
// supprimer une tache

function removeTodoItem(elem) {
    elem.remove();

}

todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
        removeTodoItem(event.target.parentElement);
        array.splice(0, 1)
        console.log("new" + array.length)
        numitem.innerHTML = `${array.length}`
    }
});
// suppression des taches complet

document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
        removeTodoItem(item.closest('li'));
    });
});


// filtre des taches
document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('change', (e) => {
        filterTodoItems(e.target.id);
    });
});

function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll('li');

    switch (id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden');
            })
            break;
        case 'active':
            allItems.forEach(item => {
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
            break;
        default:
            allItems.forEach(item => {
                !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');;
            })
            break;
    }
}
//local storage
// function saveData(){
//     localStorage.setItem('data',todoList.innerHTML)
// }
// function showtask(){
//     todoList.innerHTML = localStorage.getItem('data')
// }
// showtask()