import LocationVenuesPopup from "../components/features/Venues/LocationVenuesPopup";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { ProgressBar } from "react-loader-spinner";
import { useLocationCTX } from "../contexts/LocationContext";
import VenuesList from "../components/features/Venues/VenuesList";

const Venues = () => {
    const [filterLocation, setFilterLocation] = useState("None");
    const [locationOpen, setLocationOpen] = useState(false);

    const [venues, setVenues] = useState();
    const { coordinates } = useLocationCTX();

    const getVenues = async () => {
        try {
            if (coordinates.city !== "") {
                const response = await api.get("/api/businesses", {
                    params: { cityName: coordinates.city },
                });

                if (response.status === 200) {
                    const { data } = response;
                    setVenues(data);
                } else {
                    alert(
                        `Error: ${response.status} Text: ${response.statusText}`
                    );
                }
            }
        } catch (err) {
            console.log(err);
            alert("Network Error");
        }
    };

    // TODO database is being called thrice, not good
    useEffect(() => {
        if (coordinates && coordinates.city !== "") {
            getVenues();
        }
    }, [coordinates]);

    return (
        <div className="h-[520px] w-full flex flex-col px-1">
            {filterLocation && venues && coordinates && (
                <LocationVenuesPopup
                    setFilterLocation={setFilterLocation}
                    selectedLocation={filterLocation}
                    isOpen={locationOpen}
                    closeModal={() => setLocationOpen(false)}
                    venues={venues}
                    coordinates={coordinates}
                />
            )}

            <div className="flex flex-col gap-2 w-full h-full">
                <div className="flex gap-2 w-full  h-[40px]">
                    <button
                        onClick={() => setLocationOpen(true)}
                        className="h-[30px] w-full rounded-2xl border-red-500 bg-red-500"
                    >
                        <p className="font-bold">Location</p>
                    </button>
                </div>
                {venues && filterLocation ? (
                    <VenuesList
                        venues={venues}
                        locationFilter={filterLocation}
                    />
                ) : (
                    <div className="h-full w-full flex justify-center items-center">
                        <ProgressBar
                            visible={true}
                            height="80"
                            width="80"
                            color="#a12020"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Venues;
