import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../styles/addmovie.css'
import { Common } from '../Common';
import { useNavigate } from 'react-router-dom';

function Addmovie() {
    const{ MovieInfo, handleMovieData, HandleAddMovie, edit, handleupdate, handleCancel } = useContext(Common);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate('/', {replace:true})
            }
            console.log(localStorage.getItem("token"))
    },[])

  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-12" id='movie-form'>
                <Form onSubmit={(event)=>HandleAddMovie(event)}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label className='label1'>Movie Name</Form.Label>
                    <Form.Control
                    type="text" 
                    className='input2'
                    name="moviename"
                    onChange={(e)=>handleMovieData(e)}
                    value={MovieInfo.moviename}
                    placeholder="Enter movie name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label className='label1'>Genre</Form.Label>
                    <Form.Control 
                    type="text" 
                    className='input2'
                    name="genre"
                    onChange={(e)=>handleMovieData(e)}
                    value={MovieInfo.genre}
                    placeholder="Enter Genre" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label className='label1'>Movie Image Url</Form.Label>
                    <Form.Control 
                    type="text" 
                    className='input2'
                    name="movieimg"
                    onChange={(e)=>handleMovieData(e)}
                    value={MovieInfo.movieimg}
                    placeholder="Enter Url" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label className='label1'>Description</Form.Label>
                    <Form.Control 
                    type="text" 
                    className='input2'
                    name="description"
                    onChange={(e)=>handleMovieData(e)}
                    value={MovieInfo.description}
                    placeholder="Enter description" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label className='label1'>Director</Form.Label>
                    <Form.Control 
                    type='text' 
                    className='input2'
                    name="director"
                    onChange={(e)=>handleMovieData(e)}
                    value={MovieInfo.director}
                    placeholder='Enter director'/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className='label1'>Duration</Form.Label>
                    <Form.Control 
                    type='number' 
                    className='input2'
                    name="duration"
                    onChange={(e)=>handleMovieData(e)}
                    value={MovieInfo.duration}
                    placeholder='Enter duration'/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label className='label1'>Release Date</Form.Label>
                    <Form.Control 
                    type='date'
                    className='input2'
                    name="releasedate"
                    onChange={(e)=>handleMovieData(e)}
                    value={MovieInfo.releasedate} />
                    </Form.Group>
                </Row>

               <div className="movie-btns">
                {!edit?<Button variant="primary" type="submit">Add movie</Button>:
                <Button variant="primary" type="button" onClick={()=>handleupdate()}>Update</Button>}
                <Button variant="danger" type="button" onClick={()=>handleCancel()}>Cancel</Button>
               </div>
                </Form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Addmovie