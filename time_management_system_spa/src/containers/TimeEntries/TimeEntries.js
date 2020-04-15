import React, { Component, lazy, Suspense } from 'react';
import {
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row, 
  Input, 
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
import moment from 'moment'
import Autosuggest from 'react-autosuggest';
import { has_role } from 'services/utils'
import TimeEntryForm from './TimeEntryForm'
import { LineDivider } from 'views'
import { UserAutoSuggest } from 'containers/utils'

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

const falseFunc = ()=>false;

class TimeEntries extends Component {
  constructor(props) {
    super(props);
    let startDate = moment().subtract(7,'d')
    let endDate = moment()
    this.state = {
      startDate: startDate,
      endDate: endDate,
      focusedInput: null,
      searchValue: '',
      suggestions: [],
      selectedUserId: 0
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillMount() {
    this.state.selectedUserId =  this.props.profile.id
    console.log(this.state.selectedUserId)
    console.log(this.props)
    this.refresh()
  }

  onDatesChange = (dates) => {
    this.setState({ startDate: dates.startDate, endDate: dates.endDate }, () => this.refresh());
  }

  onFocusChange = (focusedInput) => {
    if(focusedInput == "startDate"){
      this.setState({ focusedInput: focusedInput, endDate: null, startDate: null })
    } else if (focusedInput == "endDate"){
      this.setState({ focusedInput: focusedInput, endDate: null })
    } else {
      this.setState({ focusedInput})
    }
    
  }

  refresh = () => {
    let payload = {}
    payload.q = {}
    if (this.state.startDate != null){
      payload.q.date_gteq = this.state.startDate.format('YYYY-MM-DD')
    }
    if (this.state.endDate != null){
      payload.q.date_lteq = this.state.endDate.format('YYYY-MM-DD')
    }
    payload.q.user_id_eq = this.state.selectedUserId
    if (this.state.startDate != null && this.state.endDate != null){
      store.dispatch({type: actions.time_entries.types.ALL, payload: payload});
    }
  }

  onUserSearchRefresh = (userId, newValue) => {
    if(userId > 0){
      store.dispatch({type: actions.users.types.GET, payload: {id: userId, updateItem: true}});
      this.state.selectedUserId = userId
      this.refresh()
    }

  }

  onExportButtonClick = () => {
    if(moment.isMoment(this.state.startDate) && moment.isMoment(this.state.endDate) ){
      exportReportToHtml(this.props.aggregated_time_entries, this.props.profile, this.state.startDate, this.state.endDate)
    } else { 
      let modalConfig = {
        hidden: false,
        color: "info",
        description: "Please select a start date and end date before exporting the document.",
        currentActionType: null,
        currentActionparams: null
      }
      store.dispatch({ type: SHOW_BOOTSTRAP_REDUX_MODAL , payload: modalConfig  })
    }
  }

  render() {
    let pwhpd = null; // preferred_working_hours_per_day
    let pwhpd_enabled = false; // preferred_working_hours_per_day_enabled
    if (this.props.profile != null && this.props.profile.settings != null  ){
      pwhpd = this.props.profile.settings.preferred_working_hours_per_day
      pwhpd_enabled = this.props.profile.settings.preferred_working_hours_per_day_enabled
    }
    const conditionalRowStyles = [

      {
        // green
        when: row => pwhpd_enabled && pwhpd != null && row.totalTime >= pwhpd * 3600,
        style: {
          backgroundColor: 'rgba(63, 195, 128, 0.9)',
          color: 'black',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        // red
        when: row => pwhpd_enabled && pwhpd != null && row.totalTime < pwhpd * 3600,
        style: {
          backgroundColor: 'rgba(248, 108, 107, 0.9)',
          color: 'black',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        when: row => pwhpd == null,
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: 'black',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
    ];

    if (this.state.selectedUserId == null && this.props.profile.id != null){
      this.state.selectedUserId = this.props.profile.id
      this.refresh()
    }

    const isAllowedOtherUsersTimeEntries = false

    console.log(this.props)
    return (
      <Card>
        <CardHeader>
          <div className="row">
            <div className="col-md-8">
              <h2>Time Entries</h2>
            </div>
            <div className="col-md-4 float-right">
              <Button color="primary" className="float-right" onClick={this.onExportButtonClick}>
                <i className="fa fa-download" aria-hidden="true"> HTML Export</i>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Row className="form-group">
            <TimeEntryForm userId={this.state.selectedUserId} />
          </Row>
          <LineDivider marginTop={"0rem"}/>
          <Row className="form-group">
            <div className="col-md-6">
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id"
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id"
                onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                enableOutsideDays={true}
                minimumNights={0}
                isOutsideRange={falseFunc}
                
              />
            </div>
            <div className="col-md-6">
              {(has_role("manager") || has_role("admin")) && 
                <UserAutoSuggest 
                  customStyle={{height: "130px"}} 
                  data={this.props.users.users} 
                  onRefresh={this.onUserSearchRefresh} 
                />
               }

            </div>
          </Row>
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
              responsive = {false}
              keyField={"date"}
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
  console.log(state)
  return {profile: state.profile, time_entries: time_entries, aggregated_time_entries: aggregated_time_entries, users: state.users, user: state.users.user}
}
export default withRouter(connect(mapStateToProps)(TimeEntries));
