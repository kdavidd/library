const body = document.querySelector('body');

let submitButton = document.querySelector('.submit-btn')
let bookName = document.querySelector('.name');
let bookAuthor = document.querySelector('.author');
let bookPages = document.querySelector('.pages');
let books = document.querySelector('.books-show');


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

    if(name === "" || author === "" || isNaN(pages)) {
        alert('Please enter all details about the book');
    } else {
        const book = new Book(name,author,pages);
        myLibrary.push(book);
        alert('Successfully added to my library!');
        bookName.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        addBookToDisplay();
    }

}
function addBookToDisplay() {
   
    myLibrary.forEach((book) => {
        if(book.displayed === undefined) {
            let name = book.name;
            let author = book.author;
            let pages = book.pages;
            
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            const bookName = document.createElement('h2');
            bookName.classList.add('book-name');
            const bookPages = document.createElement('h3');
            bookName.classList.add('book-pages');

            bookName.textContent = name;
            bookPages.textContent = pages;
            bookCard.appendChild(bookName);
            bookCard.appendChild(bookPages);

            const bookCardBottom = document.createElement('div');
            bookCardBottom.classList.add('book-card-bottom');
            
            let bookAuthor = document.createElement('p');
            bookAuthor.classList.add('book-author');
            bookAuthor.textContent = author;

            bookCardBottom.appendChild(bookAuthor);
            bookCard.appendChild(bookCardBottom);
            books.appendChild(bookCard);

            book.displayed = true;
        }
    })
}

// function addBookToDisplay() {

// }
submitButton.addEventListener('click', addBookToLibrary);
console.log(myLibrary);