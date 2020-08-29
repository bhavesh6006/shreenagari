import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Login from '../Login/Login';
import Layout from '../Layout/Layout';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HouseIcon from '@material-ui/icons/House';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EventIcon from '@material-ui/icons/Event';
import _ from 'lodash';
import FlatDetails from '../FlatDetails/FlatDetails';

const style = {
    tabpanel: {
        width: '98%',
        backgroundColor: '#fefefe',
        padding: '10px'
    }
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <React.Fragment>{children}</React.Fragment>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
    }

    handleChange = (event, newValue) => {
        if (newValue !== 4) {
            this.setState({ value: newValue });
        }
    };

    render() {
        const { classes } = this.props;
        const {
            value
        } = _.cloneDeep(this.state);
        const isLogin = localStorage.getItem('userid');

        if (!isLogin) {
            return (<Login />);
        }

        return(
            <Layout>
                <Container maxWidth="md" className="dashbord-container">
                    <AppBar position="static" color="default" className='app-bar-header'>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="scrollable force tabs example"
                            className='landing-tabs'
                        >
                            <Tab label="Flats" icon={<HouseIcon />} {...a11yProps(0)} />
                            <Tab label="Maintenance" icon={<HomeWorkIcon />} {...a11yProps(1)} />
                            <Tab label="Expenses" icon={<AccountBalanceWalletIcon />} {...a11yProps(2)} />
                            <Tab label="Festivals" icon={<EventIcon />} {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    
                    <TabPanel value={value} index={0} className={classes.tabpanel + ' tab-panel' }>
                        <FlatDetails />
                    </TabPanel>

                    <TabPanel value={value} index={1} className={classes.tabpanel + ' tab-panel'}>
                        <h2>Comming soon....!</h2>
                    </TabPanel>

                    <TabPanel value={value} index={2} className={classes.tabpanel + ' tab-panel'}>
                        <h2>Comming soon....!</h2>
                    </TabPanel>

                    <TabPanel value={value} index={3} className={classes.tabpanel + ' tab-panel'}>
                        <h2>Comming soon....!</h2>
                    </TabPanel>
                </Container>
            </Layout>
        )
    }
}

export default withStyles(style)(Dashboard);