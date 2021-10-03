import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const GoogleMap = (props) => {

    const mapStyles = {
        width: '100%',
        height: '100%'
    }

    return (
        <>
            <Map
                zoom={8}
                style={mapStyles}
                google={props.google}
                initialCenter={{ lat: 10.823099, lng: 106.629662 }}
            >
                <Marker position={{ lat: 10.823099, lng: 106.629662 }} />
            </Map>
        </>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDIiqBpfMo_JjKvKuRMwU1HY_Dw4cTFQ1E'
})(GoogleMap)