import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import BootstrapReduxAlert from 'components/BootstrapReduxAlert'
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
    //this.props.history.push('/login')
    store.dispatch({type: actions.profile.types.LOGOUT, payload: {id: ""}});
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <Header onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <BootstrapReduxAlert />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  <Route exact path="/dashboard" name="Dashboard" render={props => <Dashboard {...props}/>} />
                  <Route exact path="/users" name="Users" render={props => <Users {...props}/>} />
                  <Route exact path="/time_entries" name="Time Entries" render={props => <TimeEntries {...props}/>} />
                  <Route exact path="/settings" name="Settings" render={props => <Settings {...props}/>} />
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
      </div>
    );
  }
}

export default Layout;