import React from "react";
import {useNavigate} from 'react-router-dom';

const BookEdit = (props) => {
    const  history= useNavigate();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: 1,
        author: 1,
        availableCopies: 0
    })
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }
    const onFormSubmit = (e)=>{
        e.preventDefault();
        const name=formData.name !== "" ? formData.name : props.book.name;
        const category=formData.category !== 1 ? formData.category : props.book.category.id;
        const author=formData.author !== 1 ? formData.author : props.book.author.id;
        const availableCopies=formData.availableCopies !== 0 ? formData.availableCopies : props.book.availableCopies;

        props.onEditBook(props.book.id,name,category,author,availableCopies);
        history("/books")
    }
    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={props.book.name}
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) =>{
                                    if(props.book.category !== undefined && props.book.category.id === term.id)
                                        return <option selected={props.book.category.id} value={term.id}>{term.categoryName}</option>
                                    else
                                        return <option value={term.id}>{term.categoryName}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) =>{
                                    if(props.book.author !== undefined && props.book.author.id === term.id)
                                        return <option selected={props.book.author.id} value={term.id}>{term.name} {term.surname}</option>
                                    else
                                        return <option value={term.id}>{term.name}</option>
                                }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Available Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={props.book.availableCopies}
                               onChange={handleChange}

                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>

    );
}
export default BookEdit;