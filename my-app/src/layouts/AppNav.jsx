import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../styles/nav.css'
import { Common } from '../Common';
import { useNavigate, useLocation } from 'react-router-dom'

function AppNav() {
  const{ handleLogout,handleShow } = useContext(Common);
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <>
    <Navbar className="color-nav" variant="light">
      <Container className='nav'>
        <Navbar.Brand href="#">
          <div className="d-flex gap-3">
            <img src='../images/movie3.png' alt='logo-img' className='logo2'></img>
            {/* <h5 id='title'>Movie App</h5> */}
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <div className="nav-btns">
          {location.pathname === '/admin/dashboard'&&<Button variant="warning" onClick={()=>navigate('/admin/addmovie')} id='btn1'>Add Movie</Button>}
          {location.pathname === '/admin/dashboard'&&<Button variant="success" onClick={handleShow} id='btn1'>Manage Users</Button>}
          {location.pathname !== '/'&&location.pathname !== '/signup'&&<Button variant="danger" id='btn1' onClick={()=>handleLogout()}>Logout</Button>}
          {location.pathname === '/'&&<Button variant="warning" id='btn1' onClick={()=>navigate('/signup')}>Signup</Button>}
          {location.pathname === '/signup'&&<Button variant="warning" id='btn1'  onClick={()=>navigate('/')}>Login</Button>}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default AppNav