import 'babel-polyfill';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { orange500, deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Authentication from 'utils/authHelper';
import { Route, Switch } from 'react-router';
import { ConnectedRouter as Router } from 'connected-react-router';
import Login from 'containers/login/login';
import Home from 'containers/home/home';

const muiTheme = getMuiTheme({
    palette: {
        primaryColor: orange500,
        accent2Color: deepOrange500
    }
});

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.store = context.store;
        let useLogin = this.store.getState().login.useLogin;

        if (useLogin === true) {
            Authentication.isAuthenticated()
                .then((authenticated) => {
                    if (authenticated) {
                        this.props.history.push('/home');
                    } else {
                        this.props.history.push('/login');
                    }
                });
        } else {
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={this.props.history}>
                    <div>
                        {/*<div className="progress-linear indeterminate global-loader" />*/}
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/home" component={Home} />
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

App.contextTypes = {
    store: PropTypes.object
};

App.propTypes = {
    history: PropTypes.object
};

export default App;
