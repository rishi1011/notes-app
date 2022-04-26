const addBtn = document.getElementById('add');

const notesWithin = JSON.parse(localStorage.getItem('notes'));

if (notesWithin != null)
    notesWithin.forEach(noteValue => {
        addNewNote(noteValue);
    });

addBtn.addEventListener('click',() =>  addNewNote());

function addNewNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    console.log(text === '');

    note.innerHTML = `
        <div class="tools">
            <button class="edit" id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="check hidden" id="check"><i class="fa-solid fa-check"></i></button>
            <button class="delete" id="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
        <div class="main ${text === '' ? 'hidden' : ''} "></div>
        <textarea class="${text === '' ? '' : 'hidden'} "></textarea>
    `;

    document.body.appendChild(note);
    window.scrollTo(0, note.offsetTop);

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const checkBtn = note.querySelector('.check');
    const textarea = note.querySelector('textarea');
    const main = note.querySelector('.main');

    main.innerHTML = marked.parse(text);
    textarea.value = text;

    editBtn.addEventListener('click', () => {
        toggleTextDisplayToTextarea(textarea, main);
        textarea.focus();
        checkBtn.classList.remove('hidden');
    });

    textarea.addEventListener('click', () => checkBtn.classList.remove('hidden'));

    checkBtn.addEventListener('click', () => {
        toggleTextDisplayToMain(textarea, main);
        const value = textarea.value;
        main.innerHTML = marked.parse(value);
        checkBtn.classList.add('hidden');
        updateLS();
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });
}

function toggleTextDisplayToMain(textarea, main) {
    textarea.classList.add('hidden');
    main.classList.remove('hidden');
}

function toggleTextDisplayToTextarea(textarea, main) {
    textarea.classList.remove('hidden');
    main.classList.add('hidden');
}

function updateLS() {
    const notes = document.querySelectorAll('textarea');

    let notesArray = []

    notes.forEach(note => {
        notesArray.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notesArray));
}