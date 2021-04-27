import { Button, Fab, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ClassIcon from '@material-ui/icons/Class';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginWithGoogle, logout, saveUserProfile } from "../../redux/actions/index";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



function SimpleDialog(props) {
  const classes = useStyles();
  const { setOpen, open } = props;
  const dispatch = useDispatch();
  const [creating, setCreating] = useState(false)
  const currentUser = useSelector(state => state.userState.user)


  const [name, setName] = useState(currentUser.name)
  const [description, setDescription] = useState(currentUser.description)
  const dispach = useDispatch()
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.description)
  }, [open])

  const handleSaveProfile = () => {
    dispatch(saveUserProfile(name, description)).then(() => {
      setOpen(false)
    }).catch((error) => {
      setIsValid({ bool: true, boolSnack: true, message: error.message })
    })
    return;
  };



  return (
    <Dialog onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Edit Profile</DialogTitle>
      <div className="px-3">
        <TextField
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="col-md-12 mb-3"
          label="Name"
          id="filled-size-small"
          defaultValue="Small"
          variant="outlined"
          size="small"
        />
        <TextField
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          multiline
          rows={3}
          className="col-md-12 mb-4"
          label="Description"
          id="filled-size-small"
          variant="outlined"
          size="small"
        />
        <div className="w-100 mt-4">
          <Fab variant="extended" color="secondary" aria-label="add"
            onClick={() => handleSaveProfile()} className="w-100">
            Save
          </Fab>
          <Button variant="extended" aria-label="add"
            onClick={() => setOpen(false)} className="w-100 my-2">
            Cancel
          </Button>
        </div>
      </div>
      {isValid.boolSnack ?
        <MuiAlert onClose={() => setIsValid({ boolSnack: false })} severity="error">
          {isValid.message}
        </MuiAlert>
        : null}
    </Dialog>
  );
}


export default function Navbar() {
  const isAuthenticated = useSelector(state => state.userState.isAuthenticated)
  const [open, setOpen] = React.useState(false);
  const [isValid, setIsValid] = useState(true);

  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  function onLogoutClick() {
    console.log("logout")
    dispatch(logout()).then((result) => {
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleLogin = () => {
    dispatch(loginWithGoogle()).then(() => {
      setOpen(false)
    }).catch((error) => {
      setIsValid({ bool: true, boolSnack: true, message: "Error while logging in" })
    })
    return;
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static" >
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className="m-0" to={`/`} style={{ color: 'white' }}>
              MyCryptoLink
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div >

            {firebase.auth().currentUser != null ?
              <div className="d-flex">
                <IconButton aria-label="show 4 new mails" className="pb-2" color="inherit" onClick={() => setOpen(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Link className="m-0" to={`/link/${firebase.auth().currentUser.email}`} style={{ color: 'white' }}>
                    <ClassIcon />
                  </Link>
                </IconButton>
                <IconButton aria-label="show 4 new mails" color="inherit" onClick={() => onLogoutClick()}>
                  <ExitToAppIcon />
                </IconButton>
              </div>
              :
              <div className="d-flex">
                <Button onClick={() => handleLogin()} style={{ color: 'white' }}>Login</Button>

              </div>

            }
          </div>

        </Toolbar>
      </AppBar>
      <SimpleDialog open={open} setOpen={setOpen} />

    </div>
  );
}
