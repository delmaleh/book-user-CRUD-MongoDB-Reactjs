import React, { useState,useEffect} from 'react';
import Book from './Book/Book';
import {get_books,book_filter} from '../services/request/bookRequest';
import {Button,Container, Row,Col,Popover,
  OverlayTrigger,Form} from 'react-bootstrap';
import ModalBook from './ModalBook';
import{typeOfBooks} from '../services/constante';
import InfoUser from './InfoUser/InfoUser';

function ManageBooks() {

  const [books,setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const user_id = '629f15c5553af21e2f682c78';
  const [showInfo, setShowInfo] = useState(false);
  
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);
  

  useEffect(() => {
      fetchBooks();
  },[])

  const [filter , setFilter] = useState({
    type :"",
    year_low : 0,
    year_high : 0,
    year_publication :0
  });
  
  const handleChange = (e) => {
    const {id , value} = e.target;
    setFilter(prevFilter => ({
        ...prevFilter,
        [id] : value
    }))
  }

  const fetchBooks = async() => {
    const books = await get_books();
    setBooks(books);
  }

  const popover = (
    <Popover className="mb-3">
      <Popover.Content>
        <Form>
          <Form.Row>
            <Form.Group className="mt-3 ml-3">
            <Form.Label>Year publication Between :</Form.Label>
            </Form.Group>
          </Form.Row>
          <Form.Row >
            <Form.Group as={Col}>
              <Form.Control type="number" onChange={handleChange} id="year_low" />
            </Form.Group>
            <Form.Group as={Col} xs={1}>
              -
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control type="number" onChange={handleChange} id="year_high" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className="mt-3 ml-3">
              <Form.Label>after year publication :</Form.Label>
              <Form.Control type="number" onChange={handleChange} id="year_publication" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
              <Form.Group className="mt-3 ml-3">
                <Form.Label>Type :</Form.Label>
                <Form.Control id="type" as="select" onChange={handleChange}  >
                    <option value=""></option>
                    {typeOfBooks.map((type,index)=>{
                        return(
                            <option key={index} value={type}>{type}</option>
                        )   
                    })}
                </Form.Control>
              </Form.Group>
          </Form.Row>
          <Form.Row className="d-flex justify-content-center">
              <Form.Group>
                <Button variant="info"  onClick={async () =>{
                  const books = await book_filter(filter);
                  setBooks(books);
                  setFilter(prevFilter => ({
                    ...prevFilter,
                    year_low : "",
                    year_high : "",
                    year_publication : "",
                    type: ""
                  }))
                  setShowOverlay(false);
                }}>
                  Search
                </Button>
              </Form.Group>
          </Form.Row>
        </Form>
      </Popover.Content>
    </Popover>
  );

  return (
    <Container>
      
      
      <Button variant="success" size="xs" onClick={()=>handleShow()}>
        Add Book
      </Button>{' '}
      <OverlayTrigger show={showOverlay} overlay={popover} placement="right">
           <Button variant="success"  onClick={() => setShowOverlay(true)}>
              Filter Book
            </Button>
      </OverlayTrigger>
     
      <hr />
      <Row>
        {books.map((book,index)=>{
          return(
            <Col  key={index} xs={4}>
              <Book book={book} show={show} setBooks={setBooks} fetchBooks={fetchBooks} ></Book>
            </Col>
          )
        })}
      </Row>
      <InfoUser id={user_id} show={showInfo} handleClose={handleCloseInfo}></InfoUser>
      <ModalBook show={show} handleClose={handleClose} fetchBooks={fetchBooks} ></ModalBook>
    </Container>
  );
}
 
export default ManageBooks;