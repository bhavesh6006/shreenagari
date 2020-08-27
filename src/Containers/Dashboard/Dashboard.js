import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Login from '../Login/Login';

class Dashboard extends Component {
    render() {
        const isLogin = localStorage.getItem('isLogin');

        if (!isLogin) {
            return (<Login />);
        }

        return(
            <Container maxWidth="md">
                <h2>Welcome to Shree Nagari Society...!</h2>
            </Container>
        )
    }
}

export default Dashboard;