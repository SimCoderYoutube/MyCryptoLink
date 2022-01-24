import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserLinks } from '../../redux/actions';
import Item from './Item';



export default function List({ props, interaction, uid }) {
    const [links, setLinks] = useState([]);
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(true);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        dispatch(fetchUserLinks(uid)).then((result) => {
            setLinks(result);
            setLoading(false);
        }).catch((error) => {
            setIsValid({ bool: true, boolSnack: true, message: error.message })
            setLoading(false);
        })
    }, [props, uid]);

    if (loading) {
        return (
            <div className="container">
                <div className="Row">
                    <div className="text-center container mt-5 pt-5 mb-5">
                        <CircularProgress style={{textAlign: 'center'}} color="inherit" />

                    </div>
                </div>
            </div>
        )
    }

    if (links.length == 0) {
        return (
            <div className="container">
                <div className="Row">
                    <div className=" justify-content-center container mt-5 pt-5 mb-5">
                        <h1 style={{ fontWeight: 'bold', fontSize: 50, marginBottom: 20, textAlign: 'center' }}>No links available</h1>
                        <h4 style={{textAlign: 'center'}}>No links available for this account</h4>

                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <div className="Row">
                {links.map((item, i) => {
                    return (
                        <Item props={props} interaction={interaction} item={item} />
                    );
                })}
            </div>
        </div>
    );
}
