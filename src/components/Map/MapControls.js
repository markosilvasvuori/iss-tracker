import classes from './MapControls.module.css';

const MapControls = (props) => {
    const onClickHandler = () => {
        props.onClick();
    };

    return (
        <div className={classes["map-controls"]}>
            <label className={classes.checkbox}>
                <input type="checkbox" defaultChecked onClick={onClickHandler} />
                <span>Center ISS</span>
            </label>
        </div>
    );
};

export default MapControls;