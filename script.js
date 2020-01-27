let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.readString()
    }

    this.readString = function() {
        if (this.read) {
            return "read"
        } else {
            return "not yet read"
        }
    }
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary() {
    let title = document.querySelector("input[name='title']");
    let author = document.querySelector("input[name='author']");
    let pages = document.querySelector("input[name='pages']");
    let read = document.querySelector("input[name='read']");

    myLibrary.push(new Book(title.value, author.value, pages.value, read.checked));

    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;

    hideForm();
    saveTable();
    renderTable();
}

function renderTable() {
    let table = document.querySelector("table");
    let new_tbody = document.createElement('tbody');
    let index = 0;
    myLibrary.forEach(book => {
        let row = new_tbody.insertRow();
        let title = row.insertCell();
        title.innerHTML = book.title;
        let author = row.insertCell();
        author.innerHTML = book.author;
        let pages = row.insertCell();
        pages.innerHTML = book.pages;
        let read = row.insertCell();
        read.innerHTML = book.readString();
        let remove = row.insertCell();
        remove.appendChild(deleteButton(index));
        let toggle = row.insertCell();
        toggle.appendChild(readButton(index));
        index++;
    });
    
    table.replaceChild(new_tbody, table.getElementsByTagName('tbody')[0]);
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    saveTable();
    renderTable();
}

function toggleBook(index) {
    myLibrary[index].toggleRead();
    saveTable();
    renderTable();
}

function readButton(index) {
    let button = document.createElement("button");
    button.innerHTML = "Toggle";
    button.setAttribute('onclick', `toggleBook(${index})`);
    return button;
}

function deleteButton(index) {
    let button = document.createElement("button");
    button.innerHTML = "Delete";
    button.setAttribute('onclick', `deleteBook(${index})`);
    return button;
}

function render() {
    let body = document.querySelector("body");
    myLibrary.forEach(book => {
        let elem = document.createElement('p');
        elem.textContent = book.info();
        body.appendChild(elem);
    });
}

function showForm() {
    document.querySelector("#new-book-form").classList.remove("hidden");
}

function hideForm() {
    document.querySelector("#new-book-form").classList.add("hidden");
}

function saveTable() {
    localStorage.libraryTable = JSON.stringify(myLibrary);
}

function loadTable() {
    let table = localStorage.getItem('libraryTable');
    if (table != null) {
        myLibrary = loadLibrary(JSON.parse(table));
        renderTable();
    }
}

function loadLibrary(jsonLibrary) {
    let books = [];

    for (let index = 0; index < jsonLibrary.length; index++) {
        const book = jsonLibrary[index];
        books.push(new Book(book.title, book.author, book.pages, book.read));
    }
    return books;
}

window.onload = function() {
    this.loadTable();
}