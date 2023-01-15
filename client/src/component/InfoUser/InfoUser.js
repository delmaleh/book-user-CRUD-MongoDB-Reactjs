import React, { useState, useEffect } from 'react';
import { Row, Modal, Container } from 'react-bootstrap';
import { BsInfoCircleFill } from "react-icons/bs";
import { get_user } from "../../services/request/userRequest"
import './InfoUser.css';


function InfoUser(props) {
    //const user = props.user;
    const [user, setUser] = useState({});
    const { show, id } = props;
    
    useEffect(() => {
        if (show) {
            fetchUser();
        }
    }, [show])

    const fetchUser = async () =>{
        const user = await get_user(props.id);
        setUser(user);
    }

    return (
        <Modal show={props.show} onHide={() => props.handleClose()} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Info User id : {user._id}</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <div className="text-center mb-2">
                    <BsInfoCircleFill color="lightseagreen" size={50}></BsInfoCircleFill>
                </div>
                <Container>
                    <Row className="field">
                        Name : {user.name}
                    </Row>
                    <Row className="field">
                        LastName : {user.lastname}
                    </Row>
                    <Row className="field">
                        Age : {user.age}
                    </Row>
                    <Row className="field">
                        Type : {user.email}
                    </Row>
                     <Row className="field">
                        Books : {user.books && user.books.map((book, index) => (
                            <div key={index}>{book.title}{(index==user.books.length-1)?'':','}</div>
                            
                        ))}
                    </Row>
                      
                    
                    </Container>


            </Modal.Body>
        </Modal>
    );

}

export default InfoUser;