let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let ul = document.querySelector('.list-group');
let form = document.forms['addTodoItem'];
let inputText = document.querySelector('.form-control');
let clearBtn = document.querySelector('.todo-clear');
let sortBtn = document.querySelector('.todo-sort');


function generateNewList(task) {
    //list item
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center todo-list';

    let span = document.createElement('span');
    span.textContent = task;

    let iDelete = document.createElement('i');
    iDelete.className = 'far fa-trash-alt delete-item ml-auto';

    li.appendChild(span);
    li.appendChild(iDelete);

    return li;
};

function loadSavedList(taskArray) {
    for (let i = 0; i < taskArray.length; i++) {
        let li = generateNewList(taskArray[i]);
        ul.appendChild(li);
    }
};


function addList(list) {
    tasks.unshift(list);
    ul.insertAdjacentElement('afterbegin', generateNewList(list));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeList(target) {
    let parent = target.closest('li');
    let text = parent.textContent;
    let index = tasks.indexOf(text);
    tasks.splice(index, 1);
    parent.remove();

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearList() {
    ul.innerHTML = '';
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function sortList(list) {
    const copy = list.slice();
    
    if ( list.length > 0 ) {
        copy.sort();
        if ( list[0] === copy[0] ) { console.log('Список вже сортований'); return};
        clearList();
        tasks = copy;
        localStorage.setItem('tasks', JSON.stringify(copy));
        loadSavedList( tasks );
    } else {
        console.log('Ну ну ну, шо ти сортувати зібрався? Пустий масив');
    }; 
}

ul.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-item')) {
        removeList(e.target);
    };
   
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputText.classList.remove('is-invalid');
    inputText.classList.remove('is-valid');

    if ( !inputText.value ) {
        inputText.classList.add('is-invalid');
    } else {
        inputText.classList.add('is-valid');
        addList(inputText.value);
        form.reset();
    }
});

inputText.addEventListener('keyup', (e) => {
    if ( e.key === 'Enter' ) { return }; //Фікс дрібного бага коли починає писати "Ви нічого не ввели!" після добавлення нового завдання коли нажимаєш "Enter" , воно реагує лишній раз на цю кнопку!
    if ( inputText.value) {
        inputText.classList.remove('is-invalid');
        inputText.classList.remove('is-valid');
    } else {
        inputText.classList.add('is-invalid');
    }
});

clearBtn.addEventListener('click', (el) => {
    clearList();
})

sortBtn.addEventListener('click', (el) => {
    sortList(tasks);
})


loadSavedList( tasks );







