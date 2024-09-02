import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/userpage.css";
import { Common } from "../Common";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'


function Adminpage() {
  const { movies, handleClose, show, users, handleEdit, handleDelete, handleUserDelete,avgrate } = useContext(Common);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("token")){
        navigate('/', {replace:true})
        }
},[])
  
  return (
    <>
      <div className="container">
        <div className="row">
          {movies.map((val, index) => (
            <div className="col-lg-12" key={val._id}>
              <Card className="movie-card">
                <Card.Header as="h5" className="card-header">
                  Movie {index+1}
                </Card.Header>
                <Card.Body className="card-body">
                  <div className="box-img">
                    <img
                      src={val.movieimg}
                      alt="box-img"
                      className="c-img"
                    ></img>
                  </div>
                  <div className="card-data">
                    <div className="data">
                      <Card.Title>Movie Name: <span className="m-title">{val.moviename}</span></Card.Title>
                      <Card.Text className="date">
                        {" "}
                        Release Date: {val.releasedate}
                      </Card.Text>
                    </div>
                    <Card.Text> Genre: {val.genre}</Card.Text>
                    <Card.Text> Director: {val.director}</Card.Text>
                    <Card.Text> Duration: {val.duration} hrs</Card.Text>
                    <Card.Text className="card-text">
                      {" "}
                      Discription: {val.description}
                    </Card.Text>
                    <Card.Text className="card-text">
                      {" "}
                      Rating: {avgrate(val.rating)}<FontAwesomeIcon icon={faStar} id="font"/>
                    </Card.Text>
                    <div className="card-btns2">
                      <Button variant="warning" onClick={()=>handleEdit(val._id)}>Edit</Button>
                      <Button variant="danger" onClick={()=>handleDelete(val._id)}>Delete</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>User Details</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {users.map((item,ind)=>(
                <Accordion key={item._id} id="accord">
                <Accordion.Item eventKey={ind} id="accordion">
                  <Accordion.Header >Name: {item.username}</Accordion.Header>
                  <Accordion.Body>
                    <h6>Email: {item.email}</h6>
                    <h6>Phone: {item.phone}</h6>
                    <Button variant="danger" id="accord-btns" onClick={()=>handleUserDelete(item._id)}>Delete</Button>
                  </Accordion.Body>
                </Accordion.Item>
                </Accordion>
              ))}
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  );
}

export default Adminpage;
