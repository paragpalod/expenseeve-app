import React from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .styledSideNav {
    position: fixed;
    height: 100%;
    width: 220px;
    z-index: 1;
    top: 1.9em;
    background-color: #e2ffff;
    overflow-x: hidden;
    padding-top: 5px;
  }

  .nav-link {
    color: #000;
    font-size: 17px
  }

  .icon {
    margin-right: 15px
  }
`;


const Sidebar = () => (
  <Styles>
    <div class="styledSideNav" >
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Link href="/home"> <i class="fa fa-home icon"/> Home</Nav.Link>
        <Nav.Link href="/settings"> <i class="fa fa-cog icon"/> Settings</Nav.Link>
        <Nav.Link href="/profile"> <i class="fa fa-user-circle icon"/> Profile</Nav.Link>
        <Nav.Link href="/profile"> <i class="fa fa-sign-out icon"></i> Logout</Nav.Link>
      </Nav>
    </div>
  </Styles>
);

export default Sidebar;
