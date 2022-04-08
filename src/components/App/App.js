import './App.css';
import React,{Component} from "react";
import Authors from "../Authors/authors";
import LibraryService from "../../repository/libraryRepository";
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import Categories from '../Categories/categories';
import Books from '../Books/BookList/books';
import Header from '../Header/header';
import BookAdd from '../Books/BookAdd/bookAdd'
import BookEdit from '../Books/BookEdit/bookEdit'

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
      authors: [],
      books: [],
      categories: [],
      selectedBook: {}
    }
  }
  render() {
    return (
        <Router>
          <Header/>
          <main>
            <div className="container">
              <Routes>
                <Route path="/authors" element={<Authors authors={this.state.authors}/>} />
                <Route path="/categories" element={<Categories categories={this.state.categories}/>} />

                <Route path="/books" element={<Books books={this.state.books} onDelete={this.deleteBook}
                                                           onEdit={this.getBook} onMark={this.markBook}/>} />
                <Route path="/books/add" element={<BookAdd categories={this.state.categories} authors={this.state.authors}
                                                                 onAddBook={this.addBook} />} />
                <Route path="/books/edit/:id" element={<BookEdit categories={this.state.categories} authors={this.state.authors}
                                                                       onEditBook={this.editBook}
                                                                       book={this.state.selectedBook }/>} />

              </Routes>
              <Link to={"/books"}/>
            </div>
          </main>
        </Router>


    );
  }

  loadAuthors = () =>{
    LibraryService.fetchAuthors()
        .then((data) => {
          this.setState({
            authors: data.data
          })
        })
  }

  loadBooks = () =>{
    LibraryService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        })
  }
  loadCategories = () =>{
   LibraryService.fetchCategories()
        .then((data) => {
          this.setState({
            categories: data.data
          })
        })
  }



  deleteBook = (id)=>{
    LibraryService.deleteBook(id)
        .then(()=>{
          this.loadBooks();
        })
  }
  addBook =(name,category,author,availableCopies)=>{
    LibraryService.addBook(name,category,author,availableCopies)
        .then(() =>{
          this.loadBooks();
        })
  }

  getBook = (id) => {
    LibraryService.getBook(id)
        .then((data)=>{
          this.setState({
            selectedBook:data.data
          })
        });
  }

  editBook = (id,name,category,author,availableCopies) => {
   LibraryService.editBook(id,name,category,author,availableCopies)
        .then(() => this.loadBooks());
  }
  markBook = (id) => {
      LibraryService.markBook(id)
          .then(() => this.loadBooks());
  }
  componentDidMount() {
    this.loadAuthors();
    this.loadBooks();
    this.loadCategories();
  }
}

export default App;