import React, { Component, lazy, Suspense } from 'react';
import {
  ListGroupItem,
  Button
} from 'reactstrap';
import store from 'store'
import actions from 'actions'
import DataGrid from 'react-data-grid';
import { secondsToString } from './utils'
import { put, takeEvery, all } from 'redux-saga/effects'
import { SHOW_BOOTSTRAP_REDUX_MODAL } from 'components/BootstrapReduxModal/actions'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

const durationFormatter = (obj) => {
  console.log(obj)
  return (

    <span>{secondsToString(obj.row.duration)}</span>
  )
}

const deleteTimeEntryModel = (obj) => {
  console.log(obj.row.id)
  let modalConfig = {
    hidden: false,
    color: "danger",
    description: "Are you sure you want to delete this item ?",
    currentActionType: actions.time_entries.types.DELETE,
    currentActionparams: {id: obj.row.id}
    
  }
  store.dispatch({ type: SHOW_BOOTSTRAP_REDUX_MODAL , payload: modalConfig  })
}

const actionFormatter = (obj) => {
  console.log(obj)
  return (
    <Button className="btn btn-danger" style={{lineHeight: "8px"}} onClick={() => {deleteTimeEntryModel(obj)}}>X</Button>
  )
}
const columns = [
  
  { key: 'date', name: 'Date' },
  { key: 'duration', name: 'Duration', editable: true, formatter: durationFormatter },
  { key: 'note', name: 'Note', editable: true },
  { key: 'id', name: 'ID', formatter: actionFormatter},
];

class TimeEntry extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { rows: props.data.time_entries };
  }

  state = {
    rows: []
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  patcha = (a,b) => {
    console.log("ADDD")
    //console.log(obj)
  }

  onGridRowsUpdated = obj => {
    console.log(obj);
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.data != null && nextProps.data.time_entries != null) {
      let rows = nextProps.data.time_entries
      this.setState({
        rows: rows
      });
    }
    
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    console.log(this.state.rows.length)
    console.log(columns)
    console.log(this.state.rows)
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <Table responsive className="table table-responsive-sm table-bordered">
            </Table>
            <thead>
            <tr>
              <th>Username</th>
              <th>Date registered</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
            </thead>
            <tr>
              <td>Samppa Nori</td>
              <td>Samppa Nori</td>
              <td>Samppa Nori</td>
              <td>Samppa Nori</td>
            </tr>
          </CardBody>
        </Card>
        {
          

        }
        {// <DataGrid
        //   columns={columns}
        //   rowGetter={i => this.state.rows[i]}
        //   rows={this.state.rows}
        //   rowsCount={this.state.rows.length - 1}
        //   minHeight={0}
        //   // headerFiltersHeight={0}
        //   headerRowHeight={0}
        //   // minWidth={20}
        //   // onGridRowsUpdated={this.onGridRowsUpdated}
        // />
      }
      </React.Fragment>
    )
  }
}


export default TimeEntry;
