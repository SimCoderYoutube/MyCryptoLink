import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const NotFound = () => {
    return (
        <div className='background-grad w-100 overflow-hidden' style={{ height: 'calc(100vh - 64px)' }}>
            <div className="container mt-3">
                <div className="row">
                    <di className='col-md-6'>
                        <h1>404.</h1>
                        <h3>This page does not exists</h3>
                        <p>Looks like you're lost! please go to the homepage.</p>
                        <Link to='/'><Button>Home</Button></Link>
                    </di>
                </div>
            </div>
        </div>
    )
}

export default NotFound