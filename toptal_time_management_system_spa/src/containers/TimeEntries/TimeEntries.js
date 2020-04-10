import React, { Component, lazy, Suspense } from 'react';
import {
  ListGroupItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  Row
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

const users_array = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    id: 1
  },
  {
    first_name: 'Johnny',
    last_name: 'Doe',
    email: 'john@example.com',
    id: 2
  },
];



function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}



function getSuggestionValue(suggestion) {
  return suggestion.first_name + " " + suggestion.last_name + " (" + suggestion.email + ")";
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.first_name + " " + suggestion.last_name + " (" + suggestion.email + ")" }</span>
  );
}

class TimeEntries extends Component {


  constructor(props) {
    super(props);
    // Don't call this.setState() here!
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

  onChange = (event, { newValue, method }) => {
    this.setState({
      searchValue: newValue
    });
    this.refresh()
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    store.dispatch({type: actions.users.types.ALL, payload: {search_by_fields: value, items: 10}});
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.state.selectedUserId = suggestion.id
    this.refresh()
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

    const { searchValue, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for a user",
      value: searchValue,
      onChange: this.onChange
    };
    console.log(inputProps)
    if (this.state.selectedUserId == null && this.props.profile.id != null){
      this.state.selectedUserId = this.props.profile.id
      this.refresh()
    }
    console.log(this.props)
    console.log(this.state)

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
          <Row>
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
              <Autosuggest 
                suggestions={this.props.users.users}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={this.onSuggestionSelected}
                style={{height: "130px"}}
              />
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
  console.log(state.profile)
  return {profile: state.profile, time_entries: time_entries, aggregated_time_entries: aggregated_time_entries, users: state.users, user: state.user}
}
export default withRouter(connect(mapStateToProps)(TimeEntries));
