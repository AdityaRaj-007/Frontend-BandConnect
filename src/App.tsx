import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/landingPage/home";
import RegistrationPage from "./pages/registrationPage/registration";
import MusicianRegistration from "./pages/musicianRegistrationForm/MusicianRegistration";
import BandRegistration from "./pages/bandRegisterationForm/BandRegistration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/musician-register" element={<MusicianRegistration />} />
        <Route path="/band-register" element={<BandRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
