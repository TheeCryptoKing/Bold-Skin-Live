import React, { useState } from "react";
import Context from '../Context.jsx'
import Login from '../login.jsx'
import Signup from '../signup.jsx'
import { Row, Col, Container, Button, Image } from "react-bootstrap";


function ProcessUser(){
    const[showLoginForm, setShowLoginForm] = useState(false)
    const[showSignupForm, setShowSignupForm] = useState(false)

    const handleLoginClick = () => {
        setShowLoginForm(!showLoginForm)
    };
    
    const handleSignupClick = () => {
        setShowSignupForm(!showSignupForm)
    };
    
return (
    <Container>
      <Col className="mt-4">
        <Row className="center" md={6}>
          <h1 onClick={handleLoginClick} className="base-text" style={{ cursor: "pointer" }}>
            Login
          </h1>
          {showLoginForm && <Login />}
          <h3></h3>
          <h1 onClick={handleSignupClick} className="base-text" style={{ cursor: "pointer" }}>
            Signup
          </h1>
          {showSignupForm && <Signup />}
        </Row>
      </Col>
    </Container>
  );
}

export default ProcessUser
