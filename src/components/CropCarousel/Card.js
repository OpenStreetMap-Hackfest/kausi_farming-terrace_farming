import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
export function CropCard({ crop }) {
  // const theme = useTheme();
  // const match = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={crop.img}
        alt={crop.label}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {crop.label}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {crop.label} is a suitable crop for your location. Places with altitude ranging from {crop.minaltitude} to {crop.maxaltitude} are ideal for {crop.label}. {crop.Label} requires soil ph of {crop.soilphmin}-{crop.soilphmax}.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

