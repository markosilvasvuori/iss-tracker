import { useContext, useState, useEffect } from 'react';
import { MapContext } from "react-map-gl";

const IssMarker = (props) => {
    // const [issData, setIssData] = useState();


    // useEffect(() => {
    //     const fetchData = () => {
    //         fetch('https://api.wheretheiss.at/v1/satellites/25544')
    //         .then(response => response.json())
    //         .then(data => setIssData(data));
    //     }
        
    //     fetchData();
    // }, []);
    
    const context = useContext(MapContext);
    const {longitude, latitude} = props;
    const [x, y] = context.viewport.project([longitude, latitude]);

    // const x = issData.longitude;
    // const y = issData.latitude;

    const markerStyle = {
        position: 'absolute',
        padding: '6px',
        borderRadius: '15px',
        background: 'orange',
        left: x,
        top: y
    };

    return (
        <div style={markerStyle}>
            ISS
        </div>
    );
};

export default IssMarker;