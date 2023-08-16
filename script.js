const body = document.querySelector('body');

let submitButton = document.querySelector('.submit-btn')
let bookName = document.querySelector('.name');
let bookAuthor = document.querySelector('.author');
let bookPages = document.querySelector('.pages');
let books = document.querySelector('.books-show');
let readCheck = document.querySelector('.read-checkbox');
let readButton = document.querySelector('.book-read-button');
let deleteButton = document.querySelector('.book-delete-button');
let addBookButton= document.querySelector('.add-book-button');
let addBooks = document.querySelector('.books-add');

let myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function exampleBook() {
    const book = new Book("Book example", "M.K.Edward", 255, false);
    myLibrary.push(book);

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-cardname', book.name);

    const bookName = document.createElement('h2');
    bookName.textContent = book.name;
    bookName.classList.add('book-name');

    const bookPages = document.createElement('h3');
    bookPages.textContent = `${book.pages} pages`;
    bookPages.classList.add('book-pages');
    
    const bookCardBottom = document.createElement('div');
    bookCardBottom.classList.add('book-card-bottom');

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = book.author;

    const readButton = document.createElement('button');
    readButton.classList.add('book-read-button','not-read-button');
    readButton.textContent = "not read";

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('book-delete-button');
    deleteButton.textContent = "x";

    bookCard.appendChild(bookName);
    bookCard.appendChild(bookPages);

    bookCardBottom.appendChild(bookAuthor);
    bookCardBottom.appendChild(readButton);
    bookCardBottom.appendChild(deleteButton);
    bookCard.appendChild(bookCardBottom);

    books.appendChild(bookCard);
    book.displayed = true;
}

document.addEventListener("DOMContentLoaded", function() {
    exampleBook();
});
function addBookToLibrary() {
    let name = bookName.value;
    let author = bookAuthor.value;
    let pages = parseInt(bookPages.value);
    let read = (readCheck.checked)? true:false;

    if(name === "" || author === "" || isNaN(pages)) {
        alert('Please enter all details about the book');
    }else {
        const book = new Book(name,author,pages,read);
        myLibrary.push(book);
        bookName.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        readCheck.checked = false;
        addBookToDisplay();
        addBooks.classList.remove("show");
    }
}
submitButton.addEventListener('click', addBookToLibrary);
function addBookToDisplay() {
    myLibrary.forEach((book) => {
        if(book.displayed === undefined) {
            let name = book.name;
            let author = book.author;
            let pages = book.pages;
            let read = book.read;
            
            const bookCard = document.createElement('div');
            bookCard.setAttribute("data-cardname",name)
            bookCard.classList.add('book-card');
            const bookName = document.createElement('h2');
            bookName.classList.add('book-name');
            const bookPages = document.createElement('h3');
            bookPages.classList.add('book-pages');

            bookName.textContent = name;
            bookPages.textContent = `${pages} pages`;
            bookCard.appendChild(bookName);
            bookCard.appendChild(bookPages);

            const bookCardBottom = document.createElement('div');
            bookCardBottom.classList.add('book-card-bottom');
            
            let bookAuthor = document.createElement('p');
            bookAuthor.classList.add('book-author');
            bookAuthor.textContent = author;
            let bookRead = document.createElement('button');
            bookRead.classList.add('book-read-button');

            if(read===true) {
                bookRead.textContent = "read";
                bookRead.classList.add('read-button')
            }else {
                bookRead.textContent = "not read";
                bookRead.classList.add('not-read-button')
            }

            let bookDelete = document.createElement('button');
            bookDelete.classList.add('book-delete-button');
            bookDelete.textContent = 'x';

            bookCardBottom.appendChild(bookAuthor);
            bookCardBottom.appendChild(bookRead);
            bookCardBottom.appendChild(bookDelete);
            bookCard.appendChild(bookCardBottom);
            books.appendChild(bookCard);

            book.displayed = true;
        }
    })
}

function deleteFromLibrary(bookToDelete) {
    myLibrary = myLibrary.filter((book) => book.name !== bookToDelete);
    const cardToDelete = document.querySelector(`[data-cardname="${bookToDelete}"]`);
    if(cardToDelete) {
        cardToDelete.remove();
    }
}
function updateReadButton(buttonToUpdate,isRead) {
    if (isRead) {
        buttonToUpdate.textContent = "read";
        buttonToUpdate.classList.add("read-button");
        buttonToUpdate.classList.remove("not-read-button");
    } else {
        buttonToUpdate.textContent = "not read";
        buttonToUpdate.classList.add("not-read-button");
        buttonToUpdate.classList.remove("read-button");
    }
}
function updateReadBook(bookToUpdate) {
    const cardToUpdate = document.querySelector(`[data-cardname="${bookToUpdate.name}"]`);
    if (cardToUpdate) {
        bookToUpdate.read = !bookToUpdate.read;
        updateReadButton(cardToUpdate.querySelector('.book-read-button'), bookToUpdate.read);
    }
}
books.addEventListener('click', (event) => {
    const target = event.target;
    let parentElement = target.parentNode;
    let grandParentElement = parentElement.parentNode;

    if(target.classList.contains('book-delete-button')) {
       let cardName = grandParentElement.dataset.cardname;
       deleteFromLibrary(cardName);
    }else if(target.classList.contains('book-read-button')) {
        let cardName = grandParentElement.dataset.cardname;
        const bookToUpdate = myLibrary.find(book => book.name === cardName);
        
        updateReadBook(bookToUpdate);
    }
});

addBookButton.addEventListener('click', ()=> {
    addBooks.classList.toggle("show");
})

addBookButton.addEventListener('transitionend', ()=> {
    if(!addBooks.classList.contains("show")) {
        addBooks.style.maxHeight = "0";
    }
})
