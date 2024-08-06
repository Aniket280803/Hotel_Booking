import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import HomeScreen from './screen/HomeScreen';
import BookingScreen from'./screen/BookingScreen';
import RegisterScreen from './screen/RegisterScreen';
import LoginScreen from './screen/LoginScreen';
import ProfileScreen from './screen/ProfileScreen';
import AdminScreen from './screen/AdminScreen';
import LandingScreen from './screen/LandingScreen';
import Footer from './component/Footer'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/pay/:roomid/:fromDate/:toDate" element={<BookingScreen/>}/>
        <Route path="/register" element={<RegisterScreen/>}/>
       <Route path="/Login" element={<LoginScreen/>}/>
       <Route path="/Profile" element={<ProfileScreen/>}/>
       <Route path="/Admin" element={<AdminScreen/>}/>
       <Route path="/" element={<LandingScreen/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
