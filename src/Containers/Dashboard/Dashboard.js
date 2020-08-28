import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Login from '../Login/Login';
import Layout from '../Layout/Layout';

class Dashboard extends Component {
    render() {
        const isLogin = localStorage.getItem('userid');

        if (!isLogin) {
            return (<Login />);
        }

        return(
            <Layout>
                <Container maxWidth="md">
                    <h2>Welcome to Shree Nagari Society...!</h2>
                </Container>
            </Layout>
        )
    }
}

export default Dashboard;