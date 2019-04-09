class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    static displayBooks(){
        const StoredBooks = [
            {
                title: "Book 1",
                author: "Author 1",
                isbn: "123"
            },
            {
                title: "Book 2",
                author: "Author 2",
                isbn: "345"
            }
        ];
        const books = StoredBooks;

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
        setTimeout(() => document.querySelector(".alert").remove(), 1500);
    }

    static clearInput(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
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

    // Clear input after submit
    UI.clearInput();

    }
});

    // Delete button
    document.querySelector("#book-list").addEventListener("click", (e) => {
        UI.deleteBook(e.target)
    });