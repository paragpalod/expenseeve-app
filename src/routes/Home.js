import React , { useState , useEffect } from 'react';
import { Container , Row , Col , Button , Card, Table, Pagination, Modal, Form , FormGroup , InputGroup , FormControl , DropdownButton , Dropdown} from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
// import { Link } from "react-router-dom";
import API from '../lib/api';
import Toaster from '../lib/toaster';
import { formatDateTime , formatDateForHtmlForm } from '../lib';
import Chart from 'chart.js';
let doughnutChart;
let pieChart;

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
    overflow: scroll;
  }

  .chartCard::-webkit-scrollbar {
    display: none;
  }

  .card-header {
    font-weight: 600;
  }

  .expenseTable {
    margin: 0px auto;
    width: 1060px;
    height: 250px;
    overflow: scroll;
  }

  .expenseTable::-webkit-scrollbar {
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

  .expenseDoughnutChartDiv {
    width: 140px;
    height: 10px;
    margin-left: 50px;

  }

  .expensePieChartDiv {
    width: 270px;
    height: 140px;
    margin-left: 100px;
  }

  .card-body {
    padding: 15px
  }

  th {
    position: sticky;
    top: 0px;
    background-color: white;
    z-index: 1;
  }

  .tableButton {
    padding: 4px 7px;
  }

  .buttonCell {
    padding: 5px
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
  const [categoryListForAllCategory, setCategoryListForAllCategory] = useState([]);

  // for get expense list
  const [expenseList, setExpenseList] = useState([]);

  // pagination configuration
  const [pageNumber, setPageNumber] = useState(1);

  //deactivate or activate expense
  const [isConfirmationModelOpen, setIsConfirmationModelOpen] = useState(false);
  const [ selectedExpense , setSelectedExpense] = useState({});

  //for donut chart, pie chart or table exoense overview
  const [totalSpending , setTotalSpending] = useState(0);

  useEffect(() => {
    getCategories();
    getExpenses();
    getAllCategories();
  }, [])//eslint-disable-line

  useEffect(() => {
    let total = 0;
    expenseList.map(i => {//eslint-disable-line
      if (!i.deletedAt) total += i.amount;
    })
    setTotalSpending(total);

  },[expenseList ,categoryListForAllCategory])//eslint-disable-line

  useEffect(() => {
    if (pieChart) pieChart.destroy();
    if (doughnutChart) doughnutChart.destroy();
    if (userInfo && userInfo.totalBudget) {
      renderExpenseDoughnutChart();
    }

    if (categoryListForAllCategory.length < 6 && categoryListForAllCategory.length > 0 && expenseList.length > 0) {
      console.log({categoryListForAllCategory});
      renderExpensePieChart();
    }
  }, [totalSpending, categoryListForAllCategory])//eslint-disable-line

  async function getCategories () {
    let Response = await API.get(`/categories?userID=${userInfo._id}&activationStatus=active`);

    if (Response.data) {
      setCategoryList(Response.data);
    }
  }

  async function getAllCategories () {
    let Response = await API.get(`/categories?userID=${userInfo._id}`);

    if (Response.data) {
      setCategoryListForAllCategory(Response.data);
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
    let category = categoryListForAllCategory.filter(i => i._id === categoryID)[0];
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

  function getSpendingForCategory(categoryID) {
    let expenses = expenseList.filter( i => !i.deletedAt && i.categoryID === categoryID);
    if (expenses.length) {
      let total = 0;
      expenses.map(i => {//eslint-disable-line
        total += i.amount;
      })
      return total;
    } else {
      return 0;
    }
  }

  function getSpendingForCategoryPercentage(categoryID) {
    let expenses = expenseList.filter( i => !i.deletedAt && i.categoryID === categoryID);
    if (expenses.length) {
      let total = 0;
      expenses.map(i => {//eslint-disable-line
        total += i.amount;
      })
      return ((total/totalSpending) * 100).toFixed(2);
    } else {
      return 0;
    }
  }
  function renderExpenseDoughnutChart() {
    doughnutChart = new Chart(document.getElementById('expenseDoughnutChart'), {
      plugins:[
        {
          beforeDraw: (chart) => {
            const width = chart.chart.width;
            const height = chart.chart.height;
            const ctx = chart.chart.ctx;
            ctx.restore();
            let fontSize = (height / 125).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            let text = `${((userInfo.totalBudget - totalSpending) > 0) ? ((totalSpending/userInfo.totalBudget) * 100).toFixed() : 100} % Spent`,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }
      ],
      type: 'doughnut',
      data: {
          labels: ['Spent', 'Remaning'],
          datasets: [{
              data: [
                userInfo && userInfo.totalBudget && totalSpending >= 0 ? totalSpending : 0,
                totalSpending >= 0 && userInfo && userInfo.totalBudget && ((userInfo.totalBudget - totalSpending) > 0) ? userInfo.totalBudget - totalSpending : 0
              ],
              backgroundColor: [
                  'rgba(15, 115, 255, 1)',
                  'rgba(199, 254, 253, 1)'
              ],
              borderColor: [
                  'rgba(15, 115, 255, 1)',
                  'rgba(199, 254, 253, 1)'
              ],
          }]
      },
      options: {
        legend: {
          display: false
        },
        cutoutPercentage: 80,

      }
  });
  }

  function renderExpensePieChart() {

    let categoryName = [];
    let categoryWiseExpense = []
    categoryListForAllCategory.map( category => {//eslint-disable-line
      let total = 0;
      expenseList.map( expense => {//eslint-disable-line
        if (expense.categoryID === category._id && !expense.deletedAt) {
          total += expense.amount;
        }
      })
      categoryName.push(category.name);
      categoryWiseExpense.push(total)
    })

    const colors = [
      'rgba(15, 115, 255, 1)',
      'rgba(199, 254, 253, 1)',
      'rgba(255, 33, 33, 1)',
      'rgba(41, 255, 13, 1)',
      'rgba(233, 255, 36, 1)'
    ]

    pieChart = new Chart(document.getElementById('expensePieChart'), {
    type: 'pie',
    data: {
        labels: categoryName.reverse(),
        datasets: [{
            data: categoryWiseExpense.reverse(),
            backgroundColor: categoryName.map((i,j) => colors[j]),
            borderColor: categoryName.map((i,j) => colors[j]),
        }]
    },
    options: {
      legend: {
        position: 'right'
      }
    }
  });
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
              <Row>
              <Col xs={6}>
                {
                  userInfo && userInfo.totalBudget ?
                  <div className="expenseDoughnutChartDiv" >
                    <canvas id="expenseDoughnutChart" width="200" height="200"></canvas>
                  </div>
                  :
                  <div className="textCenter mt-5">
                    <p>Add total budget to see percentage spent.</p>
                  </div>
                }
              </Col>
              <Col xs={6}>
              <h5 className="textCenter pt-3 pr-3" > Total Budget </h5>
              <h6 className="textCenter pr-3" >₹ {userInfo && userInfo.totalBudget ? userInfo.totalBudget : ''}</h6>
              <h5 className="textCenter pr-3" > Total Expenses </h5>
              <h6 className="textCenter pr-3" >₹ {totalSpending ? totalSpending : 0}</h6>
              </Col>
              </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}>
            <Card className="chartCard">
              <Card.Header className="textCenter">Category wise split</Card.Header>
              <Card.Body>
              {
                categoryListForAllCategory.length > 5 ?
                <Table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Total Spending</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      categoryListForAllCategory.map ( (category , index) => (
                          <tr key={category._id}>
                          <td>{category.name}</td>
                          <td>{getSpendingForCategory(category._id)}</td>
                          <td>{getSpendingForCategoryPercentage(category._id)}</td>
                        </tr>
                      ))
                    }
                    </tbody>
                </Table>
                :
                categoryListForAllCategory.length > 0 ?

                    expenseList.length > 0 ?
                    <div className="expensePieChartDiv" >
                      <canvas id="expensePieChart"></canvas>
                    </div>
                    :
                    <div className="textCenter mt-5">
                      <p>Add Expenses to see category wise expenses.</p>
                    </div>
                :
                  <div className="textCenter mt-5">
                    <p>Add Category to see category wise spending.</p>
                  </div>
              }
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
        <Card className="expenseTable">
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
                  expenseList.length ?
                  expenseList.slice((pageNumber-1) *10 , ((pageNumber-1) *10) + 10).map( (expense,index) => (
                    <tr className={!expense.deletedAt ? '' : 'inactiveRow'} key={expense._id}>
                      <td className="buttonCell">
                        <Button
                          className="tableButton"
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
                      <td className="buttonCell">
                        <Button
                          className="tableButton"
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
                  :
                  <tr>
                    <td className="textCenter" colSpan="7" >Sorry ! No expense recode found.</td>
                  </tr>
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
            <Pagination.Item>{`Page ${pageNumber} of ${Math.ceil(expenseList.length/10)}`}</Pagination.Item>
            <Pagination.Next disabled={pageNumber === Math.ceil(expenseList.length/10)} onClick={() => setPageNumber(pageNumber + 1)}/>
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
