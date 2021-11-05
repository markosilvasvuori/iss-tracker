import { useContext } from 'react';
import { MapContext } from "react-map-gl";

const IssMarker = (props) => {
    const context = useContext(MapContext);
    const {longitude, latitude} = props;
    const [x, y] = context.viewport.project([longitude, latitude]);

    const markerStyle = {
        position: 'absolute',
        padding: '10px',
        borderRadius: '50%',
        background: 'orange',
        color: '#222',
        fontWeight: 'bold',
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