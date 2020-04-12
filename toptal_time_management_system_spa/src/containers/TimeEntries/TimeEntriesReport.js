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
      <div className="animated fadeIn" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}} >
        <Row>
          <Col lg="12" >
            <Card>
              <CardBody>
              <h1 className="text-center">Time Entry</h1>
                <Row>
                  <div className="col-lg-6"><h2>User : { this.props.user.first_name + " " + this.props.user.last_name }</h2></div>
                  <div className="col-lg-6"><h2>Period : {this.props.startDate.format("YYYY-MM-DD")} to {this.props.endDate.format("YYYY-MM-DD")}</h2></div>       
                </Row>

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

                    let backgroundColor = 'rgba(255, 255, 255, 0.9)' //default
                    if(this.props.user.settings.preferred_working_hours_per_day_enabled && 
                      time_entry.totalTime > this.props.user.settings.preferred_working_hours_per_day * 3600){
                      backgroundColor = 'rgba(63, 195, 128, 0.9)' //green
                    } else if (this.props.user.settings.preferred_working_hours_per_day_enabled){
                      backgroundColor = 'rgba(248, 108, 107, 0.9)' //red
                    }

                    return (
                      <tr key={index} style={{backgroundColor: backgroundColor}}>
                        <td>{time_entry.date}</td>
                        <td>{secondsToString(time_entry.totalTime) }</td>
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
