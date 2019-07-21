import React from 'react'
import API from '../helpers/APILogin'
import config from '../configs/api.config.json'

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            formdata: {
                username: '',
                password: ''
            },
            isRequest: false
        }
        this.onSignIn = this.onSignIn.bind(this)
        this.textChanged = this.textChanged.bind(this)
    }
    textChanged(e) {
        let tmp = this.state.formdata
        tmp[e.target.name] = e.target.value
        //alert(JSON.stringify(tmp))
        this.setState({
            formdata: tmp
        })
    }
    async onSignIn() {
        
        this.setState({
            isRequest: true
        })
        
        let result = await API.login(this.state.formdata.username, this.state.formdata.password)
        
        if (result.code === 200) {
            
            localStorage.setItem(config.LS.USERDATA, JSON.stringify(result.message.userdata))
            localStorage.setItem(config.LS.TOKEN, result.message.token)
            this.props.history.push('/home')
        } else {
            alert(result.message)
        }
        
        this.setState({
            isRequest: false
        })
    }
    render() {
        return (
            <div class="login-box">
            <div class="login-logo">
              <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>
            {/* <!-- /.login-logo --> */}
            <div class="login-box-body">
              <p class="login-box-msg">Sign in to start your session</p>
          
              <form action="../../index2.html" method="post">
                <div class="form-group has-feedback">
                  <input type="text" class="form-control" placeholder="username"  name="username" required="" autofocus="" value={this.state.username} onChange={this.textChanged}/>
                  <span class="fa fa-user form-control-feedback"></span>
                </div>
                <div class="form-group has-feedback">
                  <input type="password" class="form-control" placeholder="Password" name="password" required="" value={this.state.password} onChange={this.textChanged}/>
                  <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <div class="row">
                  <div class="col-xs-8">
                    <div class="checkbox icheck">
                      <label>
                        <input type="checkbox"/> Remember Me
                      </label>
                    </div>
                  </div>
                  {/* <!-- /.col --> */}
                  <div class="col-xs-4">
                    <button type="submit" class="btn btn-primary btn-block btn-flat" disabled={this.isRequest} type="button" onClick={this.onSignIn}>Sign In</button>
                  </div>
                  {/* <!-- /.col --> */}
                </div>
              </form>
          
              <a href="#">I forgot my password</a><br/>
              <a href="register.html" class="text-center">Register a new membership</a>
          
            </div>
            {/* <!-- /.login-box-body --> */}
          </div>
          
            

            )
        }
    }
    
    export default Login