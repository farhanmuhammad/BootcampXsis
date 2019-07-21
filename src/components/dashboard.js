import React from 'react'
//import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Sidebar from './Sidebar'
import home from './content/home'
import mahasiswa from './content/mahasiswa/mahasiswa'
import user from './content/user/user'
import { Switch, Route} from 'react-router-dom'
import apiconfig from '../configs/api.config.json'
import { Redirect } from 'react-router';
//import Login from './Login'
// import DashboardSwitcher from './DashboardSwitcher'

class Dashboard extends React.Component {
    render() {
        return (
            <div class="wrapper">
                <Header />
                <Sidebar />
                <div class="content-wrapper">
                    <Switch >
                        <PrivateRoute exact path='/home' component={home} />
                        <PrivateRoute exact path='/mahasiswa' component={mahasiswa}/>
                        <PrivateRoute exact path='/user' component={user}/>
                    </Switch>
                </div>
                <footer class="main-footer">
                    <div class="pull-right hidden-xs">
                        <b>Version</b> 2.4.13
                    </div>
                    <strong>Copyright &copy; 2019 <a href="https://adminlte.io">AdminLTE</a>.</strong> All rights
                    reserved.
                </footer>
            </div>
        )
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem(apiconfig.LS.TOKEN) != null ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);


export default Dashboard