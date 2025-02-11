let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentDeleteIndex = null;
let currentEditIndex = null;

function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (text === '') return;

    const time = new Date().toLocaleTimeString('fa-IR');
    todos.push({ text, time });
    saveToLocalStorage();
    renderTodos();
    input.value = '';
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item';

        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <span class="todo-time">${todo.time}</span>
            <div class="btn-group">
                <button class="btn btn-warning btn-sm" onclick="openEditPopup(${index})">ویرایش</button>
                <button class="btn btn-danger btn-sm" onclick="openDeletePopup(${index})">حذف</button>
            </div>
        `;

        todoList.appendChild(li);
    });
}

function openDeletePopup(index) {
    currentDeleteIndex = index;
    document.getElementById('delete-popup').style.display = 'flex';
}

function closeDeletePopup() {
    document.getElementById('delete-popup').style.display = 'none';
}

function confirmDelete() {
    if (currentDeleteIndex !== null) {
        todos.splice(currentDeleteIndex, 1);
        saveToLocalStorage();
        renderTodos();
        closeDeletePopup();
    }
}

function openEditPopup(index) {
    currentEditIndex = index;
    document.getElementById('edit-input').value = todos[index].text;
    document.getElementById('edit-popup').style.display = 'flex';
}

function closeEditPopup() {
    document.getElementById('edit-popup').style.display = 'none';
}

function confirmEdit() {
    if (currentEditIndex !== null) {
        const newText = document.getElementById('edit-input').value.trim();
        if (newText !== '') {
            todos[currentEditIndex].text = newText;
            saveToLocalStorage();
            renderTodos();
            closeEditPopup();
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function downloadExcel() {
    const data = todos.map((todo, index) => ({
        شماره: index + 1,
        متن: todo.text,
        زمان: todo.time,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'To-Do List');
    XLSX.writeFile(workbook, 'To-Do-List.xlsx');
}

// رندر اولیه
renderTodos();

