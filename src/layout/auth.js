import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Auth = (props) => (
  <React.Fragment>
    <Header/>
    <Sidebar/>
    <Container style={{marginLeft: '220px'}}>
      {props.children}
    </Container>
  </React.Fragment>
)

export default Auth;
