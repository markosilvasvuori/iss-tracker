import { useState, useEffect } from 'react';

import ReactMapGL from 'react-map-gl';
import IssMarker from '../ISS/IssMarker';
import classes from './Map.module.css';

const Map = () => {
    const [issData, setIssData] = useState({
        latitude: 0,
        longitude: 0
    });
    const [viewport, setViewport] = useState({
        width: 100 + '%',
        height: 100 + '%',
        latitude: 0,
        longitude: 0,
        zoom: 3
    });
    const [settings, setSettings] = useState({
        dragPan: false,
        dragRotate: false,
        scrollZoom: false,
        touchZoom: false,
        touchRotate: false,
        doubleClickZoom: false,
        keyboard: false
    });
    const [isFollowingIss, setIsFollowingIss] = useState(true);
    const API_KEY = process.env.REACT_APP_ISS_API_KEY;

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch('https://api.wheretheiss.at/v1/satellites/25544')
            .then(response => response.json())
            .then(data => setIssData({
                latitude: data.latitude,
                longitude: data.longitude
            }));

            setViewport({
                ...viewport,
                latitude: issData.latitude,
                longitude: issData.longitude
            });
        }, 3000);

        return () => clearInterval(intervalId);
    }, [issData, viewport]);

    const followIssHandler = () => {
        setIsFollowingIss(!isFollowingIss);
        console.log(isFollowingIss)
        if (isFollowingIss) {
            setSettings({
                dragPan: false,
                dragRotate: false,
                scrollZoom: false,
                touchZoom: false,
                touchRotate: false,
                doubleClickZoom: false,
                keyboard: false
            });        
        }

        if (!isFollowingIss) {
            setSettings({
                dragPan: true,
                dragRotate: true,
                scrollZoom: true,
                touchZoom: true,
                touchRotate: true,
                doubleClickZoom: true,
                keyboard: true
            });        
        }
    };

    return (
        <div className={classes.map}>
            <button onClick={followIssHandler}>Follow ISS</button>
            <ReactMapGL
                mapStyle={'mapbox://styles/markosilvasvuori/ckvjje8ie084v14ou6z0e575x'}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                {...viewport}
                {...settings}
                // longitude={issData.longitude} latitude={issData.latitude}
                mapboxApiAccessToken={API_KEY}
            >
                <IssMarker longitude={issData.longitude} latitude={issData.latitude} />
            </ReactMapGL>
        </div>
    );
};

export default Map;