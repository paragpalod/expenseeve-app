import React , { useState } from 'react';
import { Container , Row , Col , InputGroup , FormControl , Button } from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import API from '../lib/api';
import Toaster from '../lib/toaster';

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

  .inputBoxError {
    border: solid 1px red;
  }

  .inputDivError {
    margin-bottom: 0px;
  }

  .errMessage {
    color: red;
    font-size: 11px;
    margin-left: 0px
  }
`;

function Profile (props) {
  const [userInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [username , setUsername] = useState(userInfo ? userInfo.username : '');
  const [name , setName] = useState(userInfo ? userInfo.name : '');
  const [oldPassword , setOldPassword] = useState('');
  const [newPassword , setNewPassword] = useState('');
  const [confirmNewPassword , setConfirmNewPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);

  async function updateUsername () {
    try {
      if (!username) {
        setUsernameError(true);
      } else {
        let UsernameUpdateResponse = await API.put(`/updateUsername/${userInfo._id}` , { username });
        if (UsernameUpdateResponse.data) {
          localStorage.setItem('userInfo' , JSON.stringify(UsernameUpdateResponse.data));
          Toaster('Username Updated Successfully', 'success');
        }
      }
    } catch (Exception) {
      if (Exception && Exception.response) {
        Toaster(Exception.response.data.message, 'error');
      } else if (Exception && Exception.message){
        Toaster(Exception.message, 'error');
      }
    }
  }

  async function updateName() {
    try {
      if (!name) {
        setNameError(true);
      } else {
        let NameUpdateResponse = await API.put(`/updateName/${userInfo._id}` , { name });
        if (NameUpdateResponse.data) {
          localStorage.setItem('userInfo' , JSON.stringify(NameUpdateResponse.data));
          Toaster('Name Updated Successfully', 'success');
        }
      }
    } catch (Exception) {
      if (Exception && Exception.response) {
        Toaster(Exception.response.data.message, 'error');
      } else if (Exception && Exception.message){
        Toaster(Exception.message, 'error');
      }
    }
  }

  async function changePassword() {
    try {
      if (!oldPassword) {
        setOldPasswordError(true);
      } else if (!newPassword) {
        setNewPasswordError(true);
      } else if (!confirmNewPassword) {
        setConfirmNewPasswordError(true);
      } else {
        let Response = await API.put(`/changePassword` , { oldPassword , newPassword , confirmNewPassword });
        if (Response.data) {
          Toaster('Password Changed Successfully, \n Login with new password.', 'success');
          // localStorage.clear();
          // sessionStorage.clear();
          // props.history.push('/')
        }
      }
    } catch (Exception) {
      if (Exception && Exception.response) {
        Toaster(Exception.response.data.message, 'error');
      } else if (Exception && Exception.message){
        Toaster(Exception.message, 'error');
      }
    }
  }

  return  (
    <Styles className="example" >
      <Header/>
      <Sidebar/>
      <Container className="settings">
        <Row className="budget">
          <Col className="textCenter inputName" ><h5>Name</h5></Col>
          <Col className="textCenter" >
            <InputGroup className={nameError ? "inputDivError" : "mb-3"}>
              <FormControl
                className={nameError ? 'inputBoxError' : '' }
                placeholder="Enter your name"
                aria-label="Name"
                aria-describedby="basic-addon1"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (e.target.value) {
                    setNameError(false);
                  }
                }}
              />
            </InputGroup>
            {
              nameError &&
              <span className="errMessage" >Name can not be black</span>
            }
          </Col>
          <Col className="textCenter" >
            <Button
              className="button"
              variant="info"
              onClick={updateName}
            >
              Update
            </Button>
          </Col>
        </Row>
        <Row className="category" >
          <Col className="textCenter inputName" ><h5>Username</h5></Col>
          <Col className="textCenter" >
            <InputGroup className={(username.length < 6 && username.length > 0) || usernameError ? "inputDivError" : "mb-3"}>
              <FormControl
                className={(username.length < 6 && username.length > 0) || usernameError ? 'inputBoxError' : '' }
                placeholder="Enter your username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (e.target.value) {
                    setUsernameError(false);
                  }
                }}
              />
            </InputGroup>
            {
              usernameError &&
              <span className="errMessage" >Username can not be black</span>
            }
            {
              username.length < 6 && username.length > 0 &&
              <span className="errMessage" >Username length should be 6 charactors long</span>
            }
          </Col>
          <Col className="textCenter" >
            <Button
              className="button"
              variant="info"
              onClick={updateUsername}
            >
              Update
            </Button>
          </Col>
        </Row>
        <Row className="category" >
          <Col className="textCenter inputName" ><h5 className="mt-50">Change Password</h5></Col>
          <Col className="textCenter">
            <InputGroup className={(oldPassword.length < 6 && oldPassword.length > 0) || oldPasswordError ? "inputDivError" : ""}>
              <FormControl
                className={oldPasswordError ? 'inputBoxError' : 'passwordInput' }
                placeholder="Enter your old password"
                aria-label="Old Password"
                aria-describedby="basic-addon1"
                type="password"
                value={oldPassword}
                onChange={(e) => {
                  if (e.target && (e.target.value.length - oldPassword.length) < 2) {
                    setOldPassword(e.target.value);
                  }
                  if (e.target.value) {
                    setOldPasswordError(false);
                  }
                }}
              />
            </InputGroup>
            {
              oldPasswordError &&
              <span className="errMessage" >Old password can not be black</span>
            }
            <InputGroup className={(newPassword.length < 6 && newPassword.length > 0) || newPasswordError ? "inputDivError" : ""}>
              <FormControl
                className={(newPassword.length < 6 && newPassword.length > 0) || newPasswordError ? 'inputBoxError' : 'passwordInput' }
                placeholder="Enter your new password"
                aria-label="Categories"
                aria-describedby="basic-addon1"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (e.target.value) {
                    setNewPasswordError(false);
                  }
                }}
              />
            </InputGroup>
            {
              newPasswordError &&
              <span className="errMessage" >New password can not be black</span>
            }
            {
              newPassword.length < 6 && newPassword.length > 0 &&
              <span className="errMessage" >New password length should be 6 charactors long</span>
            }
            <InputGroup className={(newPassword !== confirmNewPassword && confirmNewPassword.length > 0) || confirmNewPasswordError ? "inputDivError" : "mb-3"}>
              <FormControl
                className={(newPassword !== confirmNewPassword && confirmNewPassword.length > 0) || confirmNewPasswordError ? 'inputBoxError' : 'passwordInput' }
                placeholder="Confirm your new password"
                aria-label="Categories"
                aria-describedby="basic-addon1"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  if (e.target.value) {
                    setConfirmNewPasswordError(false);
                  }
                }}
              />
            </InputGroup>
            {
              confirmNewPasswordError &&
              <span className="errMessage" >Confirm password can not be black</span>
            }
            {
              newPassword !== confirmNewPassword && confirmNewPassword.length > 0 &&
              <span className="errMessage" >Password and Confirm Password should be same</span>
            }
          </Col>
          <Col className="textCenter  mt-50" >
            <Button
              className="button"
              variant="info"
              onClick={changePassword}
            >
              Update
            </Button>
          </Col>
        </Row>
      </Container>
    </Styles>
  )
}

export default Profile;
