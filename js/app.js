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
    }
}