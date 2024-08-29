// models/Book.js

export default class Book {
    constructor({ title, author, publisher, publicationDate, price, genre, description }) {
      this.title = title;
      this.author = author;
      this.publisher = publisher;
      this.publicationDate = publicationDate;
      this.price = price;
      this.genre = genre;
      this.description = description;
    }
  }
  