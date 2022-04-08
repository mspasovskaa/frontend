import React from 'react';
import {Link} from 'react-router-dom'
const bookTerm = (props) => {
    return(
        <tr>
            <td scope={"col"}>
                {props.term.name}
            </td>
            <td scope={"col"}>
                {props.term.category.categoryName}
            </td>
            <td scope={"col"}>
                {props.term.author.name}
            </td>
            <td scope={"col"}>
                {props.term.author.surname}
            </td>
            <td scope={"col"}>
                {props.term.author.country.name}
            </td>
            <td scope={"col"}>
                {props.term.availableCopies}
            </td>
            <td scope={"col"} className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={()=> {
                       props.onDelete(props.term.id)
                   }}>Delete</a>
                <Link className={"btn btn-info ml-2"}
                      onClick={()=> {
                          props.onEdit(props.term.id)}}
                      to={`/books/edit/${props.term.id}`}>Edit</Link>
                <a title={"Delete"} className={"btn btn-success"}
                   onClick={()=> {
                       props.onMark(props.term.id)
                   }}>Mark as taken</a>
            </td>
        </tr>

    );
}

export default bookTerm;