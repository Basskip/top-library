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
        index++;
    });
    
    table.replaceChild(new_tbody, table.getElementsByTagName('tbody')[0]);
}


function render() {
    let body = document.querySelector("body");
    myLibrary.forEach(book => {
        let elem = document.createElement('p');
        elem.textContent = book.info();
        body.appendChild(elem);
    });
}

