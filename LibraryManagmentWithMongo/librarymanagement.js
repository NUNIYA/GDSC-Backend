
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/libraryDB');

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

const Bookschema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  yearPublished: {type: Number, required: true},
  genres: [String],
  availableCopies: {type: Number, default: 5}
});

const Book = mongoose.model('Book', Bookschema);


  async function addBook(bookData) {
    const book = new Book(bookData);
    return await book.save();
  }

  async function updateAvailableCopies(title, newCopies) {
    return await Book.findOneAndUpdate(
      { title: title },
      { availableCopies: newCopies },
      { new: true }
    );
  }
  
  
  async function findBooksByAuthor(author) {
    return await Book.find({ author: author });
  }
  
  
  async function deleteBookByTitle(title) {
    return await Book.findOneAndDelete({ title: title });
  }
  addBook({ title: "The Selection", author: "Kiera cass", yearPublished: 2012, genres: ["Romance"] })
   .then(book => console.log('Book Added:', book))
 .catch(err => console.error('Error occured', err));