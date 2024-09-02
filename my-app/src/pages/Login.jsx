import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form';
import '../styles/signup.css'
import Button from 'react-bootstrap/Button';
import { Common } from '../Common';
import { Link } from 'react-router-dom'

function Login() {
    const{ LoginInfo, handleLoginData, handleLogin, err } = useContext(Common);

  return (
    <>
        <div className="container" id='formpage'>
            <div className="row">
                <div className="col-12">
                    <div className="box">
                        <h2 className='heading'>Login</h2>
                    <Form onSubmit={(event)=>handleLogin(event)} id='form'>
                        <Form.Group className="mb-3" controlId="formGroupEmail">  
                            <Form.Control 
                            className="input-box" 
                            type="email"
                            name='email'
                            onChange={(e)=>handleLoginData(e)}
                            value={LoginInfo.email} 
                            placeholder="Enter email"
                            required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control 
                            className="input-box" 
                            type="password" 
                            name='password'
                            onChange={(e)=>handleLoginData(e)}
                            value={LoginInfo.password}
                            placeholder="Password"
                            required />
                        </Form.Group>
                        {err&&<p className='err'>{err}</p>}
                        <Button variant="primary" type="submit" id='btn2'>Login</Button>
                        <div className="bottom-link">
                            <p>New member?</p>
                            <Link to='/signup'>Sign Up</Link>
                        </div>
                    </Form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login