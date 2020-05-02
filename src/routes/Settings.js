import React , { useEffect , useState } from 'react';
import { Container , Row , Col , InputGroup , FormControl , Button, Card, Table, Modal} from 'react-bootstrap';
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

  .inactiveRow {
    color: red;
    background-color: #c5c5c4;
  }
`;

function Settings () {
  const [userInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));

  // update budget
  const [totalBudget , setTotalBudget] = useState(userInfo && userInfo.totalBudget ? userInfo.totalBudget : '');
  const [totalBudgetError, setTotalBudgetError] = useState(false);

  // creatte category
  const [category , setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

  // for get category list functionality
  const [categoryList, setCategoryList] = useState([]);


  // for activate and deactivate category functionality
  const [isConfirmationModelOpen, setIsConfirmationModelOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    getCategories();
  }, [])//eslint-disable-line

  async function getCategories () {
    let Response = await API.get(`/categories?userID=${userInfo._id}`);

    if (Response.data) {
      console.log(Response.data);
      setCategoryList(Response.data);
    }
  }

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
        let Response = await API.post(`/category` , { name: category , userID: userInfo._id });
        if (Response.data) {
          setCategory('');
          getCategories();
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

  async function activateOrDeactivateCategory (categoryID, action) {
    try {
      let Response = await API.put(`/category/${categoryID}/${action}`);
      if (Response.data) {
        getCategories();
        Toaster(`Category ${action}d successfully`, 'success');
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
          <Table className="table" responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                categoryList.map ( (category , index) => (
                  <tr className={!category.deletedAt ? '' : 'inactiveRow'}>
                    <td>{index+1}</td>
                    <td>{category.name}</td>
                    <td>{!category.deletedAt ? 'Active' : 'Inactive'}</td>
                    <td >
                      <Button
                        variant={!category.deletedAt ? 'danger' : 'info'}
                        onClick={() => {
                          setIsConfirmationModelOpen(true);
                          setSelectedCategory(category);
                        }}
                      >
                        {!category.deletedAt ? 'Delete' : 'Restore'}
                      </Button>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
          </Card>
        </Row>
      </Container>
      <Modal
        show={isConfirmationModelOpen}
        onHide={() => {
          setIsConfirmationModelOpen(false);
          setSelectedCategory({});
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Action Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to
          {!selectedCategory.deletedAt ? ' deactivate' : ' activate'} category?
        </Modal.Body>
        <Modal.Footer className="textCenter">
          <Button variant="secondary" onClick={() => {
            setIsConfirmationModelOpen(false);
            setSelectedCategory({});
          }}>
            No
          </Button>
          <Button variant="primary" onClick={() => {
            activateOrDeactivateCategory(
              selectedCategory._id ,
              !selectedCategory.deletedAt ? 'deactivate' : 'activate'
            );
            setIsConfirmationModelOpen(false);
            setSelectedCategory({});
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Styles>
  )
}

export default Settings
