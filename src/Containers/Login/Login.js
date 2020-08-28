import React, { Component } from 'react';
import {
    Grid,
    TextField,
    CircularProgress,
    Box,
    Button,
    Paper
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Logo from '../../assets/images/logo.jpg';
import LoginDetails from '../../JSONFiles/login.json';
import Snackbar from '../../Components/Snackbar/Snackbar';

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
            },
            isLoginButtonDisabled: true,
            showLoginErrorMessage: false,
            loginErrorMessage: "User Name or Password is invalid.",
            showLoader: false
        };
    }

    componentDidMount() {
        console.log('LoginDetails: ', LoginDetails);
    }

    handleChange = async (e, fieldName) => {
        let fieldValue = e.target.value;
        await this.setState({ [fieldName]: fieldValue });
        this.validateFields(e, fieldName);
    }

    validateFields = (e, fieldName) => {
        let { username, password } = _.cloneDeep(this.state);
        let { errors } = _.cloneDeep(this.state);

        username = username.trim();
        password = password.trim();

        switch (fieldName) {
            case "username":
                if (username.length === 0) {
                    errors['username'].isError = true;
                    errors['username'].errorMessage = "Field is mandatory"
                } else {
                    errors['username'].isError = false;
                }
                break;

            case "password":
                if (password.length === 0) {
                    errors['password'].isError = true;
                    errors['password'].errorMessage = "Field is mandatory"
                } else {
                    errors['password'].isError = false;
                }
                break;

            default:
                break;
        }

        const isLoginButtonDisabled = (username.length && password.length) ? false : true;
        this.setState({
            errors,
            isLoginButtonDisabled: isLoginButtonDisabled
        });
    }

    validateLoginForm = () => {
        const {
            username,
            password
        } = _.cloneDeep(this.state);

        if (username === LoginDetails.userName && password === LoginDetails.password) {           
            this.setState({
                showLoader: true
            });

            const callBack = () => {
                localStorage.setItem("userid", LoginDetails.id);
                window.location.reload();
            }
            setTimeout(
                function () {
                    callBack();
                }, 4000
            );
        } else {
            this.setState({
                showLoginErrorMessage: true
            });
        }
    }

    onCloseSnackBar = () => {
        this.setState({
            showLoginErrorMessage: false
        });
    }

    render() {
        const {
            username,
            password,
            errors,
            isLoginButtonDisabled,
            showLoginErrorMessage,
            loginErrorMessage,
            showLoader
        } = _.cloneDeep(this.state);
        const { classes } = this.props;

        return (
            <Container maxWidth="sm" className={classes.loginContainer}>
                {
                    showLoginErrorMessage ? (
                        <Snackbar
                            message={loginErrorMessage}
                            open={true}
                            duration={4000}
                            closeSnackBar={this.onCloseSnackBar}
                            variant={'error'}
                        />
                    ) : null
                }

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
                                value={password}
                                onChange={(e) => this.handleChange(e, "password")}
                                className='text-field'
                                helperText={errors['password'].isError ? errors['password'].errorMessage : ""}
                                error={errors['password'].isError}
                                fullWidth
                                type='password'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="button"
                                className={classes.loginButton}
                                disabled={showLoader || isLoginButtonDisabled}
                                onClick={() => this.validateLoginForm()}
                            >
                                Login
                                {
                                    showLoader ? (
                                        <Box>
                                            <CircularProgress size={20} />
                                        </Box>
                                    ) : null
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        )
    }
}

export default withStyles(style)(Login);