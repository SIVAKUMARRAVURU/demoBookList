// Book Class : Represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class : Handle UI Tasks
class UI {
    static displayBooks() {
        
        const books = Store.getBooks();
        // Static Data
        /* const storedBooks = [
            {
                title: 'java',
                author: 'modi',
                isbn: '213121'
            },
            {
                title: 'javaScript',
                author: 'kcr',
                isbn: '713121'
            }
        ]; */

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Vanish in 3 sec
        setTimeout(() => document.querySelector('.alert').remove(),
            3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}
// Store Clss : Handle Storage

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}



// Event : Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    // prevent actual submit
    e.preventDefault;

    // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate 

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('please fill in all Fields', 'danger');
    }
    else {

        // Instatiate book
        const book = new Book(author, title, isbn);

        // Add book to UI
        UI.addBookToList(book);

        // Add book to Store
        Store.addBook(book);

        // Show Succes message
        UI.showAlert('Book Added', 'success');

        // Clear Fields
        UI.clearFields();

    }

});

// Event : Remove a Book

document.querySelector('#book-list'), addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        
    
    UI.deleteBook(e.target);

    // Remove Book from store

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Succes remove a Book
        UI.showAlert('Book Remove', 'success');
        
}
});

