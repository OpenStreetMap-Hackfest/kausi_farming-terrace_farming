import React from 'react';
import {
    Container, Box, Typography, CardMedia, CardContent, Card, Grid
} from '@mui/material';
import axios from 'axios';

export function Profile() {
    const [cropData, setCropData] = React.useState([]);
    React.useEffect(() => {
        axios.get('/api/v1/getusercrops/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(function (response) {
            console.log(response.data);
            setCropData(response.data);
        }
        ).catch(function (error) {
            console.log(error);
        }
        );
    }, [cropData]);
    return (
        <Container maxWidth="sm" style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '50px'
        }}>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your Crops
                </Typography>
                <Grid container spacing={1}>
                    {cropData.length > 0 ?
                        cropData.map((crop, index) => (
                            <Grid item xs={6}>

                                <Card style={{
                                    width: "460px",
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        style={{
                                            background: "#ccc",
                                        }}
                                        image={crop.crop.image !== null ? crop.crop.image : '/images/kausi.png'}
                                        alt={crop.crop.label}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {crop.crop.local_name}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary" component="i">
                                            Scientific Name: {crop.crop.scientific_name}
                                        </Typography>
                                        <Typography variant="h6" color="textPrimary" component="p">
                                            {crop.crop.harvest} months to harvest
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {crop.crop.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        :
                        <Typography variant="h6" component="h2" gutterBottom>
                            You have no crops
                        </Typography>
                    }
                </Grid>
            </Box>
        </Container>
    );
}