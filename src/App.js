import React from 'react';
import { Switch, Route} from 'react-router-dom'
import Login from './components/Login'
// import home from './components/content/home'
import Dashboard from './components/dashboard'
import apiconfig from './configs/api.config.json'

class App extends React.Component{
    render()
    {
        
        return (
            <Switch>
                <Route exact path='/' render={() => (
                localStorage.getItem(apiconfig.LS.TOKEN)==null ? ( //jika token = nulll
                        <Route exact path='/' component={Login} /> // maka ke path login
                    ) : (       
                    <Dashboard/>                        // jika tidak nykk naja ke Dashboard
                    )
                    )} /> 
                    <Dashboard/>
            </Switch>
            )
        }
    }
    
    export default App;