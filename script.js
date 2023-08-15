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

function addBookToLibrary() {
    let name = bookName.value;
    let author = bookAuthor.value;
    let pages = parseInt(bookPages.value);
    let read = (readCheck.checked)? "read":"not read";

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
            bookPages.textContent = pages;
            bookCard.appendChild(bookName);
            bookCard.appendChild(bookPages);

            const bookCardBottom = document.createElement('div');
            bookCardBottom.classList.add('book-card-bottom');
            
            let bookAuthor = document.createElement('p');
            bookAuthor.classList.add('book-author');
            bookAuthor.textContent = author;
            let bookRead = document.createElement('button');
            bookRead.classList.add('book-read-button');
            bookRead.textContent = read;

            if(read==="read") {
                bookRead.style.border = "2px solid #58E07E";
                bookRead.style.backgroundColor = "#58e07e83";
            }else {
                bookRead.style.border = "2px solid #991D1D";
                bookRead.style.backgroundColor = "#991d1da4";
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

books.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('book-read-button')) {
        if(target.textContent === "read") {
            target.textContent = "not read";
            target.style.border = "2px solid #991D1D";
            target.style.backgroundColor = "#991d1da4";
        }else {
            target.textContent = "read";
            target.style.border = "2px solid #58E07E";
            target.style.backgroundColor = "#58e07e83";
        }
    }
});

function deleteFromLibrary(bookToDelete) {
    myLibrary = myLibrary.filter((book) => book.name !== bookToDelete);
    const cardToDelete = document.querySelector(`[data-cardname="${bookToDelete}"]`);
    if(cardToDelete) {
        cardToDelete.remove();
    }
}

let bookCard= document.querySelector('.book-card');

bookCard.addEventListener('click', ()=> {
    deleteFromLibrary(cardName);
}) 

books.addEventListener('click', (event) => {
    const target = event.target;
    let parentElement = target.parentNode;
    let grandParentElement = parentElement.parentNode;

    if (target.classList.contains('book-delete-button')) {
       let cardName = grandParentElement.dataset.cardname;
       deleteFromLibrary(cardName);
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
