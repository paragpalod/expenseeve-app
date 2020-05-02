import React , { useState } from 'react';
import { Container , Row , Col , InputGroup , FormControl , Button, Card, Table} from 'react-bootstrap';
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

  .tableCard {
    margin: 10px auto;
    width: 850px;
    height: 300px;
    overflow: scroll;
  }

  .tableCard::-webkit-scrollbar {
    display: none;
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

function Settings () {
  const [userInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [totalBudget , setTotalBudget] = useState(userInfo && userInfo.totalBudget ? userInfo.totalBudget : '');
  const [category , setCategory] = useState('');
  const [totalBudgetError, setTotalBudgetError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  async function updateTotalBudget () {
    try {
      if (!totalBudget || totalBudget < 1) {
        setTotalBudgetError(true);
      } else {
        let BudgetUpdateResponse = await API.put(`/updateTotalBudget/${userInfo._id}` , { totalBudget });
        if (BudgetUpdateResponse.data) {
          localStorage.setItem('userInfo' , JSON.stringify(BudgetUpdateResponse.data));
          Toaster('Budget Updated Successfully', 'success');
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

  async function createCategory () {
    try {
      if (!category) {
        setCategoryError(true);
      } else {
        let Response = await API.put(`/createCategory` , { category , userID: userInfo._id });
        if (Response.data) {
          Toaster('Category Created Successfully', 'success');
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
          <Col className="textCenter inputName" ><h5>Total Budget</h5></Col>
          <Col className="textCenter" >
            <InputGroup className={totalBudgetError ? "inputDivError" : "mb-3"}>
              <FormControl
                className={totalBudgetError ? 'inputBoxError' : '' }
                placeholder="Enter your budget here"
                aria-label="Total Budget"
                aria-describedby="basic-addon1"
                type="number"
                value={totalBudget}
                onChange={(e) => {
                  setTotalBudget(e.target.value)
                  if (e.target.value > 0) {
                    setTotalBudgetError(false);
                  }
                }}
              />
            </InputGroup>
            {
              totalBudgetError &&
              <span className="errMessage" >Budget should be greater than 0</span>
            }
          </Col>
          <Col className="textCenter" >
            <Button
              className="button"
              variant="info"
              onClick={updateTotalBudget}
            >
              Update
            </Button>
          </Col>
        </Row>
        <Row className="category" >
          <Col className="textCenter inputName" ><h5>Categories</h5></Col>
          <Col className="textCenter" >
            <InputGroup className={categoryError ? "inputDivError" : "mb-3"}>
              <FormControl
                className={categoryError ? 'inputBoxError' : '' }
                placeholder="Enter category name"
                aria-label="Categories"
                aria-describedby="basic-addon1"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  if (e.target.value) {
                    setCategoryError(false);
                  }
                }}
              />
            </InputGroup>
            {
              categoryError &&
              <span className="errMessage" >Category name can not be black</span>
            }
          </Col>
          <Col className="textCenter" >
            <Button
              className="button"
              variant="info"
              onClick={createCategory}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Card body className="tableCard">
          <Table className="table" striped responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Row>
      </Container>
    </Styles>
  )
}

export default Settings
