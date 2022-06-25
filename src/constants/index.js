import { Grass, Home, Info, Person, Settings } from "@mui/icons-material";

export const navItems = [
    {
        id: 'jdhfjsdfj',
        label: 'Home',
        path: '/',
        icon: <Home />,
    },
    {
        id: 'mdsjhkjd655d',
        label: 'About',
        path: '/about',
        icon: <Info />,
    },
    {
        id: 'kjskjsd5sdfsdf',
        label: 'Credits and Liscense',
        path: '/credits',
        icon: <Person />,
    },
    {
        id: 'kjddskjsd5sdfsdf',
        label: 'Household Waste into Crop',
        path: '/waste-management',
        icon: <Settings />,
    }, {
        id: 'kjddskjcxsd5sdfsdf',
        label: 'Request Crops',
        path: '/request-crops',
        icon: <Grass />,
    }
]
