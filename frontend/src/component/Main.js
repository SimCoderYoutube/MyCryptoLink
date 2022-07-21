import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,

    Route, Switch
} from "react-router-dom";
import { reload } from '../redux/actions';
import Home from './Home';
import Add from './link/Add';
import MainLink from './link/Main';
import Navbar from './utils/Navbar';
import NotFound from './utils/NotFound';

export default function Main() {
    const isAuthenticated = useSelector(state => state.userState.isAuthenticated)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(reload())
    }, [])

    return (
        <Router>
            <div>
                <Navbar />


                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route exact path="/add" component={Add} />

                    <Route exact path="/link/:email" component={MainLink} />

                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    )
}
