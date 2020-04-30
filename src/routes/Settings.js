import React from 'react';
import { Container , Row , Col , InputGroup , FormControl , Button, Card, Table} from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

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
`;

function Settings () {
  return  (
    <Styles className="example" >
      <Header/>
      <Sidebar/>
      <Container className="settings">
        <Row className="budget">
          <Col className="textCenter inputName" ><h5>Total Budget</h5></Col>
          <Col className="textCenter" >
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter your budget here"
                aria-label="Total Budget"
                aria-describedby="basic-addon1"
                type="number"
              />
            </InputGroup>
          </Col>
          <Col className="textCenter" ><Button className="button" variant="info">Update</Button></Col>
        </Row>
        <Row className="category" >
          <Col className="textCenter inputName" ><h5>Categories</h5></Col>
          <Col className="textCenter" >
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter category name"
                aria-label="Categories"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Col>
          <Col className="textCenter" ><Button className="button" variant="info">Add</Button></Col>
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
