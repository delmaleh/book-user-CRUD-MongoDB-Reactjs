import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { swalConfirm } from '../../services/functions';
import { delete_book, get_books } from '../../services/request/bookRequest';
import ModalBook from './../ModalBook';
import InfoBook from './../InfoBook/InfoBook';
import './Book.css';


function Book(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);
  const book = props.book;


  const deleteBook = async () => {
    const result = await swalConfirm('Are you sure you want to delete a book ?',
      'warning', true);
    if (result.isConfirmed) {
      await delete_book(book._id);
      await props.fetchBooks();
    }
    else {
      return false;
    }
  }

  return (
    <div className="mb-4">
      <Card className="card">
        <Card.Body>
          <Card.Title>{book.title} ({book.year_publication})</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
          <Card.Text>
            {book.description}
            <br></br>
            <span className="bold"> {book.type} </span>
            <br></br>
            <span className="bold"> {book.price}$ </span>
          </Card.Text>
          <Row>
            <Col xs={3}>
              <Button variant="info" onClick={() => handleShowInfo()}>Info</Button>
            </Col>
            <Col xs={4}>
              <Button variant="warning" onClick={() => handleShow()}>Update</Button>
            </Col>
            <Col xs={4}>
              <Button variant="danger" onClick={deleteBook}>Delete</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ModalBook book={props.book} show={show} handleClose={handleClose} fetchBooks={props.fetchBooks} ></ModalBook>
      <InfoBook id={props.book._id} show={showInfo} handleClose={handleCloseInfo}></InfoBook>
   
       </div>
  );

}

export default Book;