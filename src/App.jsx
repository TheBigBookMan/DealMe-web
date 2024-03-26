import Navigation from "./assets/components/common/Navigation/Navigation";
import Home from "./assets/pages/Home";
import Map from "./assets/pages/Map";
import Deals from "./assets/pages/Deals";
import Venues from "./assets/pages/Venues";
import VenueBio from "./assets/pages/VenueBio";
import Settings from "./assets/pages/Settings";
import Favourites from "./assets/pages/Favourites";
import History from "./assets/pages/History";
import Header from "./assets/components/common/Header/Header";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="w-screen h-screen bg-gray-900 font-sans flex flex-col gap-2 justify-between">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/map/:venueId" element={<Map />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/deals/:dealFilter" element={<Deals />} />
                <Route path="/venues" element={<Venues />} />
                <Route path="/venue/:venueId" element={<VenueBio />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/history" element={<History />} />
            </Routes>
            <Navigation />
        </div>
    );
}

export default App;
