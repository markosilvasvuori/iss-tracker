import { useContext } from 'react';
import { MapContext } from "react-map-gl";

const IssMarker = (props) => {
    const context = useContext(MapContext);
    const {longitude, latitude} = props;
    const [x, y] = context.viewport.project([longitude, latitude]);

    const markerStyle = {
        position: 'absolute',
        padding: '20px',
        borderRadius: '50%',
        background: '#e8630a',
        boxShadow: '0 0 14px 1px rgba(232, 99, 10, .9)',
        color: '#222',
        fontWeight: 'bold',
        fontSize: '0.875rem',
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