import React, { Component, lazy, Suspense } from 'react';
import {
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import store from 'store'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import actions from 'actions'
import DataTable from 'react-data-table-component';
import TimeEntry from './TimeEntry'
import { exportReportToHtml, secondsToString } from './utils'
import { SHOW_BOOTSTRAP_REDUX_MODAL } from 'components/BootstrapReduxModal/actions'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';


const columns = [
  {
    name: 'Id',
    selector: 'id',
    sortable: true,
    omit: true
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
    maxWidth: "20%"
  },
  {
    name: 'Total Time',
    selector: 'totalTime',
    sortable: true,
    format: (obj) => {return(secondsToString(obj.totalTime))} ,
    maxWidth: "20%"
  },
  {
    name: 'Notes',
    selector: 'notes',
    sortable: true,
  },
];
const customStyles = {
  rows: {
    style: {
      minHeight: '35px', // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};


class TimeEntries extends Component {

  state = {
    
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    store.dispatch({type: actions.time_entries.types.ALL, payload: {}});
  }

  updateDates = (focusedInput) => {
    console.log("updatingDates")
    this.setState({ focusedInput })
  }

  render() {
    let preferred_working_hours_per_day = null;
    if (this.props.profile != null && this.props.profile.settings != null  ){
      preferred_working_hours_per_day = this.props.profile.settings.preferred_working_hours_per_day
    }
    const conditionalRowStyles = [

      {
        when: row => preferred_working_hours_per_day != null && row.totalTime > preferred_working_hours_per_day,
        style: {
          backgroundColor: 'rgba(63, 195, 128, 0.9)',
          color: 'black',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        when: row => preferred_working_hours_per_day != null && row.totalTime <= preferred_working_hours_per_day,
        style: {
          backgroundColor: 'rgba(248, 148, 6, 0.9)',
          color: 'black',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        when: row => preferred_working_hours_per_day == null,
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: 'black',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
    ];

    return (
      <Card>
        <CardHeader>
          <div className="row">
            <div className="col-md-8">
              <h2>Time Entries</h2>
            </div>
            <div className="col-md-4 float-right">
              <Button color="primary" className="float-right" onClick={() => exportReportToHtml(this.props.aggregated_time_entries, this.props.profile)}>
                <i className="fa fa-download" aria-hidden="true"> HTML Export</i>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
            <DateRangePicker
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              startDateId="2019-01-31" // PropTypes.string.isRequired,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={this.updateDates} // PropTypes.func.isRequired,
              enableOutsideDays={true}
            />
          <div id="times-entries-parent-holder">
            
            <DataTable
              title=""
              columns={columns}
              data={this.props.aggregated_time_entries}
              expandableRows
              expandableRowsComponent={<TimeEntry />}
              conditionalRowStyles={conditionalRowStyles}
              expandableInheritConditionalStyles={true}
              expandOnRowClicked={true}
              customStyles={customStyles}
            />
          </div>
        </CardBody>
      </Card>


    )
  }
}

const mapStateToProps = state => {
  let time_entries = []
  let aggregated_time_entries = []
  if(state.time_entries != null && state.time_entries.time_entries != null){
    time_entries = state.time_entries.time_entries
  }
  if(state.time_entries != null && state.time_entries.aggregated_time_entries != null){
    aggregated_time_entries = Object.values(state.time_entries.aggregated_time_entries)
  }
  return {profile: state.profile, time_entries: time_entries, aggregated_time_entries: aggregated_time_entries}
}
export default withRouter(connect(mapStateToProps)(TimeEntries));
