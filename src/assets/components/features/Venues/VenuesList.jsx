import { useState, useEffect } from "react";
import Venue from "./Venue";

// TODO this will be different to dealslist as this will take you to individual business page and on tere could get info from google API about the place? things like reviews and menu link and other stuff?

const VenuesList = ({ venues, locationFilter }) => {
    const [filteredVenues, setFilteredVenues] = useState();

    const checkFilter = () => {
        let sortVenuesByDeal = venues;

        if (locationFilter === "None") {
            sortVenuesByDeal.sort((a, b) => b.deals.length - a.deals.length);
            setFilteredVenues(sortVenuesByDeal);
        } else {
            const filteredByLocation = venues.filter((venue) => {
                if (venue.suburb === locationFilter) {
                    return venue;
                }
            });
            filteredByLocation.sort((a, b) => b.deals.length - a.deals.length);
            setFilteredVenues(filteredByLocation);
        }
    };

    useEffect(() => {
        if (locationFilter) {
            checkFilter();
        }
    }, [locationFilter]);

    return (
        <ul className="h-full w-full overflow-y-auto flex flex-col gap-1">
            {filteredVenues &&
                (filteredVenues.length === 0 ? (
                    <p className="text-red-500 text-lg font-bold">
                        No venues in this location
                    </p>
                ) : (
                    filteredVenues.map((venue) => (
                        <Venue key={venue.id} data={venue} />
                    ))
                ))}
        </ul>
    );
};

export default VenuesList;
