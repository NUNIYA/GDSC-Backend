
function TodoItem(text) {
    this.text = text;
    this.completed = false;
}

TodoItem.prototype.toggleCompletion = function() {
    this.completed = !this.completed;
};


function TodoList() {
    this.items = [];
}

TodoList.prototype.addItem = function(text) {
    const newItem = new TodoItem(text);
    this.items.push(newItem);
};


TodoList.prototype.render = function() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = '';

    this.items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'todo-item';
        itemElement.innerHTML = `
            <input type="checkbox" ${item.completed ? 'checked' : ''}>
            <span class="${item.completed ? 'completed' : ''}">${item.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        const checkbox = itemElement.querySelector('input[type="checkbox"]');
        const span = itemElement.querySelector('span');
        checkbox.addEventListener('change', () => {
            item.toggleCompletion();
            span.classList.toggle('completed', item.completed);
        });

       
        const deleteBtn = itemElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            this.items.splice(index, 1);
            this.render();
        });

        listElement.appendChild(itemElement);
    });
};

const todoList = new TodoList();


document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.querySelector('.input');
    const text = input.value.trim();
    
    if (text) {
        todoList.addItem(text);
        todoList.render();
        input.value = '';
    }
});


todoList.render();