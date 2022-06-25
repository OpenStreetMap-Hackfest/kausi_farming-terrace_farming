import React from 'react';
import {
    Container,
    Typography,
    TextField,
    Button
} from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';

export function RequestCrops() {
    const [local_name, setLocalName] = React.useState('');
    const [scientific_name, setScientificName] = React.useState('');

    const handleSubmit = () => {
        axios.post('/api/v1/addcrop/', {
            local_name,
            scientific_name
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        ).then(function (response) {
            console.log(response);
        }
        ).catch(function (error) {
            console.log(error);
        }
        );
    }

    return (
        <Container
            maxWidth="md"
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '80px'
            }}
        >
            <Typography variant="h4" component="h4">
                Request a new crop
            </Typography>
            <Box >
                <TextField
                    id="standard-basic"
                    label="Local Name"
                    value={local_name}
                    onChange={(e) => setLocalName(e.target.value)}
                /></Box>
            <Box
                style={{
                    marginTop: '20px'
                }}
            >
                <TextField
                    id="standard-basic"
                    label="Scientific Name"
                    value={scientific_name}
                    onChange={(e) => setScientificName(e.target.value)}
                />
            </Box>
            <Box>
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
        </Container>
    )
}