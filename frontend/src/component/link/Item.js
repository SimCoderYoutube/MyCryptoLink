import { Backdrop, Card, CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import firebase from 'firebase';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLink } from '../../redux/actions';

const cryptocurrencies = require('cryptocurrencies');

export default function Item({ props, interaction, item = { id: '', token: {}, wallet: '' } }) {
    const [mouseEnter, setMouseEnter] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const dispatch = useDispatch();
    const copyToClipBoard = () => {
        navigator.clipboard.writeText(item.wallet);
    }
    const handleDeleteLink = () => {
        setDeleting(true);
        dispatch(deleteLink(item.id)).then(() => {
            setDeleted(true);
            setDeleting(false);
        }).catch(() => {
            setDeleted(false);
            setDeleting(false);
        })
    }


    if (deleted) {
        return (null);
    }

    let currentUserEmail = null;
    if (firebase.auth().currentUser != null) {
        currentUserEmail = firebase.auth().currentUser.email;
    }

    return (

        <Card elevation={mouseEnter ? 20 : 8} className="mb-4 link" style={{ borderRadius: 20 }} onMouseEnter={() => { setMouseEnter(true) }} onMouseLeave={() => { setMouseEnter(false) }}>

            <Backdrop style={{
                zIndex: 999999,
                color: '#fff'
            }}
                open={deleting}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="container">

                <div className="row ">
                    <div className="col-lg-2 col-md-3 col-sm-3 col-4 py-3">
                        <div className="row pl-4">
                            <img className="mr-3" src={item.token.symbol != undefined || item.token.symbol != undefined ? require(`../../../node_modules/cryptocurrency-icons/svg/black/${item.token.symbol.toLowerCase()}.svg`).default : null} style={{ height: 30, width: 30 }} />
                            <a style={{ fontSize: 20 }}>{item.token.symbol == undefined ? 'N/A' : item.token.symbol}</a>
                        </div>
                    </div>
                    <div className="col-lg col-md  col-sm-9 col-8 m-auto">
                        <div className="row">
                            <span className="col-sm-7 col-7 col-md wallet-text text-align-center my-auto" style={{ fontSize: 20 }}>{item.wallet == '' ? 'N/A' : item.wallet}</span>
                            {interaction ?
                                <div className="col-sm-5 col-5 col-md-3 text-right">
                                    {currentUserEmail == props.match.params.email ?
                                        <div>
                                            <Tooltip title="Copy" aria-label="Copy">
                                                <IconButton aria-label="delete" onClick={() => copyToClipBoard()}>
                                                    <FileCopyIcon style={{ color: 'grey' }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete" aria-label="Delete">
                                                <IconButton aria-label="delete" onClick={() => handleDeleteLink()}>
                                                    <DeleteIcon style={{ color: 'red' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        :
                                        <div>
                                            <Tooltip title="Copy" aria-label="Copy">
                                                <IconButton aria-label="delete" onClick={() => copyToClipBoard()}>
                                                    <FileCopyIcon style={{ color: 'grey' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    }
                                </div>
                                : null}

                        </div>
                    </div>
                </div>
            </div>

        </Card>
    );
}
