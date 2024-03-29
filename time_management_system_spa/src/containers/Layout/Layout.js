import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import * as router from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Container, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import BootstrapReduxAlert from 'components/BootstrapReduxAlert'
import BootstrapReduxModal from 'components/BootstrapReduxModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import store from 'store'
//import { INIT_PROJECT } from 'actions/apps'
import actions from 'actions'

import Dashboard from '../Dashboard'
import Settings from '../Settings'
import TimeEntries from '../TimeEntries'
import Users from '../Users'
import Invitations from '../Invitations'

const Aside = React.lazy(() => import('./Aside'));
const Footer = React.lazy(() => import('./Footer'));
const Header = React.lazy(() => import('./Header'));


class Layout extends Component {
  //constructor(props) {
  //  super(props)
    // call if loading data from local storage at refresh, exmple JWT
    //store.dispatch({type: INIT_PROJECT, payload: {sku: ""}});
  //}



  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    localStorage.setItem('access-token', '')
    localStorage.removeItem('currentUserId')
    store.dispatch({type: actions.profile.types.UPDATE, payload: { profile: {}} });
    this.setState({}); // force rerender
  }

  render() {
    if(!localStorage.getItem('access-token') && this.props.profile.id == null){
      return <Redirect to='/login' />
    }
    // build sidebar menu depending on permissions
    let navigation = {
      items: []
    }
    navigation.items.push({
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    })

    console.log(this.props)
    
    if(this.props.profile.id != null){
      let profile = this.props.profile
      if(profile.permissions["TimeEntry.show?"]){
        navigation.items.push({
          name: 'Time Entries',
          url: '/time_entries',
          icon: 'icon-hourglass',
        })
      }
      if(profile.permissions["User.show?"]){
        navigation.items.push({
          name: 'Users',
          url: '/users',
          icon: 'icon-user',
        })
      }
      if(profile.permissions["Invitation.show?"]){
        navigation.items.push({
          name: 'Invitations',
          url: '/invitations',
          icon: 'icon-paper-plane',
        })
      }    }
    navigation.items.push({
      name: 'Settings',
      url: '/settings',
      icon: 'icon-wrench',
    })

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <Header onLogout={e=>this.signOut(e)} fullName={ this.props.profile.first_name + " " + this.props.profile.last_name }/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <BootstrapReduxAlert />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop
              closeOnClick={false}
              rtl
              pauseOnVisibilityChange
              draggable={false}
              pauseOnHover
             />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  <Route exact path="/dashboard" name="Dashboard" render={props => <Dashboard {...props} />} />
                  <Route path="/users" name="Users" render={props => <Users {...props} />} />
                  <Route path="/time_entries" name="Time Entries" render={props => <TimeEntries {...props} />} />
                  <Route path="/invitations" name="Invitations" render={props => <Invitations {...props} />} />
                  <Route path="/settings" name="Settings" render={props => <Settings {...props} />} />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <Aside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <Footer />
          </Suspense>
        </AppFooter>
        <BootstrapReduxModal store={store}/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {profile: state.profile}
}
export default withRouter(connect(mapStateToProps)(Layout));
