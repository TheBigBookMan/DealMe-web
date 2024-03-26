import Categories from "../components/features/Home/Categories";
import Specials from "./../components/features/Home/Specials";

// TODO top part will be the horizontol scroll of categories
// TODO underneath is the specials scroll section
// TODO underneath is small map that can be clicked to taken to mapview
// TODO the map view could be a small kind of display that shows icon for the user location and then some pins for ones close by, and there can be two buttons on it, one to take to the map and the other to go to deals page and auto set the location filter to their location

const Home = () => {
    return (
        <div className="h-full w-full">
            <Categories />
            <Specials />
        </div>
    );
};

export default Home;
