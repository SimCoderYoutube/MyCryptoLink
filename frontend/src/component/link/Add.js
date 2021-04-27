import { Backdrop, CircularProgress, Snackbar, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from 'firebase';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { addLink } from '../../redux/actions';
import List from '../token/List';
import Item from './Item';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['Add Wallet Address', 'Choose Token', 'Finish'];
}

function getStepContent(step, props, setWallet, setToken, wallet, token) {
    switch (step) {
        case 0:
            return <TextField className="w-100" id="outlined-basic" label="Wallet Address" variant="outlined" onChange={(e) => setWallet(e.target.value)} />
        case 1:
            return <List props={props} setToken={setToken} />;
        case 2:
            return (
                <div >
                    <p style={{ fontWeight: 'bold', fontSize: 30 }}>Your new link</p>
                    <p>Please make sure the information is correct</p>
                    <div className="container">
                        <Item props={props} interatction={false} item={{ wallet, token, id: null }} wallet={wallet} token={token} />
                    </div>
                </div>)
        default:
            return 'Unknown step';
    }
}

export default function Add(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [token, setToken] = useState({ symbol: undefined })
    const [wallet, setWallet] = useState('')
    const [isValid, setIsValid] = useState(true);
    const [saving, setSaving] = useState(false)

    const steps = getSteps();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleNext = () => {
        if (activeStep == steps.length - 1) {
            setSaving(true)
            dispatch(addLink(token, wallet)).then(() => {
                history.push(`/link/${firebase.auth().currentUser.email}`);
            }).catch((error) => {
                setSaving(false)

                setIsValid({ bool: true, boolSnack: true, message: error.message })
            })
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    if(firebase.auth().currentUser == null){
        history.push('/')
    }

    console.log({saving})
    return (
        <div className={classes.root}>
            {saving ?
                <Backdrop style={{
                    zIndex: 999999,
                    color: '#fff',
                }}
                    open={saving}>
                    <CircularProgress color="inherit" />
                </Backdrop> : null}
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <div>{getStepContent(index, props, setWallet, setToken, wallet, token)}</div>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}>
                                        Back
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>


            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>


                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <Button onClick={handleReset} className={classes.button}>Reset</Button>
                </Paper>
            )}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isValid.boolSnack}
                autoHideDuration={3000}
                onDismiss={() => setIsValid({ boolSnack: false })}>
                <MuiAlert onClose={() => setIsValid({ boolSnack: false })} severity="error">
                    {isValid.message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
