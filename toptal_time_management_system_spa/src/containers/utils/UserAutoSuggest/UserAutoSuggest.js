import React, { Component, lazy, Suspense } from 'react';
import store from 'store'
import Autosuggest from 'react-autosuggest';
import actions from 'actions'

function getSuggestionValue(suggestion) {
  return suggestion.first_name + " " + suggestion.last_name + " (" + suggestion.email + ")";
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.first_name + " " + suggestion.last_name + " (" + suggestion.email + ")" }</span>
  );
}

class UserAutoSuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      searchValue: '',
      suggestions: [],
      selectedUserId: 0
    };
  }

  onSuggestionsFetchRequested = ({ value }) => {
    store.dispatch({type: actions.users.types.ALL, payload: {search_by_fields: value, items: 10}});
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    if (method === 'enter') {
      event.preventDefault();
    }
    this.state.selectedUserId = suggestion.id
    this.props.onRefresh(suggestion.id, suggestionValue)
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      searchValue: newValue
    });
    this.props.onRefresh(this.state.selectedUserId, newValue)
  };

  render() {
    const { searchValue, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for a user",
      value: searchValue,
      onChange: this.onChange
    };
    return (
      <Autosuggest 
        suggestions={this.props.data}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        defaultShouldRenderSuggestions={false}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
        style={ this.props.customStyle ? this.props.customStyle : {} }
        onRefresh={this.props.onRefresh}
      />
      )
  }
}

export default UserAutoSuggest
