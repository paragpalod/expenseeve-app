import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Home = () => (
  <React.Fragment>
    <Header/>
    <Sidebar/>
    <Container style={{marginLeft: '220px'}}>
      HOME
    </Container>
  </React.Fragment>
)

export default Home
