import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { swalConfirm } from '../../services/functions';
import { delete_user, get_users } from '../../services/request/userRequest';
import ModalUser from './../ModalUser';
import InfoUser from './../InfoUser/InfoUser';
import './User.css';


function User(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);
  const user = props.user;


  const deleteUser = async () => {
    const result = await swalConfirm('Are you sure you want to delete a user ?',
      'warning', true);
    if (result.isConfirmed) {
      await delete_user(user._id);
      await props.fetchUsers();
    }
    else {
      return false;
    }
  }

  return (
    <div className="mb-4">
      <Card className="card">
        <Card.Body>
          <Card.Title>User</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{user.name}</Card.Subtitle>
          <Card.Text>
            
            <br></br>
            <span className="bold"> {user.lastname} </span>
            <br></br>
            <span className="bold"> {user.age} </span>
            <br></br>
            <span className="bold"> {user.email} </span>
          </Card.Text>
          <Row>
            <Col xs={3}>
              <Button variant="info" onClick={() => handleShowInfo()}>Info</Button>
            </Col>
            <Col xs={4}>
              <Button variant="warning" onClick={() => handleShow()}>Update</Button>
            </Col>
            <Col xs={4}>
              <Button variant="danger" onClick={deleteUser}>Delete</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ModalUser user={props.user} show={show} handleClose={handleClose} fetchUsers={props.fetchUsers} ></ModalUser>
      <InfoUser id={user._id} user={props.user} show={showInfo} handleClose={handleCloseInfo}></InfoUser>
   
       </div>
  );

}

export default User;