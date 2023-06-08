import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import Image from 'react-bootstrap/Image';
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col } from "react-bootstrap";
import asset from "../components/image/asset.jpg";
// import Login from './Login.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardGroup, Container } from 'react-bootstrap';
import { useState } from 'react';
import { validate,setFormErrors,setIsSubmit } from 'react'
import login from '../Services/user-service';
import { doLogin, getRole } from '../Tokens/token';

import { useNavigate } from 'react-router-dom';


// toast.configure()

const Registration = (props) => {

  let navigate = useNavigate();
  
  const initialValues = { username: "", password: "" };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleUsernameChange = (e) => {
    // initialValues.username = e.target.value;
    setUsername(e.target.value);

  }
  const handlePasswordChange = (e) => {
    // console.log(e.target);
    // initialValues.password = e.target.value;
    // setFormValues(initialValues);
    setPassword(e.target.value);
  }


  const handleSubmit =(e)=>{
    
    e.preventDefault();
    const formValues = {username,password}
    console.log(formValues)
    // setFormErrors(formValues);
    // setIsSubmit(true);
    // console.log(formValues);

    login(formValues).then((resp)=>{
      console.log(resp)
      console.log("Success log")
      doLogin(resp,()=>{

        console.log("login detail is saved to local storage")
  
      })
      console.log(getRole())
      
      if(getRole()==1){

        navigate("/admin/asset");

      }else if(getRole()==2){

        navigate("/employee/dashboard");

      }else {
        navigate("/");
      }

      

    }).catch((error)=>{
      console.log(error)
      console.log("Error Log")
    });





  }


  return (
    <CardGroup>
      <>


        <Container className="mt-5">

          <Row>
            <Col sm='4'>




              <Card>
                <Card.Body style={{ backgroundColor: 'white' }}  >
                  {/* <img src='https://media.itpro.co.uk/image/upload/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1611844567/itpro/2021/02/asset_management_illustration.jpg' className='img-fluid shadow-4 ' alt='...' /> */}
                  <div><h2>Login</h2></div>
                  <br></br>
                  <br></br>
                  <br></br>

                  <div className="form">
                    <Form >
                      <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Username*</Form.Label>
                        <Form.Control name='username' type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                        <Form.Text className="text-muted">
                        </Form.Text>

                        <br></br>
                        <br></br>



                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password*</Form.Label>
                          <Form.Control name='password' type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange} />
                        </Form.Group>


                      </Form.Group>
                      <Form.Group className="mb-1" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                      </Form.Group>

                      <br></br>
                      <br></br>

                      <Button variant="primary" onClick={handleSubmit} type="submit" className="mt-0.5">

                        Submit
                      </Button>

                    </Form>
                  </div>

                </Card.Body>
              </Card>

            </Col>

            <Col sm='8'>
              <div className='img'>
                {/* <img src='https://www.onepoll.us/_wp/wp-content/uploads/2019/01/home_graphic.png ' alt='...' /> */}
                {/* <img src="./components/image/asset.jpg" thumbnail  style={{border:"none"}}  alt='...' /> */}
                <img src={asset} alt="cannot display" />

              </div>
            </Col>
          </Row>

        </Container>

      </>
    </CardGroup>
  )

};


export default Registration;
