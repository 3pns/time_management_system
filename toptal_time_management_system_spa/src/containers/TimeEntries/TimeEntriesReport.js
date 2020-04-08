import React, { Component, lazy, Suspense } from 'react';
import {
  ListGroupItem
} from 'reactstrap';
import store from 'store'
import actions from 'actions'
import ReactDataGrid from 'react-data-grid';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { secondsToString } from './utils'

class TimeEntriesReport extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="12" >
            <Card>
              <CardBody>
              <h2>Time Entry report of { this.props.user.first_name + " " + this.props.user.last_name }</h2>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Date</th>
                    <th>Total Time</th>
                    <th>Notes</th>
                  </tr>
                  </thead>
                  <tbody>
                  { this.props.time_entries.each }
                  { this.props.time_entries != null && this.props.time_entries.map((time_entry, index) => {
                    return (
                      <tr key={index}>
                        <td>{time_entry.date}</td>
                        <td>{secondsToString(time_entry) }</td>
                        <td>
                          { time_entry.notes != null && time_entry.notes.map((note, i) => {
                            return (
                               <span key={i}>{note + " "}</span> 
                            )
                          })}
                        </td>
                      </tr>
                    )
                  })}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}


export default TimeEntriesReport;
