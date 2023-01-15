import React, { useState,useEffect} from 'react';
import User from './User/User';
import {get_users} from '../services/request/userRequest';
import {get_books} from '../services/request/bookRequest';

import {Button,Container, Row,Col} from 'react-bootstrap';
import ModalUser from './ModalUser';


function ManageUsers() {

  const [users,setUsers] = useState([]);
  const [books,setBooks] = useState([]);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showInfo, setShowInfo] = useState(false);
  
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);
  
  useEffect(() => {
      fetchUsers();
      fetchBooks();
  },[])

  const fetchUsers = async() => {
    const users = await get_users();
    setUsers(users);
  }

  const fetchBooks = async() => {
    const books = await get_book();
    setBooks(books);
  } 

  return (
    <Container>
      
      <Button variant="success" size="xs" onClick={()=>handleShow()}>
        Add User
      </Button>
      
      <hr />
      <Row>
        {users.map((user,index)=>
          (
            <Col  key={index} xs={4}>
              <User user={user} show={show} setUsers={setUsers} fetchUsers={fetchUsers} ></User>
            </Col>
          )
        )}
      </Row>
      
      <ModalUser books={books} show={show} handleClose={handleClose} fetchUsers={fetchUsers} ></ModalUser>
    
    </Container>
  );
}
 
export default ManageUsers;