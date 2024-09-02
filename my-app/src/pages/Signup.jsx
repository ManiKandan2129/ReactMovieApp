import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form';
import '../styles/signup.css'
import Button from 'react-bootstrap/Button';
import { Common } from '../Common';
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col';


function Signup() {
    const { signupInfo, FormChange, FormSubmit,userType, setUserType, secretkey, setsecretkey, err } = useContext(Common)

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
      };
    const FormSecretKey = (e)=>{
        setsecretkey(e.target.value)
    }  
  return (
    <>
        <div className="container" id='formpage'>
            <div className="row">
                <div className="col-12">
                    <div className="box">
                        <h2 className='heading'>Signup</h2>
                    <Form id='form' onSubmit={(event)=> FormSubmit(event)}>
                        <Form.Group as={Col} controlId="formUserType" id='radio'>
                            <Form.Label>User Type</Form.Label>
                            <div key={'inline-radio'} className="mb-3">
                            <Form.Check
                                inline
                                label="User"
                                type="radio"
                                id="user-radio"
                                value="user"
                                checked={userType === 'user'}
                                onChange={handleUserTypeChange}
                            />
                            <Form.Check
                                inline
                                label="Admin"
                                type="radio"
                                id="admin-radio"
                                value="admin"
                                checked={userType === 'admin'}
                                onChange={handleUserTypeChange}
                            />
                            </div>
                        </Form.Group>
                            
                        <Form.Group className="mb-3" controlId="formGroupUsername">   
                            <Form.Control className="input-box" 
                            type="text" 
                            name='username'
                            onChange={(e)=>FormChange(e)}
                            value={signupInfo.username}
                            maxLength={50}
                            required
                            placeholder="Enter Username" />
                        </Form.Group> 

                        <Form.Group className="mb-3" controlId="formGroupEmail">  
                            <Form.Control className="input-box" 
                            type="email"  
                            name='email'
                            onChange={(e)=>FormChange(e)}
                            value={signupInfo.email}
                            required 
                            placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGroupPhone">  
                            <Form.Control 
                            className="input-box" 
                            type="tel"               
                            name='phone'
                            onChange={(e)=>FormChange(e)}
                            value={signupInfo.phone}
                            maxLength={10}
                            required
                            placeholder="Enter phone number"  />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control 
                            className="input-box" 
                            type="password" 
                            name='password'
                            onChange={(e)=>FormChange(e)}
                            value={signupInfo.password}
                            required
                            placeholder="Password" />
                        </Form.Group>

                        {userType == "admin" && <Form.Group className="mb-3" controlId="formGroupSecretkey">
                            <Form.Control 
                            className="input-box" 
                            type="password" 
                            name='secretkey'
                            onChange={(e)=>FormSecretKey(e)}
                            value={secretkey}
                            required
                            placeholder="Admin Secret-Key" />
                        </Form.Group>}
                        {err&&<p className='err'>{err}</p>}
                        <Button variant="primary" id='btn2' type='submit'>Signup</Button>
                        <div className="bottom-link">
                            <p>Already a member?</p>
                            <Link to='/'>Log In</Link>
                        </div>
                    </Form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup