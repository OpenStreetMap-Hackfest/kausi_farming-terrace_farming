import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box, Typography } from '@mui/material';
import { Crops } from '../CropCarousel';
import axios from 'axios';

export function Main() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerRef = useRef(null);
    // const [suggestedCrop, setSuggestedCrop] = useState([]);
    // const [radCrops, setRadCrops] = useState([]);
    // const [soilPh, setSoilPh] = useState();
    const [temperature, setTemperature] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [cropData, setCropData] = useState([]);
    const API_KEY = 'b50ba524bcd2f7d3a582e0b42b251afd'
    useEffect(() => {
        if (map.current) return; //stops map from intializing more than once
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.baato.io/api/v1/styles/breeze?key=bpk.cA6bEJf8m3flvwOIUqk7KH10v5Jl642Lx4d0qFAd7fz7`,
            center: [85.3653, 27.7654],
            zoom: 12
        });
        map.current.addControl(
            new maplibregl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
            }),
            'bottom-left'
        );

        var options = {
            enableHighAccuracy: true,
            timeout: 5006,
            maximumAge: 0
        };
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        map.current.addControl(new maplibregl.NavigationControl(), 'bottom-right');
        // get users current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                console.log(position.coords.latitude, position.coords.longitude);
                //   get current temperature from open api
                axios
                    .get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
                    )
                    .then(res => {
                        setTemperature((res.data.main.temp - 273.15).toFixed(2));
                        console.log((res.data.main.temp - 273.15).toFixed(2) + "°C");
                        console.log(temperature);
                    }
                    ).catch(err => {
                        console.log(err);
                    }
                    );
                // get current soil ph from open api
                new maplibregl.Marker({ color: "#FF0000" })
                    .setLngLat([position.coords.longitude, position.coords.latitude])
                    .addTo(map.current)
            }, error, options);

        }

        map.current.on('click', function (e) {
            // map.current.getCanvas().focus();
            map.current.flyTo({
                center: e.lngLat,
                zoom: 15,
                essential: true
            });
            markerRef.current?.remove();
            markerRef.current = new maplibregl.Marker({ color: "blue" })
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .addTo(map.current)
                .setDraggable(true)
            // show the popup on click
            new maplibregl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`<div class="map-popup" >Suitable Crops Listed Below</div>`)
                .addTo(map.current);
        })

    }, [lat, lng, temperature]);
    useEffect(() => {
        if (cropData.length > 0) return;
        axios.get('/api/v1/getallcrops/')
            .then(res => {
                setCropData(res.data)
                console.log("cropsData", res)
            }
            )
            .catch(err => {
                console.log(err)
            }
            )
    }, [cropData])

    return (
        <>
            <Box>
                <div className="map-wrap">
                    <div ref={mapContainer} className="map" />
                </div>
                <Box>
                    <Typography variant="h4">Suitable Crops for your Area</Typography>
                    <Crops cropData={cropData} />
                </Box>

            </Box>
        </>
    );
}
