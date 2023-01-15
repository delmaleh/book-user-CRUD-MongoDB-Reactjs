import React, { useState,useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { swalConfirm } from '../services/functions';
import { create_user, update_user } from '../services/request/userRequest';
import { get_books} from '../services/request/bookRequest';

function ModalUser(props) {

    const user = props.user;
    
    
    const [allBooks,setallBooks] = useState([]);
    const [books,setBooks] = useState([]);
    useEffect(() => {    
        fetchBooks();
        setBooks(user ? user.books : []);
    },[])
  
    const fetchBooks = async() => {
        const allBooks = await get_books();
        setallBooks(allBooks);
      } 
    

    const [state, setState] = useState({
        id: user ? user._id : "",
        name: user ? user.name : "",
        lastname: user ? user.lastname : "",
        age: user ? user.age : "",
        email: user ? user.email : "",
        books: user ? user.books : props.books
        
    });

    const handleChange = (e) => {
        //console.log('target',e.target);
        const { id, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleChangeMultiple = (e) => {
        console.log('target',e.target);
        
        var id=e.target.id;
        var options = e.target.options;
        const valueBook = [];
        const value=[];
        
        for (let i = 0; i < options.length; i++) {
            
            if (options[i].selected) {
                const book=allBooks.filter(book => book._id==options[i].value);
                for (let index = 0; index < book.length; index++) {
                    const element = book[index];
                    valueBook.push(element);
                    value.push(options[i].value);
                }
                
            }
        }
        
        console.log(value.length);
        setBooks(valueBook);
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
        
    


    const addNewUser = async () => {
        if (state.name === "" || state.lastname === "" || state.age === "" ||
            state.email === "" ) {
            await swalConfirm('You must to fill all the field !', 'warning', false);
        }
        else {
            const confirmAdd = await swalConfirm('Are you sure you want to add a new user ?',
                'warning', true);
            if (confirmAdd.isConfirmed) {
                await create_user(state);
                await props.fetchUsers();
                props.handleClose();
                setState(prevState => ({
                    ...prevState,
                    id: "",
                    name: "",
                    lastname: "",
                    age: "",
                    email: "",
                    books: []
                }))
            }
            else {
                return false;
            }
        }
    }

    const updateUser = async () => {
        if (state.name === "" || state.lastname === "" || state.age === "" ||
            state.email === "" ) {
            await swalConfirm('You must to fill all the field !', 'warning', false);
        }
        else {
            const confirmUpdate = await swalConfirm('Are you sure you want to update a user ?',
                'warning', true);
            if (confirmUpdate.isConfirmed) {
                await update_user(state);
                await props.fetchUsers();
                props.handleClose();
            }
            else {
                return false;
            }
        }
    }


    return (
        <Modal show={props.show} onHide={() => props.handleClose()} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{user ? "Update User" : "Add User"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={state.name} type="text"
                            id="name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>LastName</Form.Label>
                        <Form.Control value={state.lastname} type="text"
                            id="lastname" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Age</Form.Label>
                        <Form.Control value={state.age} type="number"
                            id="age" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={state.email} type="text"
                            id="email" onChange={handleChange} />
                    </Form.Group>
                    <Form.Label>AllBooks</Form.Label>
                    <Form.Control id="books" as="select" multiple onChange={handleChangeMultiple}>
                        
                        {allBooks && allBooks.map((book, index) => 
                                (
                                    <option key={index} value={book._id}>{book.title}</option>
                                )
                            
                        )}
                    </Form.Control>
                    
                    <Form.Label>Books</Form.Label>
                    <Form.Control  as="select" multiple >
                        
                        {books && books.map((book, index) => 
                                (
                                    <option key={index} value={book._id}>{book.title}</option>
                                )
                            
                        )}
                    </Form.Control>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={user ? updateUser : addNewUser}>
                    {user ? "Update User" : "Add User"}
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ModalUser;