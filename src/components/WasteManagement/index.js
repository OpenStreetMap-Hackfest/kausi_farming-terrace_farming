import {
    Container,
    Typography,
    Box,

} from '@mui/material';

export function WasteManagement() {
    return (
        <Container maxWidth="md" style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '50px'
        }}>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    How To Turn Household Waste Into Compost
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Did you know by segregating, recycling and composting, a family of 4 can reduce their waste from 1000 Kg to less than 100 kg every year. Composting is an easy way of recycling that involves decomposing everyday kitchen waste into a rich soil known as compost. Here are five simple steps to begin turning your garbage into a garden.
                </Typography>
                <Typography variant="h4" component="h1" gutterBottom>
                    Step 1- Identify Your Composting Spot:
                </Typography>
                <Typography variant="body1" color="textSecondary">Composting can be done at various places ranging from your kitchen, balcony, terrace or roof, tabletop or sink. While the best place to start composting is outdoors, you can even start the process of composting inside your home.
                </Typography>
                <Typography variant="h4" component="h1" gutterBottom>
                    Step 2- Segregate your Waste:
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Start separating your edible kitchen waste like vegetable peels, fruit peels, small amounts of wasted cooked food, etc. in one container. Fill another container with dry waste like dried leaves, sawdust, newspaper chunks, packaging material etc. Close both containers to avoid infiltration of bugs, flies, and worms.
                </Typography>
                <Typography variant="h4" component="h1" gutterBottom>
                    Step 3- Construct Your Composting Bin:
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Select a container - it can be anything, from a bucket to a normal dustbin or a garden pot. Drill around 4-5 holes around the container at different levels so as to let some air in easily. To avoid any spills place a newspaper or tray underneath your container. Layer the bottom of the container with soil.
                </Typography>
                <Typography variant="h4" component="h1" gutterBottom>
                    Step 4- Initiate the Composting Process:
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    To maintain the dry waste and wet waste balance, add food waste and wet waste at alternate levels in the bin. For example if you add one cup of food wastes like vegetables or fruits, add one cup of dry wastes like dry leaves, sawdust, newspaper scrap too. Do not forget to add soil once every week. To fasten the process, you can add semi composted soil to your compost.
                </Typography>
                <Typography variant="h4" component="h1" gutterBottom>
                    Step 5- Dos and Don'ts:
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Increase the components of newspapers or add extra holes when your compost smells due to imbalance of waste in the bin. Sprinkle some water if the compost turns too dry. After every few days, use a rake to give the pile of waste a quick turn. This will provide enough aeration for the waste to decompose successfully. Start using your compost once it gets ready within a period of 2-3 months in rooftop farming once the dry, dark brown waste-turned-compost is ready.
                </Typography>
            </Box>
        </Container>
    );
}
