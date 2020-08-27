import React, { Component } from 'react';
import {
    Grid,
    TextField,
    CircularProgress,
    Box,
    Button,
    Link,
    Paper,
    Typography
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../../assets/images/logo.jpg';

const style = {
    "loginContainer": {
        'position': 'absolute',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'justifyContent': 'center',
        'alignItems': 'center',
        'display': 'flex'
    },
    "paper": {
        padding: '15px 10px 15px 10px',
        boxShadow: '1px 1px 5px 4px #dedede'
    },
    "loginButton": {
        width: "100%"
    }
};

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errors: {
                username: {
                    isError: false,
                    errorMessage: "Field is mandatory"
                },
                password: {
                    isError: false,
                    errorMessage: "Field is mandatory"
                }
            }
        };
    }

    render() {
        const {
            username,
            password,
            errors
        } = _.cloneDeep(this.state);
        const { classes } = this.props;

        return (
            <Container maxWidth="sm" className={classes.loginContainer}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <img src={Logo} alt={Logo} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="User Name"
                                variant="outlined"
                                size="small"
                                required
                                name='username'
                                value={username}
                                onChange={(e) => this.handleChange(e, "username")}
                                className='text-field'
                                helperText={errors['username'].isError ? errors['username'].errorMessage : ""}
                                error={errors['username'].isError}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                size="small"
                                required
                                name='password'
                                value={username}
                                onChange={(e) => this.handleChange(e, "password")}
                                className='text-field'
                                helperText={errors['password'].isError ? errors['password'].errorMessage : ""}
                                error={errors['password'].isError}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                className={classes.loginButton}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}

export default withStyles(style)(Login);