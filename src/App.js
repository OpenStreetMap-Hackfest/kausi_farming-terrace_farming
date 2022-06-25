import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import React, { useState } from 'react';
import { About, Credits, Main, Navbar, SignIn, SignUp, Profile, WasteManagement,RequestCrops } from './components';
import { SnackBarComponent } from './components/common/snackbar';


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [msg, setMsg] = useState('');
  const [sever, setSever] = useState('');
  const [open, setOpen] = React.useState(false);
  // const [user, setUser] = React.useState(null);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes style={{ marginTop: "30px" }}>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/waste-management" element={<WasteManagement />} />
        <Route path="/request-crops" element={<RequestCrops />} />
      </Routes>
      <SnackBarComponent
        open={open}
        handleClose={handleClose}
        msg={msg}
        sever={sever}
      />
    </Router>
  );
}
