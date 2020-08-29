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
            showWings: true
        }
    }

    componentDidMount() {
        console.log('WingDetails: ', WingDetails);
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
                        >
                            View Details
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }

    render() {
        const { classes } = _.cloneDeep(this.props);
        const {
            showWings
        } = _.cloneDeep(this.state);

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
            </React.Fragment>
        )
    }
}

export default withStyles(style)(FlatDetails);