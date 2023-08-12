const body = document.querySelector('body');

let submitButton = document.querySelector('.submit-btn')
let bookName = document.querySelector('.name');
let bookAuthor = document.querySelector('.author');
let bookPages = document.querySelector('.pages');

let myLibrary = [];

function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;

}

function addBookToLibrary() {
    let name = bookName.value;
    let author = bookAuthor.value;
    let pages = parseInt(bookPages.value);

    if(name === "" || author === "" || pages === "") {
        alert('Please enter all details about the book');
    } else {
        const book = new Book(name,author,pages);
        myLibrary.push(book);
        alert('Successfully added to my library!');
        bookName.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
    }

}
submitButton.addEventListener('click', addBookToLibrary);
console.log(myLibrary);