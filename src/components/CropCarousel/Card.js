import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export function CropCard({ crop }) {
  // const theme = useTheme();
  // const match = useMediaQuery(theme.breakpoints.up('sm'));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card style={{
        width: "460px",
      }}>
        <CardMedia
          component="img"
          height="140"
          style={{
            background: "#ccc",
          }}
          image={crop.image !== null ? crop.image : '/images/kausi.png'}
          alt={crop.label}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {crop.local_name}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="i">
            Scientific Name: {crop.scientific_name}
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
            {crop.harvest} months to harvest
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {crop.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClickOpen}>Select This Crop</Button>
          <Button size="small" href={crop.link} >Learn More</Button>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add Crop to Your Garden?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to add {crop.local_name} to your cultivated crops.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

