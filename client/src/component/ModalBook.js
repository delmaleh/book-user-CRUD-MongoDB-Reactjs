//this component is used to update and to add book

import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { swalConfirm } from '../services/functions';
import { create_book, update_book } from '../services/request/bookRequest';
import { typeOfBooks } from '../services/constante';

function ModalBook(props) {

    const book = props.book;

    const [state, setState] = useState({
        id: book ? book._id : "",
        author: book ? book.author : "",
        title: book ? book.title : "",
        year_publication: book ? book.year_publication : "",
        price: book ? book.price : "",
        type: book ? book.type : "",
        description: book ? book.description : ""
    });

    const handleChange = (e) => {
        console.log('target',e.target);
        const { id, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const addNewBook = async () => {
        if (state.author === "" || state.title === "" || state.description === "" ||
            state.year_publication === "" || state.price === "" || state.type === "") {
            await swalConfirm('You must to fill all the field !', 'warning', false);
        }
        else {
            const confirmAdd = await swalConfirm('Are you sure you want to add a new book ?',
                'warning', true);
            if (confirmAdd.isConfirmed) {
                await create_book(state);
                await props.fetchBooks();
                props.handleClose();
                setState(prevState => ({
                    ...prevState,
                    id: "",
                    author: "",
                    title: "",
                    year_publication: "",
                    price: "",
                    type: "",
                    description: ""
                }))
            }
            else {
                return false;
            }
        }
    }

    const updateBook = async () => {
        if (state.author === "" || state.title === "" || state.description === "" ||
            state.year_publication === "" || state.price === "" || state.type === "") {
            await swalConfirm('You must to fill all the field !', 'warning', false);
        }
        else {
            const confirmUpdate = await swalConfirm('Are you sure you want to update a book ?',
                'warning', true);
            if (confirmUpdate.isConfirmed) {
                await update_book(state);
                await props.fetchBooks();
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
                <Modal.Title>{book ? "Update Book" : "Add Book"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control value={state.author} type="text"
                            id="author" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={state.title} type="text"
                            id="title" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={state.description} type="text"
                            id="description" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year of Publication</Form.Label>
                        <Form.Control value={state.year_publication} type="number"
                            id="year_publication" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Price</Form.Label>
                        <Form.Control value={state.price} type="number"
                            id="price" onChange={handleChange} />
                    </Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control id="type" as="select" onChange={handleChange}>
                        <option>{(book && book.type) ? book.type : "Open this select menu"}</option>
                        {typeOfBooks.map((type, index) => {

                            if (book && book.type) {
                                if (book.type !== type)
                                    return (
                                        <option key={index} value={type}>{type}</option>
                                    )
                            }
                            else {
                                return (
                                    <option key={index} value={type}>{type}</option>
                                )
                            }
                        })}
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.handleClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={book ? updateBook : addNewBook}>
                    {book ? "Update Book" : "Add Book"}
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ModalBook;