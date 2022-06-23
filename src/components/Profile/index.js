import React from 'react';
import {
    Container, Box, Typography, CardHeader, CardContent, Divider, Card, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Profile() {
    const navigate = useNavigate();
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
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                    // width: '460px',
                                }} key={crop.id}>
                                    <CardHeader>
                                        <Typography variant="h5" component="h2" gutterBottom>
                                            {crop.crop.local_name}
                                        </Typography>
                                    </CardHeader>
                                    <CardContent>
                                        <Typography variant="h6" component="h2" color="ButtonText" gutterBottom>
                                            Crop Type: {crop.crop.category}
                                        </Typography>
                                        <Typography variant="h6" component="h2" color="textSecondary" gutterBottom>
                                            {crop.crop.description}
                                        </Typography>
                                        <Divider />
                                        <Typography variant="h6" component="h2" color="primary" gutterBottom>
                                            Harvest time: {crop.crop.harvest} Months
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