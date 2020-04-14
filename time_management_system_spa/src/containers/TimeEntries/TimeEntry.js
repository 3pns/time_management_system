import React, { Component, lazy, Suspense } from 'react';
import ReactDOM from "react-dom";
import {
  ListGroupItem,
  Button
} from 'reactstrap';
import store from 'store'
import actions from 'actions'
import DataGrid from 'react-data-grid';
import { secondsToString, stringToSeconds } from './utils'
import { put, takeEvery, all } from 'redux-saga/effects'
import { SHOW_BOOTSTRAP_REDUX_MODAL } from 'components/BootstrapReduxModal/actions'
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import moment from 'moment'
import DurationEditor from './DurationEditor'
import { toast } from 'services/utils'

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
  
  { key: 'duration', name: 'Duration', editable: true, formatter: durationFormatter, width: "20%", editor: DurationEditor  },
  { key: 'note', name: 'Note', editable: true, width: "60%"},
  { key: 'id', name: 'ID', width: "20%", formatter: actionFormatter},
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

  onGridRowsUpdated = obj => {
    let i = obj.fromRow
    let time_entry = this.props.data.time_entries[i]
    if(obj.updated.note != null){
      time_entry.note = obj.updated.note
    }
    if(obj.updated.duration != null){
      let newDuration = obj.updated.duration
      let previousDuration = time_entry.duration
      if (newDuration < 0){
        newDuration = 0
      }
      let maxValue = 86400 - (this.props.data.totalTime - previousDuration)
      if (newDuration > maxValue) {
        newDuration = maxValue
        toast("warning", "Oops, there are only 24 hours in a day, we had to adjust your time entry")
      }
      time_entry.duration = newDuration
    }
    if(obj.updated.note != null || obj.updated.duration != null){
      console.log(this.state)
      console.log(this.props)
      store.dispatch({ type: actions.time_entries.types.PATCH , payload: {data: {time_entry: time_entry}, id:time_entry.id }  })
    }
  };

  componentDidMount() {
    // fix react data table element that is not configurable
    let theBadOne = document.getElementsByClassName('jEDPQU')[0]
    theBadOne.style.cssText = "width: 100% !important; display: flex !important;"; 
  }


  render() {
    let rows = []
    if(this.props.data.time_entries != null){
      rows = this.props.data.time_entries
    }
    return (
      <React.Fragment>
        { <DataGrid
          columns={columns}
          rowGetter={i => rows[i]}
          rows={rows}
          rowsCount={rows.length}
          minHeight={20}
          // height={"100%"}
          // headerFiltersHeight={0}
          headerRowHeight={0}
          // minWidth={20}
          resizable={false}
          onGridRowsUpdated={this.onGridRowsUpdated}
          // onSelectedRowsChange={this.onGridRowsUpdated}
          onRowsUpdate={this.onGridRowsUpdated}
          enableCellSelect={true}
        />}

      </React.Fragment>
    )
  }
}


export default TimeEntry;
