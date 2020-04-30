import React from 'react';
import { Container , Row , Col , InputGroup , FormControl , Button, Card, Form , FormGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Styles = styled.div`
  .login {
    background-image: url('assets/expenseBg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    padding: 75px
  }

  .card-title {
    text-align: center;
    margin-bottom: 30px;
  }
  .loginCard {
    margin: auto;
    height: 450px;
    width: 350px;
    background-color: #e2ffff;
  }

  Button {
    width: 250px
  }
`;

function Signup () {
  return  (
    <Styles>
      <Container fluid className="login">
        <Row>
          <Col>
            <Card className="loginCard">
            <Card.Body>
            <Card.Title>Signup</Card.Title>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <FormControl placeholder="Name" type="text"/>
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <FormControl placeholder="Username" type="text"/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <FormControl placeholder="Password" type="password"/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <FormControl placeholder="Confirm Password" type="password"/>
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                className="my-4" variant="info" type="button">
                  SIGNUP
                </Button>
              </div>
              <div className="text-center">
                <span>Already have an account? </span>
                <a href="/login" to="/login" tag={Link} >Login</a>
              </div>
            </Form>
            </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Styles>
  )
}

export default Signup
