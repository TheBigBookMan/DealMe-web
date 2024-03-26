import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TypePopup from "../components/features/Deals/TypePopup";
import LocationDealsPopup from "../components/features/Deals/LocationDealsPopup";
import { api } from "../utils/api";
import { ProgressBar } from "react-loader-spinner";
import { useLocationCTX } from "../contexts/LocationContext";

import DealsList from "../components/features/Deals/DealsList";

const Deals = () => {
    const [filterType, setFilterType] = useState();
    const [typeOpen, setTypeOpen] = useState(false);
    const [filterLocation, setFilterLocation] = useState();
    const [locationOpen, setLocationOpen] = useState(false);

    const { dealFilter } = useParams();
    const [deals, setDeals] = useState();

    const { coordinates } = useLocationCTX();

    const sortFilter = () => {
        const splitFilter = dealFilter.split("-");

        if (splitFilter[0] === "type") {
            setFilterType(splitFilter[1]);
            setFilterLocation("None");
        } else if (splitFilter[0] === "location") {
            setFilterLocation(splitFilter[1]);
            setFilterType("None");
        }
    };

    const getDeals = async () => {
        try {
            const response = await api.get("/api/deals", {
                params: { cityName: coordinates.city },
            });

            if (response.status === 200) {
                const { data } = response;
                setDeals(data);
            } else {
                alert(
                    `Error retrieving data: ${response.status}. Error: ${response.statusText}`
                );
            }
        } catch (err) {
            console.log(err);
            alert("Trouble connecting to Network");
        }
    };

    useEffect(() => {
        if (dealFilter) {
            sortFilter();
        } else {
            setFilterLocation("None");
            setFilterType("None");
        }
    }, [dealFilter]);

    // TODO database is being called thrice, not good
    useEffect(() => {
        if (coordinates && coordinates.city !== "") {
            getDeals();
        }
    }, [coordinates]);

    return (
        <div className="h-[520px] w-full flex flex-col px-1">
            {filterType && (
                <TypePopup
                    setFilterType={setFilterType}
                    isOpen={typeOpen}
                    closeModal={() => setTypeOpen(false)}
                    selectedType={filterType}
                />
            )}
            {filterLocation && deals && coordinates && (
                <LocationDealsPopup
                    setFilterLocation={setFilterLocation}
                    selectedLocation={filterLocation}
                    isOpen={locationOpen}
                    closeModal={() => setLocationOpen(false)}
                    deals={deals}
                    coordinates={coordinates}
                />
            )}

            <div className="flex flex-col gap-2 w-full h-full">
                <div className="flex gap-2 w-full  h-[40px]">
                    <button
                        onClick={() => setTypeOpen(true)}
                        className="h-[30px] w-3/6 rounded-2xl border-red-500 bg-red-500"
                    >
                        <p className="font-bold">Type</p>
                    </button>
                    <button
                        onClick={() => setLocationOpen(true)}
                        className="h-[30px] w-3/6 rounded-2xl border-red-500 bg-red-500"
                    >
                        <p className="font-bold">Location</p>
                    </button>
                </div>
                {deals && filterType && filterLocation ? (
                    <DealsList
                        deals={deals}
                        typeFilter={filterType}
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

export default Deals;
