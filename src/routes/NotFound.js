import React , { useState } from 'react';
import { Container , Row , Col , Button } from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

const Styles = styled.div`

  .settings {
    padding-top: 30px;
    margin-left: 220px;
  }

  .category {
    margin: 50px 30px 30px 30px;
  }

  .button {
    width: 200px;
    margin-top: 30px
  }

  .notFound {
    font-size: 180px;
    color: #00adad;
    font-weight: 700;
    text-decoration-line: underline;
    margin: 75px 0px 0px 0px;
  }

  .notFoundText {
    font-size: 35px;

  }
`;

function NotFound (props) {
  const [isLoggedIn] = useState(localStorage.getItem('token') || sessionStorage.getItem('token'))

  return  (
    <Styles>
      {
        isLoggedIn &&
        <Header/>
      }
      {
        isLoggedIn &&
        <Sidebar/>
      }
      <Container className={isLoggedIn ? "settings" : ""}>
        <Row>
          <Col className="textCenter notFound">4 0 4</Col>
        </Row>
        <Row>
          <Col className="textCenter notFoundText">OOPS! PAGE NOT FOUND</Col>
        </Row>
        <Row>
          <Col className="textCenter">
            Soory! But the page you are looking for does not exist in this application.
          </Col>
        </Row>
        <Row>
        <Col className="textCenter">
        <Button className="button" variant="info">
          {isLoggedIn ? "Go To Dashboard" : "Go To Login"}
        </Button>
        </Col>
        </Row>
      </Container>
    </Styles>
  )
}

export default NotFound;
