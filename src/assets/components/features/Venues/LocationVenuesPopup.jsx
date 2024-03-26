import Popup from "../../common/Elements/Popup";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa6";

// TODO this will get location from the database where location matches where they are and around-- need gogle most likely

const LocationVenuesPopup = ({
    isOpen,
    closeModal,
    selectedLocation,
    setFilterLocation,
    venues,
    coordinates,
}) => {
    const [searchInput, setSearchInput] = useState("");
    const [locationSelection, setLocationSelection] = useState();

    const getLocationOptions = (search) => {
        const venueLocations = [];

        venues.forEach((venue) => {
            if (search === "init") {
                if (venueLocations.includes(venue.suburb.toLowerCase())) {
                    return;
                } else {
                    venueLocations.push(venue.suburb.toLowerCase());
                }
            } else {
                if (venueLocations.includes(venue.suburb.toLowerCase())) {
                    return;
                } else if (
                    venue.suburb.toLowerCase().includes(search.toLowerCase())
                ) {
                    venueLocations.push(venue.suburb.toLowerCase());
                }
            }
        });

        setLocationSelection(venueLocations);
    };

    useEffect(() => {
        if (venues) {
            getLocationOptions("init");
        }
    }, []);

    const searchUserInput = (value) => {
        setSearchInput(value);
        getLocationOptions(value);
    };

    // TODO this should just be getting the suburbs that are close to location of the user with useEffect, not the searchPlaces
    // useEffect(() => {
    //     getLocationAPI();
    // }, [selectedLocation]);

    return (
        <Popup isOpen={isOpen} closeModal={closeModal}>
            <p className="text-white">Filter by Location Near You</p>
            <div className="flex flex-col mt-1 h-full">
                <input
                    className="w-full p-1 pl-2 h-[30px] outline-none bg-white rounded-xl"
                    value={searchInput}
                    placeholder={"Search location..."}
                    onChange={(e) => searchUserInput(e.target.value)}
                />
                <ul className="flex flex-col gap-1 overflow-y-auto h-full my-2 py-2">
                    <li
                        onClick={() => setFilterLocation("None")}
                        key={"None"}
                        className={`flex justify-between items-center border rounded-xl p-4 py-2 transition ${
                            selectedLocation === "None"
                                ? "border-red-500 bg-red-500"
                                : "border-red-300"
                        } `}
                    >
                        <div
                            className={`flex flex-col  ${
                                selectedLocation === "None"
                                    ? "text-black font-bold"
                                    : "text-white"
                            }`}
                        >
                            <p className={``}>{`All ${coordinates.city}`}</p>
                        </div>
                        {selectedLocation === "None" && (
                            <FaThumbsUp className="text-black text-2xl" />
                        )}
                    </li>
                    {locationSelection &&
                        locationSelection.map((lo) => {
                            const capitalise = lo
                                .toLowerCase()
                                .split(" ")
                                .map(function (word) {
                                    return (
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    );
                                })
                                .join(" ");

                            return (
                                <li
                                    onClick={() =>
                                        setFilterLocation(capitalise)
                                    }
                                    key={lo}
                                    className={`flex justify-between items-center border rounded-xl p-4 py-2 transition ${
                                        selectedLocation === capitalise
                                            ? "border-red-500 bg-red-500"
                                            : "border-red-300"
                                    } `}
                                >
                                    <div
                                        className={`flex flex-col  ${
                                            selectedLocation === capitalise
                                                ? "text-black font-bold"
                                                : "text-white"
                                        }`}
                                    >
                                        <p className={``}>{capitalise}</p>
                                    </div>
                                    {selectedLocation === capitalise && (
                                        <FaThumbsUp className="text-black text-2xl" />
                                    )}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </Popup>
    );
};

export default LocationVenuesPopup;
