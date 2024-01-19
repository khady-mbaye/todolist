const theme = document.getElementById('theme');
const newItemInput = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
let numitem = document.querySelector('.items-leftt span');
const array = [];

// Load tasks from local storage
window.addEventListener('load', () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const parsedTasks = JSON.parse(savedTasks);
    array.push(...parsedTasks);
    numitem.innerHTML = `${array.length}`;
    parsedTasks.forEach(task => createNewTodoItem(task));
  }
});

theme.addEventListener('click', () => {
  document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];
});

document.querySelector('.add-new-item span').addEventListener('click', () => {
  if (newItemInput.value.length > 0) {
    createNewTodoItem(newItemInput.value);
    array.push(newItemInput.value);
    saveTasks();
    newItemInput.value = '';
  }
});

newItemInput.addEventListener('keypress', (e) => {
  if (e.charCode === 13 && newItemInput.value.length > 0) {
    createNewTodoItem(newItemInput.value);
    array.push(newItemInput.value);
    saveTasks();
    numitem.innerHTML = `${array.length}`;
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

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(array));
}

// Remove a task
function removeTodoItem(elem) {
  elem.remove();
  const index = array.indexOf(elem.querySelector('.text').textContent);
  if (index !== -1) {
    array.splice(index, 1);
    saveTasks();
    numitem.innerHTML = `${array.length}`;
  }
}

todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    removeTodoItem(event.target.parentElement);
  }
});

// Clear completed tasks
document.querySelector('.clear').addEventListener('click', () => {
  document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
    removeTodoItem(item.closest('li'));
  });
});

// Filter tasks
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
      });
      break;
    case 'active':
      allItems.forEach(item => {
        item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
      });
      break;
    default:
      allItems.forEach(item => {
        !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
      });
      break;
  }
}
