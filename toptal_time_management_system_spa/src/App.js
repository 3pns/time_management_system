import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Route, Switch, Redirect } from 'react-router-dom';
// import history from 'services/utils/history'
import { connect } from 'react-redux';
import './App.scss';
import { Layout } from 'containers';
import actions from 'actions';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
// const DefaultReactHomePage = React.lazy(() => import('./containers/DefaultReactHomePage'))

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const anonymous_user_allowed_paths = ['/login', '/register']

class App extends Component {

  render() {
    let isAuthenticated = this.props.profile != null ? true : false

    console.log(isAuthenticated)
    console.log(this.props.profile.authenticated)

    if(!this.props.profile.authenticated && !anonymous_user_allowed_paths.includes(this.props.location.pathname)) {
      return <Redirect to='/login' />
    } else if (this.props.profile.authenticated && anonymous_user_allowed_paths.includes(this.props.location.pathname) ){
      return <Redirect to='/' />
    }
    return (
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} submit={actions.profile.login} /> } />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} submit={actions.profile.create} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
            <Route path="/" name="Home" render={props => <Layout {...props}/>} />
          </Switch>
        </React.Suspense>
    );
  }
}


const mapStateToProps = state => {
  return {profile: state.profile}
}
export default withRouter(connect(mapStateToProps)(App));

