import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '3.5em' }}>{text}</div>;

export function GoogleMap() {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11
    const branches = [
        { name: "Tel Aviv", coords: { lat: 32.0853, lng: 34.7818 } },
        { name: "Hadera", coords: { lat: 32.434046, lng: 34.919651 } },
        { name: "Bat Yam", coords: { lat: 32.013186, lng: 34.748019 } }
    ]
    function handleBranchSelect(branchCoords) {
        setCoords(branchCoords);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", margin: '20px', flexDirection: "column" }}>
            <h1>Our shops</h1>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                {branches.map(branch => (
                    <button key={branch.name} onClick={() => handleBranchSelect(branch.coords)}>
                        {branch.name}
                    </button>
                ))}
            </div>
            <div style={{ height: '50vh', width: '50%', marginTop: "30px" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDElUwXgKJIonNDyOlmaIafPh2rywqfCPY" }}
                    center={coords}
                    defaultZoom={zoom}
                // onClick={handleClick}
                >
                    {branches.map(branch => (
                        <AnyReactComponent
                            key={branch.name}
                            lat={branch.coords.lat}
                            lng={branch.coords.lng}
                            text="📍"
                        />
                    ))}
                </GoogleMapReact>
            </div>
        </div>
    );
}

