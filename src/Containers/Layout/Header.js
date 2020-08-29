import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
    Grid,
    Avatar,
    Popover,
    Button,
    Typography
} from '@material-ui/core';

const style = {
    root: {
        flexGrow: 1,
    },
    img: {
        height: '3.8rem',
        float: 'left',
        marginLeft: '-20px'
    },
    header: {
        backgroundColor: '#fff',
        boxShadow: '0 1px 15px 1px rgba(69, 65, 78, 0.1)',
        zIndex: '10'
    },
    redColor: {
        color: 'red',
        fontWeight: "bold",
        fontSize: '11px'
    },
    normalColor: {
        color: "black",
        fontSize: "7px"
    },
    societyNameContainer: {
        float: 'left',
        width: '86%'
    }
};

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorElForProfile: null
        };
    }

    handleClick = (event) => {
        this.setState({ anchorElForProfile: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorElForProfile: null });
    };

    logoutHandler = () => {
        localStorage.clear();
        window.location.reload();
    }

    render() {
        const { classes } = this.props;
        const { anchorElForProfile } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.header}>
                    <Toolbar className='header'>
                        <Grid className='header-wrapper' item xs={12}>
                            <div className={classes.societyNameContainer}>
                                <Typography className={classes.redColor}>
                                    SHREE NAGARI CO-OP. HOUSING SOCIETY PVT. LTD.
                                </Typography>

                                <Typography className={classes.normalColor}>
                                    Sr. No. 24 / 8 & 24 / 8 / 2, Road No. 7, Munjaba Vasti, Dhanori, Pune - 411015.
                                </Typography>

                                <Typography className={classes.normalColor}>
                                    Reg. No.: PNA / PNA(5) / HSG(TC) / 16236 / 2014 - 2015
                                </Typography>
                            </div>
                            <Avatar className="header-profile-icon" onClick={(e) => this.handleClick(e)}></Avatar>

                            <Popover
                                open={Boolean(anchorElForProfile)}
                                anchorEl={anchorElForProfile}
                                onClose={() => this.handleClose()}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                className='NotificationPopover'
                            //open={true}

                            >
                                <div className='logout-container'>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="button"
                                        onClick={() => this.logoutHandler()}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </Popover>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(style)(Header);