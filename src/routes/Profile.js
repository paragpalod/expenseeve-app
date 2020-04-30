import React from 'react';
import { Container , Row , Col , InputGroup , FormControl , Button} from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

const Styles = styled.div`

  .settings {
    padding-top: 30px;
    margin-left: 220px;
  }

  .budget {
    margin: 75px 30px 50px 30px;
  }

  .category {
    margin: 50px 30px 30px 30px;
  }

  .inputName {
    margin-top: 7px;
  }

  .button {
    width: 150px;
    margin-top: 3px
  }

  .passwordInput {
    margin-bottom: 15px
  }

`;

function Profile () {
  return  (
    <Styles className="example" >
      <Header/>
      <Sidebar/>
      <Container className="settings">
        <Row className="budget">
          <Col className="textCenter inputName" ><h5>Name</h5></Col>
          <Col className="textCenter" >
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter your name"
                aria-label="Total Budget"
                aria-describedby="basic-addon1"
                type="text"
              />
            </InputGroup>
          </Col>
          <Col className="textCenter" ><Button className="button" variant="info">Update</Button></Col>
        </Row>
        <Row className="category" >
          <Col className="textCenter inputName" ><h5>Username</h5></Col>
          <Col className="textCenter" >
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter your username"
                aria-label="Categories"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
          <Col className="textCenter" ><Button className="button" variant="info">Update</Button></Col>
        </Row>
        <Row className="category" >
          <Col className="textCenter inputName" ><h5 className="mt-50">Change Password</h5></Col>
          <Col className="textCenter">
            <InputGroup>
              <FormControl
                placeholder="Enter your old password"
                aria-label="Categories"
                aria-describedby="basic-addon1"
                className="passwordInput"
              />
              <InputGroup>
                <FormControl
                  placeholder="Enter your new password"
                  aria-label="Categories"
                  aria-describedby="basic-addon1"
                  type="number"
                  className="passwordInput"
                />
              </InputGroup>
              <InputGroup>
                <FormControl
                  placeholder="Confirm your new password"
                  aria-label="Categories"
                  aria-describedby="basic-addon1"
                  type="number"
                  className="passwordInput"
                />
              </InputGroup>
            </InputGroup>
          </Col>
          <Col className="textCenter  mt-50" ><Button className="button" variant="info">Update</Button></Col>
        </Row>
      </Container>
    </Styles>
  )
}

export default Profile;
