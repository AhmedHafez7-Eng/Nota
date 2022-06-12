const addBox = document.querySelector('.add-box'),
    popupBox = document.querySelector('.popup-box'),
    popupBoxClose = document.querySelector('.popup-box header i'),
    title = document.getElementById('title'),
    description = document.getElementById('desc'),
    addNoteBtn = document.querySelector('.popup-box .content form button'),
    message = document.querySelector('.message'),
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    // ===== Getting local storage notes if exist and parsing them
    // ===== to js object, else passing an empty array to notes
    notes = JSON.parse(localStorage.getItem('notes') || "[]");

document.querySelector('.heading').innerHTML = notes.length > 0 ? `You've <span>${notes.length}</span> notes` : 'No notes added yet';

showNotes = () => {
    // ===== Clearing the notes before adding new ones
    document.querySelectorAll('.note-item').forEach(note => { note.remove(); });

    // ===== Looping through notes array and adding each note to the DOM
    notes.forEach(note => {
        let noteItem = document.createElement('li');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i class="fa-solid fa-ellipsis" onclick="showMenu(this);"></i>
                <ul class="menu">
                    <li>
                        <i class="fa-solid fa-edit"></i>Edit
                    </li>
                    <li>
                        <i class="fa-solid fa-trash"></i>Delete
                    </li>
                </ul>
            </div>
        </div>
        `;
        // document.querySelector('.notes-container').insertAdjacentElement('beforeend', noteItem);
        document.querySelector('.add-box').insertAdjacentElement('afterend', noteItem);
    });
}
showNotes();

showMenu = (el) => {
    el.parentElement.classList.toggle('show');

    // ===== Close Menu on Clicking on another one or outside of the menu
    document.addEventListener('click', (e) => {
        if (!el.parentElement.contains(e.target)) {
            el.parentElement.classList.remove('show');
        }
    });
}

addBox.addEventListener('click', () => {
    popupBox.classList.add('show');
});

popupBoxClose.addEventListener('click', () => {
    popupBox.classList.remove('show');
    document.querySelector('.popup-box .content form').reset(); // Reset form
});

addNoteBtn.addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = title.value,
        noteDesc = description.value;

    if (noteTitle.trim().length > 0 && noteDesc.trim().length > 0) {
        let dateObj = new Date(),
            noteInfo = {
                // date: months[(dateObj.getMonth())] + ' ' + dateObj.getDate() + ',' + dateObj.getFullYear(), //== Print date in format: July 12,2022
                date: `${months[(dateObj.getMonth())]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`, //== Print date in format: July 12,2022
                title: noteTitle,
                description: noteDesc
            };

        notes.push(noteInfo); // Add note to array

        localStorage.setItem('notes', JSON.stringify(notes)); // Save notes to local storage
        document.querySelector('.popup-box .content form').reset(); // Reset form
        // document.forms[0].reset(); // Reset form
        popupBox.classList.remove('show');
        showNotes();
        document.querySelector('.heading').innerHTML = notes.length > 0 ? `You've <span>${notes.length}</span> notes` : 'No notes yet';

    } else {
        message.innerHTML = 'Please fill all fields';
        message.classList.add('show');
    }

});