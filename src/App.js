import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import React from 'react';
import { About, Credits, Main, Navbar, SignIn, SignUp,Profile } from './components';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [user, setUser] = React.useState(null);
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
      </Routes>
    </Router>
  );
}
