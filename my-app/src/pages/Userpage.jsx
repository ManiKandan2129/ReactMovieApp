import React, { useContext, useEffect }  from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/userpage.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Common } from '../Common';
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'



function Userpage() {
    const{movies, setmovies, Rating, setRating, handleRate, avgrate} = useContext(Common);
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
                {movies.map((val,index)=>(
                    <div className="col-lg-12" key={index}>
                    <Card className='movie-card'>
                    <Card.Header as="h5" className='card-header'>Movie {index+1}</Card.Header>
                    <Card.Body className='card-body'>
                        <div className="box-img">
                            <img src={val.movieimg} alt='box-img' className='c-img'></img>
                        </div>
                        <div className="card-data">
                        <div className="data">
                        <Card.Title>Movie Name: <span className="m-title">{val.moviename}</span></Card.Title>
                        <Card.Text className='date'> Release Date: {val.releasedate}</Card.Text>
                        </div>
                        <Card.Text> Genre: {val.genre}</Card.Text>
                        <Card.Text> Director: {val.director}</Card.Text>
                        <Card.Text> Duration: {val.duration}</Card.Text>
                        <Card.Text className='card-text'> Discription: {val.description}</Card.Text>
                        <Card.Text className='card-text'> Rating: {avgrate(val.rating)}<FontAwesomeIcon icon={faStar} id="font"/></Card.Text>
                        <Form>
                        <Form.Group as={Col} controlId="formGridState" >
                        <Form.Label>Rate Movie:</Form.Label>
                        <Form.Select defaultValue="1" id='select' onChange={(event)=> setRating({...Rating,rating:event.target.value})}>
                            <option>1</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Select>
                        </Form.Group>
                        </Form>
                        <Button variant="primary" type="button" onClick={()=>handleRate((val._id))} className='rate-btn'>Rate</Button>
                        </div>
                    </Card.Body>
                    </Card>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Userpage