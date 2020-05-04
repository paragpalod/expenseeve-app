import React , { useEffect , useState } from 'react';
import { Container , Row , Col , InputGroup , FormControl , Button, Card, Form , FormGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import API from '../lib/api';
import Toaster from '../lib/toaster';

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
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }

  Button {
    width: 250px
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
    margin-left: 50px
  }
`;

function Login (props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMe, setIsRememberMe] = useState(true);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      props.history.push('/home');
    }

    async function validateSession() {
      let token;
      if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
      } else if (sessionStorage.getItem('token')) {
        token = sessionStorage.getItem('token');
      }
      if (token) {
        try {
          let SessionInfo = await API.get(`/validateSession/${token}`);
          if (SessionInfo.data && SessionInfo.data.token && SessionInfo.data.user) {
            localStorage.setItem('userInfo' , JSON.stringify(SessionInfo.data.user));
            if (localStorage.getItem('token')) {
              localStorage.setItem('token' , SessionInfo.data.token);
            } else if (sessionStorage.getItem('token')) {
              sessionStorage.setItem('token' , SessionInfo.data.token);
            }
          }
        } catch (Exception) {
          await API.delete('/logout');
          delete API.defaults.headers.common['Authorization'];
          localStorage.clear();
          sessionStorage.clear();
        }
      } else {
        localStorage.clear();
      }
    }

    validateSession();

  },[])//eslint-disable-line

  async function submitLoginForm (ev) {
    ev.preventDefault();
    if (!username) {
      setUsernameError(true)
    } else if (!password) {
      setPasswordError(true);
    } else {
      try {
        let LoginInfo = await API.post('/login' , { username , password });
        if (LoginInfo.data && LoginInfo.data.token && LoginInfo.data.user) {
          localStorage.setItem('userInfo' , JSON.stringify(LoginInfo.data.user));
          if (isRememberMe) {
            localStorage.setItem('token' , LoginInfo.data.token);
          } else {
            sessionStorage.setItem('token' , LoginInfo.data.token);
          }
          if (LoginInfo.data.user.totalBudget) {
            props.history.push('/home');
          } else {
            props.history.push('/settings');
          }
        }
      } catch (Exception){
        if (Exception && Exception.response) {
          Toaster(Exception.response.data.message, 'error');
        } else if (Exception && Exception.message){
          Toaster(Exception.message, 'error');
        }
      }
    }
  }

  return  (
    <Styles>
      <Container fluid className="login">
        <Row>
          <Col>
            <Card className="loginCard">
            <Card.Body>
            <Card.Title>Login To Your Account</Card.Title>
            <Form role="form">
              <FormGroup className={ usernameError ? "inputDivError" : ""}>
                <InputGroup className="input-group-alternative">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><i className="fa fa-user icon"/></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    className={ usernameError ? 'inputBoxError' : '' }
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (e.target.value) {
                        setUsernameError(false);
                      }
                    }}
                  />
                </InputGroup>
              </FormGroup>
              {
                usernameError &&
                <span className="errMessage" >Username can not be black</span>
              }
              <FormGroup className={ passwordError ? "inputDivError" : ""}>
                <InputGroup className="input-group-alternative">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1"><i className="fa fa-lock icon"/></InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                  className={ passwordError ? 'inputBoxError' : '' }
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value) {
                        setPasswordError(false);
                      }
                    }}
                  />
                </InputGroup>
              </FormGroup>
              {
                passwordError &&
                <span className="errMessage" >Password can not be black</span>
              }
              <div className="text-center custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                  checked={isRememberMe}
                  onChange={ (e) => {
                    setIsRememberMe(e.target.checked);
                  }}
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
                  className="my-4"
                  variant="info"
                  type="button"
                  onClick={submitLoginForm}
                >
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
