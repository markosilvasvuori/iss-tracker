import React, { Fragment } from 'react';

import classes from './LoadingIcon.module.css';

const LoadingIcon = () => {
    return (
        <Fragment>
            <div className={classes["loading-icon"]}></div>
            <p className={classes["loading-text"]}>Locating ISS...</p>
        </Fragment>
    );
};

export default LoadingIcon;