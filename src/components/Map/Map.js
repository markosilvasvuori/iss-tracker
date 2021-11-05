import { useState, useEffect } from 'react';

import ReactMapGL from 'react-map-gl';
import LoadingIcon from '../UI/LoadingIcon';
import MapControls from './MapControls';
import IssMarker from '../ISS/IssMarker';
import Button from '../UI/Button';
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
    const [isLoading, setIsLoading] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const API_KEY = process.env.REACT_APP_ISS_API_KEY;

    useEffect(() => {
        const intervalId = setInterval( async () => {
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
            const issLocation = await response.json();
            setIssData({
                latitude: issLocation.latitude,
                longitude: issLocation.longitude
            });
            if (isFollowingIss) {
                setViewport({
                    ...viewport,
                    latitude: issLocation.latitude,
                    longitude: issLocation.longitude
                });
            }
            
            setIsLoading(false);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [issData, viewport, isFollowingIss]);

    useEffect(() => {
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
            setViewport({
                ...viewport,
                latitude: issData.latitude,
                longitude: issData.longitude
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
    }, [isFollowingIss]);

    const showControlsHandler = () => {
        setShowControls(!showControls);
    };

    const followIssHandler = () => {
        setIsFollowingIss(!isFollowingIss);
    };

    return (
        <div className={classes.map}>
            {isLoading && <LoadingIcon />}
            {!isLoading && !showControls &&
                <Button 
                    className={classes["controls-button"]} 
                    onClick={showControlsHandler}
                >
                    Controls
                </Button>
            }
            {showControls &&
                <MapControls 
                    hideControls={showControlsHandler}
                    onFollow={followIssHandler} 
                    isFollowing={isFollowingIss} 
                />
            }
            {!isLoading &&
                <ReactMapGL
                    mapStyle={'mapbox://styles/markosilvasvuori/ckvjje8ie084v14ou6z0e575x'}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                    mapboxApiAccessToken={API_KEY}
                    {...viewport}
                    {...settings}
                >
                    <IssMarker 
                        longitude={issData.longitude} 
                        latitude={issData.latitude} 
                    />
                </ReactMapGL>
            }
        </div>
    );
};

export default Map;