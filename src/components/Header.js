import React from 'react';
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #c7feff;
    height: 30px;
    position: fixed;
    width: 100%;
    z-index: 1;
  }

  .navbar-brand, .navbar-nav .nav-item {
    color: #000;
  }

  .name {
    margin: 0 auto;
  }

  .dot {
    height: 12px;
    width: 12px;
    margin-right: 5px;
  }
  .red {
    border: solid 6px red;
    border-radius: 40px;
  }

  .yellow {
    border: solid 6px yellow;
    border-radius: 40px;
  }

  .green {
    border: solid 6px green;
    border-radius: 40px;
  }
`;

const Header = () => (
  <Styles>
    <Navbar expond="lg">
        <span className='dot red'></span>
        <span className='dot yellow'></span>
        <span className='dot green'></span>
      <div className="name">
        Expenseeve
      </div>
    </Navbar>
  </Styles>
);

export default Header;
