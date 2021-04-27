import { Button, Card, TextField } from '@material-ui/core';
import firebase from 'firebase';
import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';

const cryptocurrencies = require('cryptocurrencies');
const cryptoJSON = require('../../../node_modules/cryptocurrency-icons/manifest.json')


export default function List({ props, setToken = null }) {
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState(null)


    function find(arr, text) {
        text = text.toLowerCase()

        text = text.split(' ');

        return arr.filter(function (item) {
            return text.every(function (el) {
                return item.symbol.toLowerCase().indexOf(el) > -1;
            });
        });
    }

    let crypto = find(cryptoJSON, search.toLowerCase())

    const handleSelection = (item, i) => {
        setSelected(item)
        if(setToken != null){
            setToken(item)
        }
    }
    return (
        <div className="my-4">
            {firebase.auth().currentUser.uid == props.match.params.uid ?
                <div className="mb-4">
                    <Link className="m-0" to={`/link/add`} style={{ color: 'white' }}>
                        <Button variant="contained" color="primary">Add Wallet</Button>

                    </Link>
                </div>
                : null
            }


            <div className="row">
                <div className="col-md-12 mb-3 ml-3">
                    <TextField id="outlined-basic" label="Search Token" variant="outlined" onChange={(event) => setSearch(event.target.value)} />
                </div>


                    <Scrollbars className="w-100" style={{ height: '207px' }}>
                        <div className="w-100 d-flex flex-row " styles={{ height: '500px', overflowY: 'scroll', overflow: 'hidden' }} >
                            {crypto.map((item, i) => {
                                return (
                                    <div className="my-4 col-md-2 px-3 ">
                                        <Card className={selected == item ? "linkClick": null} elevation={selected == item ? 16 : 4} style={{ borderRadius: 20, }} onClick={() => handleSelection(item, i)}>
                                            <div className="p-4 row align-items-center">
                                                <img className="mb-2 mx-auto" src={require(`../../../node_modules/cryptocurrency-icons/svg/black/${item.symbol.toLowerCase()}.svg`).default} style={{ height: 40, width: 40 }} />
                                                <span className="col-md-12" style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{item.symbol}</span>

                                                <span className="col-md-12" style={{ fontSize: 15, textAlign: 'center' }}>{item.name}</span>

                                            </div>

                                        </Card>
                                    </div>
                                )
                            })
                            }

                        </div>
                    </Scrollbars>

            </div>


        </div>
    )
}
