import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { Crops } from '../CropCarousel';
import axios from 'axios';
import agriShop from './agariShop.json'

export function Main() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerRef = useRef(null);
    const [temperature, setTemperature] = useState();
    const [lat, _setLat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lng, _setLng] = useState(null);
    const [cropData, setCropData] = useState([]);
    const [crop, setCrop] = useState([]);
    const storeRef = useRef(null);
    const focussedRef = useRef(lat);
    const focussed1Ref = useRef(lng);


    const API_KEY = process.env.REACT_ENV_API_KEY



    const setLng = (data) => {
        focussed1Ref.current = data;
        _setLng(data);
    };
    const setLat = (data) => {
        focussedRef.current = data;
        _setLat(data);
    };
    const handleShopClick = (data) => {
        console.log(data);
        new maplibregl.Marker({
            background: '/images/seed.png'
        })
            .setLngLat([data[0], data[1]])
            .addTo(map.current);

        map.current.flyTo({
            center: [data[0], data[1]],
            zoom: 15,
            speed: 1,
            curve: 1,
            easing: function (t) {
                return t;
            }
        });
    }


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
            navigator.geolocation.getCurrentPosition(position => {
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
                        axios.post(
                            '/api/v1/getsuggestion/',
                            {
                                lat: position.coords.latitude,
                                lon: position.coords.longitude,
                                temp: (res.data.main.temp - 273.15).toFixed(2)
                            }
                        ).then(res => {
                            setCropData(res.data);
                            console.log("eaa mula", res.data);
                            setLoading(false);
                        }
                        )
                            .catch(err => {
                                console.log(err);
                            }
                            );
                        axios.post('/api/v1/cropradius/', {
                            lat: position.coords.latitude,
                            lon: position.coords.longitude,
                        })
                            .then(res => {
                                console.log("from radius", res.data);
                                setCrop(res.data);
                            }
                            )
                            .catch(err => {
                                console.log(err);
                            }
                            );
                    }
                    ).catch(err => {
                        console.log(err);
                    }
                    );


                new maplibregl.Marker({ color: "#FF0000" })
                    .setLngLat([position.coords.longitude, position.coords.latitude])
                    .addTo(map.current)
            }, error, options);

        }
        map.current.on('click', function (e) {
            // map.current.getCanvas().focus();
            map.current.flyTo({
                center: e.lngLat,
                zoom: 18,
                essential: true
            });
            markerRef.current?.remove();
            markerRef.current = new maplibregl.Marker({ color: "blue" })
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .addTo(map.current)
            setLoading(true);
            new maplibregl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`<div class="map-popup" >Suitable Crops Listed Below</div>`)
                .addTo(map.current);
            console.log("Hello temp123", e.lngLat.lng, e.lngLat.lat);
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}&appid=${API_KEY}`
                )
                .then(res => {
                    setTemperature((res.data.main.temp - 273.15).toFixed(2))
                    console.log("from click", (res.data.main.temp - 273.15).toFixed(2) + "°C")
                    axios.post(
                        '/api/v1/getsuggestion/',
                        {
                            lat: e.lngLat.lat,
                            lon: e.lngLat.lng,
                            temp: (res.data.main.temp - 273.15).toFixed(2)
                        }
                    ).then(res => {
                        setCropData(res.data);
                        console.log("eaa mula", res.data);
                        setLoading(false);
                    }
                    )
                        .catch(err => {
                            console.log(err);
                        }
                        );
                    axios.post('/api/v1/cropradius/', {
                        lat: e.lngLat.lat,
                        lon: e.lngLat.lat,
                    })
                        .then(res => {
                            console.log("from radius", res.data);
                            setCrop(res.data);
                        }
                        )
                        .catch(err => {
                            console.log(err);
                        }
                        );
                }

                ).catch(err => {
                    console.log(err);
                }
                );
        }
        );
        map.current.on('load', () => {
            map.current.addLayer({
                id: 'locations',
                type: 'circle',
                /* Add a GeoJSON source containing place coordinates and information. */
                source: {
                    type: 'geojson',
                    data: agriShop
                }
            });
        });
    }, [temperature]);

    return (
        <>
            <Box>
                <div class='sidebar'>
                    <div class='heading'>
                        <h1>Nearest Seed Stores</h1>
                    </div>
                    <div id='listings' className='listings'>
                        {
                            agriShop[0].features.map((store, index) => {
                                return (
                                    <div onClick={() => handleShopClick(store.geometry.coordinates)} className="item" key={index}>
                                        <div className='item'>
                                            <a href="#" id={`link-${store.properties.id}`}>{store.properties.name}</a>
                                            <p>{store.properties['addr:place']}</p>
                                            <p>{store.properties.contact} {store.properties['contact:phone']}</p>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
                <div className="map-wrap">
                    <div ref={mapContainer} className="map" />
                </div>

                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '12px',
                    marginBottom: '12px'


                }}>
                    <Typography color="textPrimary" variant="h5">Suitable Crops for your Area</Typography>
                    {loading ? <CircularProgress /> : <Crops cropsData={cropData} />}
                </Box>
                <Box style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '12px',
                    marginBottom: '12px'
                }}
                >
                    <Typography color="textPrimary" variant="h5">What Other People around you are Growing</Typography>
                    {loading ? <CircularProgress /> : <Crops cropsData={crop} />}
                </Box>


            </Box>
        </>
    );
}
