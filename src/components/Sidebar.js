import React , { useEffect , useState } from 'react';
import { useHistory , useLocation } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import API from '../lib/api';

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
    font-size: 17px;
    &:hover {
      color: #0054af;
      font-size: 20px;
    }
  }

  .selected {
    color: #0080ff
  }

  .icon {
    margin-right: 15px
  }
`;


function Sidebar () {
  const history = useHistory();
  const location = useLocation();

  const [currentPath , setCurrentPath] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token') && !sessionStorage.getItem('token')) {
      history.push('/');
    }
  },[]);//eslint-disable-line

  useEffect(() => {
    if (location.pathname === '/home') {
      setCurrentPath('home');
    } else if (location.pathname === '/settings') {
      setCurrentPath('settings');
    } else if (location.pathname === '/profile') {
      setCurrentPath('profile');
    }
  },[location , setCurrentPath])

  async function logoutUser(ev) {
    ev.preventDefault();
    try {
      localStorage.clear();
      sessionStorage.clear();
      history.push('/');
      await API.delete('/logout');
    } catch (Exception){
      console.log({Exception});
    }
  }

  return (
    <Styles>
      <div className="styledSideNav" >
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link className={currentPath === 'home' ? "selected" : ""} href="/home"> <i className="fa fa-home icon"/> Home</Nav.Link>
          <Nav.Link className={currentPath === 'settings' ? "selected" : ""} href="/settings"> <i className="fa fa-cog icon"/> Settings</Nav.Link>
          <Nav.Link className={currentPath === 'profile' ? "selected" : ""} href="/profile"> <i className="fa fa-user-circle icon"/> Profile</Nav.Link>
          <Nav.Link onClick={logoutUser}> <i className="fa fa-sign-out icon"></i> Logout</Nav.Link>
        </Nav>
      </div>
    </Styles>
  )
}

export default Sidebar;
