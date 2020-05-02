import React , { useState , useEffect } from 'react';
import { Container , Row , Col , Button , Card, Table, Pagination, Modal, Form , FormGroup , InputGroup , FormControl , DropdownButton , Dropdown} from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
// import { Link } from "react-router-dom";
import API from '../lib/api';
import Toaster from '../lib/toaster';
import { formatDateTime , formatDateForHtmlForm } from '../lib';

const Styles = styled.div`

  .settings {
    padding-top: 30px;
    margin-left: 220px;
  }

  .budget {
    margin: 10px 10px;
  }

  .category {
    margin: 50px 30px 30px 30px;
  }

  .button {
    margin-left: 25px;
    margin-bottom: 10px
  }

  .chartCard {
    height: 220px;
    overflow: hidden
  }

  .card-header {
    font-weight: 600;
  }

  .table {
    margin: 0px auto;
    width: 1060px;
    height: 255px;
    overflow: scroll;
  }

  .table::-webkit-scrollbar {
    display: none;
  }

  .pagination {
    margin-left: 25px;
    margin-top: 10px
  }

  .inactiveRow {
    color: red;
    background-color: #c5c5c4;
  }

`;

function Home (props) {
  const [userInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));

  const [isFromOpen , setIsFromOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(formatDateForHtmlForm(Date.now()));
  const [selectedExpenseID, setSelectedExpenseID] = useState('');
  const [formType ,setFormType] = useState('');

  // for get category list functionality
  const [categoryList, setCategoryList] = useState([]);

  // for get expense list
  const [expenseList, setExpenseList] = useState([]);

  // pagination configuration
  const [pageNumber, setPageNumber] = useState(1);

  //deactivate or activate expense
  const [isConfirmationModelOpen, setIsConfirmationModelOpen] = useState(false);
  const [ selectedExpense , setSelectedExpense] = useState({});

  useEffect(() => {
    getCategories();
    getExpenses();
  }, [])//eslint-disable-line

  async function getCategories () {
    let Response = await API.get(`/categories?userID=${userInfo._id}&activationStatus=active`);

    if (Response.data) {
      setCategoryList(Response.data);
    }
  }

  async function getExpenses () {
    let Response = await API.get(`/expenses?userID=${userInfo._id}`);

    if (Response.data) {
      setExpenseList(Response.data);
    }
  }

  async function createAndEditExpense() {
    try {
        let Response;
        if (formType === 'create') {
          Response = await API.post('/expense' , { categoryID, userID: userInfo._id, itemName , amount, date});
        } else if (formType === 'edit') {
          Response = await API.put(`/expense/${selectedExpenseID}` , { categoryID, userID: userInfo._id, itemName , amount, date});
        }
        if (Response) {
          setIsFromOpen(false);
          getExpenses('');
          setCategory('');
          setCategoryID('');
          setItemName('');
          setAmount('');
          setSelectedExpenseID('');
          setDate(formatDateForHtmlForm(Date.now()));
          Toaster(`Expense ${formType === 'create'? 'Added' : 'Updated'} Successfully`, 'success');
        }
    } catch (Exception) {
      if (Exception && Exception.response) {
        Toaster(Exception.response.data.message, 'error');
      } else if (Exception && Exception.message){
        Toaster(Exception.message, 'error');
      }
    }
  }

  function getCategoryName(categoryID) {
    let category = categoryList.filter(i => i._id === categoryID)[0];
    return category && category.name ? category.name : '-';
  }

  async function activateOrDeactivateExpense (expenseID, action) {
    try {
      let Response = await API.put(`/expense/${expenseID}/${action}`);
      if (Response.data) {
        getExpenses();
        Toaster(`Expense ${action}d successfully`, 'success');
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
    <Styles>
      <Header/>
      <Sidebar/>
      <Container className="settings">
        <Row className="budget">
          <Col xs={6}>
            <Card className="chartCard" >
              <Card.Header className="textCenter">Budget overview</Card.Header>
              <Card.Body>
              sayudfgkhdfjg
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}>
            <Card className="chartCard">
              <Card.Header className="textCenter">Category wise split</Card.Header>
              <Card.Body>
              sfgsdjfgnkdf.b
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
          <Button
            className="button"
            variant="info"
            onClick={() => {
              setIsFromOpen(true);
              setFormType('create')
            }}
          >
            Add Expense
          </Button>
          </Col>
        </Row>
        <Card className="table">
        <Row>
          <Col>
            <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Category</th>
                    <th>Item name</th>
                    <th>Amount</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  expenseList.slice((pageNumber-1) *3 , ((pageNumber-1) *3) + 3).map( (expense,index) => (
                    <tr className={!expense.deletedAt ? '' : 'inactiveRow'} key={expense._id}>
                      <td>
                        <Button
                          variant="light"
                          onClick={() => {
                            setSelectedExpenseID(expense._id);
                            setCategory(getCategoryName(expense.categoryID));
                            setCategoryID(expense.categoryID);
                            setItemName(expense.itemName);
                            setAmount(expense.amount);
                            setDate(formatDateForHtmlForm(expense.date));
                            setFormType('edit');
                            setIsFromOpen(true);
                          }}
                          disabled={expense.deletedAt}
                        >
                          <i className="fa fa-edit icon"/>
                        </Button>
                      </td>
                      <td>{getCategoryName(expense.categoryID)}</td>
                      <td>{expense.itemName}</td>
                      <td>{expense.amount}</td>
                      <td>{!expense.deletedAt ? 'Active' : 'Inactive'}</td>
                      <td>{formatDateTime(expense.date)}</td>
                      <td>
                        <Button
                          variant={!expense.deletedAt ? 'danger' : 'info'}
                          onClick={() => {
                            setIsConfirmationModelOpen(true);
                            setSelectedExpense(expense);
                          }}
                        >
                          {!expense.deletedAt ? 'Delete' : 'Restore'}
                        </Button>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
            </Table>
          </Col>
        </Row>
        </Card>
        <Row>
        <Col>
          <Pagination>
            <Pagination.Prev disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}/>
            <Pagination.Item>{`${pageNumber} of ${Math.ceil(expenseList.length/3)}`}</Pagination.Item>
            <Pagination.Next disabled={pageNumber === Math.ceil(expenseList.length/3)} onClick={() => setPageNumber(pageNumber + 1)}/>
          </Pagination>
        </Col>
        </Row>
      </Container>
      <Modal
        show={isFromOpen}
        onHide={() => {
          setIsFromOpen(false);
          setSelectedExpenseID('')
          setCategory('');
          setCategoryID('');
          setItemName('');
          setAmount('');
          setDate(formatDateForHtmlForm(Date.now()));
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{formType === 'create' ? 'Add Expense' : 'Update Expense'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form role="form">
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <InputGroup>
                      <FormControl
                        placeholder="Category"
                        aria-label="Category"
                        aria-describedby="basic-addon2"
                        value={category}
                      />

                      <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title=""
                        id="input-group-dropdown-2"
                        value={categoryID}
                      >
                        {
                          categoryList.map( category => (
                            <Dropdown.Item
                              onClick={() => {
                                setCategory(category.name);
                                setCategoryID(category._id)
                              }}
                              key={category._id}
                            >
                              {category.name}
                            </Dropdown.Item>
                          ))
                        }
                      </DropdownButton>
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <FormControl
                        placeholder="Item Name"
                        type="text"
                        value={itemName}
                        onChange={(e) => {
                          setItemName(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <FormControl
                        placeholder="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <FormControl
                        placeholder="Confirm Password"
                        type="date"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer className="textCenter">
          <Button
            variant="secondary"
            onClick={() => {
              setIsFromOpen(false);
              setSelectedExpenseID('')
              setCategory('');
              setCategoryID('');
              setItemName('');
              setAmount('');
              setDate(formatDateForHtmlForm(Date.now()));
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={createAndEditExpense}>
            {formType === 'create'? 'Add' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={isConfirmationModelOpen}
        onHide={() => {
          setIsConfirmationModelOpen(false);
          setSelectedExpense({});
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Action Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to
          {!selectedExpense.deletedAt ? ' deactivate' : ' activate'} expense?
        </Modal.Body>
        <Modal.Footer className="textCenter">
          <Button variant="secondary" onClick={() => {
            setIsConfirmationModelOpen(false);
            setSelectedExpense({});
          }}>
            No
          </Button>
          <Button variant="primary" onClick={() => {
            activateOrDeactivateExpense(
              selectedExpense._id ,
              !selectedExpense.deletedAt ? 'deactivate' : 'activate'
            );
            setIsConfirmationModelOpen(false);
            setSelectedExpense({});
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Styles>
  )
}

export default Home;
