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
    padding: 150px
  }

  .card-title {
    text-align: center;
    margin-bottom: 30px;
  }
  .loginCard {
    margin: auto;
    height: 350px;
    width: 350px;
    background-color: #e2ffff;
  }

  Button {
    width: 250px
  }
`;

function Login () {
  return  (
    <Styles>
      <Container fluid className="login">
        <Row>
          <Col>
            <Card className="loginCard">
            <Card.Body>
            <Card.Title>Login To Your Account</Card.Title>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><i class="fa fa-user icon"/></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl placeholder="Username" type="text"/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><i class="fa fa-lock icon"/></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl placeholder="Password" type="password"/>
                </InputGroup>
              </FormGroup>
              <div className="text-center custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span>Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                className="my-4" variant="info" type="button">
                  LOGIN
                </Button>
              </div>
              <div className="text-center">
                <span>New to expenseeve? </span>
                <a href="/signup" to="/signup" tag={Link} >Signup</a>
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

export default Login
