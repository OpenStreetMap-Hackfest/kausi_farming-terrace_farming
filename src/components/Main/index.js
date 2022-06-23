import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box, Typography, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { Crops } from '../CropCarousel';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export function Main() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const markerRef = useRef(null);
    const [msg, setMsg] = useState('');
    const [sever, setSever] = useState('');
    const [open, setOpen] = React.useState(false);
    const [temperature, setTemperature] = useState();
    const [lat, _setLat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lng, _setLng] = useState(null);
    const [cropData, setCropData] = useState([]);
    const [crop, setCrop] = useState([]);

    const focussedRef = useRef(lat);
    const focussed1Ref = useRef(lng);


    const API_KEY = 'b50ba524bcd2f7d3a582e0b42b251afd'

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const setLng = (data) => {
        focussed1Ref.current = data;
        _setLng(data);
    };
    const setLat = (data) => {
        focussedRef.current = data;
        _setLat(data);
    };
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
        })

    }, [cropData]);
    // setTimeout(() => {
    //     setLoading(false);
    // }, 5000);
    // useEffect(() => {
    //     if (cropData.length > 0) return;
    //     console.log("lat,lng,tmp", lat, lng, temperature);
    //     axios.get('/api/v1/getallcrops/')
    //         .then(res => {
    //             setCropData(res.data)
    //             console.log("cropsData", res)
    //         }
    //         )
    //         .catch(err => {
    //             console.log(err)
    //         }
    //         )
    // }, [cropData])

    return (
        <>
            <Box>
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

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={sever} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}
