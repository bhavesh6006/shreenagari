import React, { Component } from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import PersonIcon from '@material-ui/icons/Person';

import WingDetails from '../../JSONFiles/wings.json';
import AwingDetails from '../../JSONFiles/Awing.json';
import BwingDetails from '../../JSONFiles/Bwing.json';
import CwingDetails from '../../JSONFiles/Cwing.json';
import DwingDetails from '../../JSONFiles/Dwing.json';
import EwingDetails from '../../JSONFiles/Ewing.json';

import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';

import TablePagination from '@material-ui/core/TablePagination';

const style = {
    contactDetailsContainer: {
        display: 'flex'
    },
    wingDetailsButton: {
        width: '100%'
    }
};

class FlatDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showWings: true,
            showFlatDetails: false,
            selectedWing: null,
            rowsPerPage: 4,
            page: 0
        }
    }

    getWingDetailsTemplate = (row, index, classes) => {
        return (
            <Grid item xs={12} md={6} sm={6} key={`wing-details-${index}`} className='wing-card-grid'>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" align="center" color='primary' className='wing-text'>
                                {row.wingName}
                            </Typography>

                            {
                                row.contactDetails.map((obj, index1) => (
                                    <Typography key={`contact-details-${index1}`} variant="body2" color="textSecondary" align="left" className={classes.contactDetailsContainer}>
                                        <span className='wing-person-container'>
                                            <PersonIcon className='person-icon' /> <span>{obj.name} ({obj.mobileNumber})</span>
                                        </span>
                                    </Typography>
                                ))
                            }

                        </CardContent>
                    </CardActionArea>
                    <CardActions className='wing-card-action'>
                        <Button
                            variant="outlined"
                            color="primary"
                            type="button"
                            className={classes.wingDetailsButton}
                            onClick={() => this.viewFlatDetailsInWing(row.id)}
                        >
                            View Details
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    viewFlatDetailsInWing = (wingIndex) => {
        this.setState({
            selectedWing: wingIndex,
            showFlatDetails: true,
            showWings: false
        });
    }

    handleBack = () => {
        this.setState({
            showWings: true,
            showFlatDetails: false,
            selectedWing: null
        });
    }

    getFlatDetailsWingwise = (classes) => {
        const { selectedWing } = _.cloneDeep(this.state);
        let flats = [];

        switch(selectedWing) {
            case 1:
                flats = AwingDetails.flats;
                break;

            case 2:
                flats = BwingDetails.flats;
                break;

            case 3:
                flats = CwingDetails.flats;
                break;

            case 4:
                flats = DwingDetails.flats;
                break;

            case 5:
                flats = EwingDetails.flats;
                break;

            default:
                break;
        }

        return flats;
    }

    getFlatDetailsTemplate = (row, index, classes, selectedWing) => {
        return (
            <Grid item xs={12} md={4} sm={6} key={`flat-details-${index}`} className='wing-card-grid'>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" align="center" color='primary' className='wing-text'>
                                {this.getWingName(selectedWing)} - {row.displayName}
                            </Typography>

                            <Typography variant="body2" color="textSecondary" align="left" className={classes.contactDetailsContainer}>
                                <PersonIcon className='person-icon' /> <span>{row.ownerName}</span>
                            </Typography>

                            <Typography variant="body2" color="textSecondary" align="left" className={classes.contactDetailsContainer}>
                                <PhoneIcon className='person-icon' /> <span>{row.mobileNumber}</span>
                            </Typography>

                            <Typography variant="body2" color="textSecondary" align="left" className={classes.contactDetailsContainer}>
                                <EmailIcon className='person-icon' /> <span>{row.email}</span>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }

    getWingName = (selectedWing) => {
        let wingName = "";

        switch(selectedWing) {
            case 1:
                wingName = "A";
                break;

            case 2:
                wingName = "B";
                break;

            case 3:
                wingName = "C";
                break;

            case 4:
                wingName = "D";
                break;

            case 5:
                wingName = "E";
                break;

            default:
                break;
        }

        return wingName;
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        });
    };

    render() {
        const { classes } = _.cloneDeep(this.props);
        const {
            showWings,
            showFlatDetails,
            selectedWing,
            rowsPerPage,
            page
        } = _.cloneDeep(this.state);

        const flats = this.getFlatDetailsWingwise(classes);

        return (
            <React.Fragment>
                {
                    showWings ? (
                        <Grid container spacing={2}>
                            {
                                WingDetails.wings.map((row, index) => (
                                    this.getWingDetailsTemplate(row, index, classes)
                                ))
                            }
                        </Grid>
                    ) : null
                }

                {
                    showFlatDetails ? (
                        <Grid container>
                            <Grid container className='page-back-row'>
                                <div onClick={() => this.handleBack()} className='page-back--link'>
                                    <ArrowBackIosOutlinedIcon fontSize='small' />
                                    <Typography color='primary' variant='body1'>
                                        {this.getWingName(selectedWing)} WING
                                    </Typography>
                                </div>
                            </Grid>

                            <Grid container spacing={2}>
                                {
                                    flats
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        this.getFlatDetailsTemplate(row, index, classes, selectedWing)
                                    ))
                                }
                            </Grid>

                            <TablePagination
                                rowsPerPageOptions={[4,8,20]}
                                component="div"
                                count={flats.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                className='pagination-wrapper'
                            />
                        </Grid>
                    ) : null
                }
            </React.Fragment>
        )
    }
}

export default withStyles(style)(FlatDetails);