import React from 'react'
import { Link } from 'react-router-dom'


class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    onSignOut() {

        localStorage.clear();
        // this.props.history.push('/')

    }
    render() {
        return (
            <header class="main-header">

                <a href="/home" class="logo">

                    <span class="logo-mini"><b>B</b>201</span>

                    <span class="logo-lg"><b>BATCH</b>201</span>
                </a>

                <nav class="navbar navbar-static-top">

                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">                         
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image" />
                                    <span class="hidden-xs">Muhammad Farhan</span>
                                </a>
                                <ul class="dropdown-menu">

                                    <li class="user-header">
                                        <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image" />

                                        <p>

                                            <small>Member since Nov. 2012</small>
                                        </p>
                                    </li>


                                    <li class="user-footer">
                                        <div class="pull-left">
                                            <a href="#" class="btn btn-default btn-flat">Profile</a>
                                        </div>
                                        <div class="pull-right">
                                        <a href="/" class="btn btn-default btn-flat" onClick={this.onSignOut.bind(this)}>Sign out</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
