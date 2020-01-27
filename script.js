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
