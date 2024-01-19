const theme = document.getElementById('theme');
const inputVal = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
let numitem = document.querySelector('.items-leftt span')
// const array = []
theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];
});

// const inputVal = document.getElementsByClassName('inputVal')[0];

// const addTaskBtn = document.getElementsByClassName('btn')[0];

inputVal.addEventListener('keypress', (e) => {
    if (e.charCode === 13 && inputVal.value.length > 0) {
        let localItems = JSON.parse(localStorage.getItem('localItem'))
        if (localItems === null) {
            taskList = []

        } else {
            taskList = localItems;
        }
        taskList.push(inputVal.value)
        localStorage.setItem('localItem', JSON.stringify(taskList));
        inputVal.value = ''; 
    }
    
    showItem()
})
function showItem() {
    let localItems = JSON.parse(localStorage.getItem('localItem'))
    if (localItems === null) {
        taskList = []

    } else {
        taskList = localItems;
    }
    let html = '';
    // let itemShow = document.querySelector('.todoLists');
    taskList.forEach((data, index) => {
        html += `
                <label class="list-item">
                <input type="checkbox" name="todoItem">
                <span class="checkmark"></span>
                <span class="text">${data}</span>
            </label>
            <button class="deleteTask" onClick="deleteItem(${index})"><span class="remove"></span></button>
            `;
    })
    todoList.innerHTML = html;
    // let num = document.querySelector(".num")
    // num.innerHTML = taskList.length
    numitem.innerHTML = `${taskList.length}`
}
showItem()
function deleteItem(index) {
    let localItems = JSON.parse(localStorage.getItem('localItem'))
    taskList.splice(index, 1)
    localStorage.setItem('localItem', JSON.stringify(taskList));
    showItem()
}