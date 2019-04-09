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

    static addBook() {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");
        
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        
        list.appendChild(row);
    }
}

// Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add Books
document.querySelector("#book-form").addEventListener("submit", (e) => {

    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //Instatiate book
    const book = new Book(title, author, isbn);

    console.log(book)
});