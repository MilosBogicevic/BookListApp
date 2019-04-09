class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach((book) => UI.addBook(book));
    }

    static addBook(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(() => document.querySelector(".alert").remove(), 2000);
    }

    static clearInput(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
}

// Local storage: Keep data on reload.
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index,1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}

// Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add Books
document.querySelector("#book-form").addEventListener("submit", (e) => {

    //Submit button prevent default
    e.preventDefault();

    // Get values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    // Validation
    if(title === "" || author === "" || isbn === ""){
        UI.showAlert("All fields are required.", "danger");
    } else {

    // Instatiate book
    const book = new Book(title, author, isbn);

    // Add Book
    UI.addBook(book);

    // Add Book to local storage
    Store.addBook(book);

    // Clear input after submit
    UI.clearInput();

    // Alert: Success
    UI.showAlert("Book is added.", "success");
    }
});

    // Delete a book
    document.querySelector("#book-list").addEventListener("click", (e) => {

        //Delete a book from User Interface
        UI.deleteBook(e.target)

        //Delete from local storage
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


    // Alert: Book removed
    UI.showAlert("Book is deleted.", "primary");
    });