
import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export function Credits() {
    return (
        <ThemeProvider theme={createTheme()}>
            <Container maxWidth="sm">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Credits
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Kausi Farming's Team
                            </Typography>
                            <img
                                alt="Kausi"
                                src={'/images/baal.jpg'}
                                height={"300px"}
                                width={"500px"}
                            />
                            <Typography variant="body1" gutterBottom>
                                All the codes and resources of this app  are open sources.
                                The source code is available on {
                                    " "
                                }
                                <a href="https://github.com/bhusallaxman22/osmhackfest-kausifarming">Github</a>
                            </Typography>
                            {/* List libraries used and their Link */}
                            <Typography variant="body1" gutterBottom>
                                <li>
                                    <a href="
                                        https://material-ui.com/">
                                        Material-UI
                                    </a>
                                </li>
                                <li>
                                    <a href="
                                        https://reactjs.org/">
                                        React
                                    </a>
                                </li>
                                <li>
                                    <a href="
                                        https://react-router-dom.com/">
                                        React-Router-Dom
                                    </a>
                                </li>
                                <li>
                                    <a href="
                                        https://www.npmjs.com/package/axios">
                                        Axios
                                    </a>
                                </li>
                                <li>
                                    {/* maplibre-gl */}
                                    <a href="
                                        https://www.npmjs.com/package/maplibre-gl">
                                        MapLibre-GL
                                    </a>
                                </li>
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}



