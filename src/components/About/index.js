import React from "react";
import { Grid, Typography, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";


export function About() {

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h3" gutterBottom>
                        About Us
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Kausi Frarming is a open source solution to expensive and pesticide-resistant farming. We are a team of students at the Bhaktapur Multiple Campus who are dedicated to improving the quality of life for the people of the City area of Nepal.
                        Kausi Farming is designed to help the people of the City area of Nepal by providing a platform they can use to farm more efficiently and more profitably on thier rooftops.
                        Our platform is dedicated to help our users make easy and profitable farming decisions.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        How does it work?
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Our platform is designed to be open-source and accessible. The inner workings of the platform are completely public and accessible to everybody.
                        <Divider />
                        <Typography variant="h6" gutterBottom>
                            When a user first enters our webpage, their coordiante is sent to the server where we retrive the soildata and the weather data. Then our app suggests the best crop to grow based on the data.
                        </Typography>
                    </Typography>
                </Grid>
                {/* List our services */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Our Services
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        We provide the following services:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        <ul>
                            <li>
                                <Typography variant="h6" gutterBottom>
                                    1. Farm Management
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="h6" gutterBottom>
                                    2. Weather Forecasting
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="h6" gutterBottom>
                                    3. Soil Data
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="h6" gutterBottom>
                                    4. Crop Recommendation
                                </Typography>
                            </li>
                        </ul>
                    </Typography>
                </Grid>
                {/* show contact information */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        <Button
                            className={'mt-button'}
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/contact"
                        >
                            Contact Us
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}