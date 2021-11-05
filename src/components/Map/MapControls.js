import Button from '../UI/Button';

import classes from './MapControls.module.css';

const MapControls = (props) => {
    return (
        <header className={classes["map-controls"]}>
            <Button 
                className={classes.button} 
                onClick={props.onFollow}
            >
                {!props.isFollowing ? 'Follow ISS' : 'Unfollow ISS'}
            </Button>
            <Button onClick={props.hideControls}>Close Controls</Button>
        </header>
    );
};

export default MapControls;