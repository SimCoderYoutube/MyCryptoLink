import { Backdrop, Card, CircularProgress, Fab, Link } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByEmail } from '../../redux/actions';
import List from './List';

export default function Main(props) {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null)
    const currentUser = useSelector(state => state.userState.user)


    useEffect(() => {
        if (firebase.auth().currentUser == null) {
            dispatch(fetchUserByEmail(props.match.params.email, false)).then((result) => {
                console.log({result});
                setUser(result)
            })
            return;
        }
        if (firebase.auth().currentUser.email == props.match.params.email) {

            console.log({currentUser})
            setUser(currentUser);
            return;
        }
        dispatch(fetchUserByEmail(props.match.params.email, false)).then((result) => {
            
            setUser(result)
        })
    }, [firebase.auth().currentUser, props, currentUser])

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(`${window.location.host}/link/${user.email}`)
    }

    if (user == null) {
        return (
            <div className="background-grad" style={{ height: '100vh' }}>

                <Backdrop style={{
                    zIndex: 999999,
                    color: '#fff',
                }}
                    open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>

        )
    }

    let currentUserEmail = null
    if (firebase.auth().currentUser != null) {
        currentUserEmail = firebase.auth().currentUser.email
    }

    return (
        <div className='background-grad' style={{ minHeight: 'calc(100vh - 64px)' }}>
            <div className="row justify-content-center pt-5 pb-4 mx-0" >
                {user != null ?
                    <Card className="py-3 px-5" style={{ borderRadius: 20, background: 'white' }} elevation={20}>
                        <p style={{ color: '#161616', fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 0 }}>{user.name}</p>
                        <p style={{ color: '#161616', fontSize: 15, textAlign: 'center' }} className="pb-2">{user.email}</p>
                    </Card>
                    : null}

            </div>
            <div className="row justify-content-center pt-4 pb-4 mx-0">
                <Fab style={{background: '#161616', color: 'white'}}className="mr-4" variant="extended" color="primary" aria-label="add" onClick={() => copyToClipBoard()}>
                    <ShareIcon className="mr-3" />
                    Share Link
                </Fab>
                {currentUserEmail == props.match.params.email ?
                    <Link className="m-0" to={`/link/add`} style={{ color: 'white', color: '#FFFFFF', textDecoration: 'none'}}>
                        <Fab variant="extended" color="secondary" style={{ background: '#161616', color: 'white',  textDecoration: 'none' }} aria-label="add"
                            href={`/link/add`}>
                            <AddIcon className="mr-2" />
                    Add Wallet
                </Fab>
                    </Link>
                    : null}

            </div>
            <div className="mt-4 pb-5">
                <List props={props} interaction={true} uid={user.uid}/>

            </div>



        </div>
    )
}
