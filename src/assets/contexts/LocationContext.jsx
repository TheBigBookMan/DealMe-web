import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [coordinates, setCoordinates] = useState();
    const apiKey = "AIzaSyBwgMZNCPmyUW7uP0FjkHTw2f-0SyvHoO8";

    const getGeolocationOfUser = async () => {
        try {
            const response = await axios.post(
                `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`
            );

            if (response.status === 200) {
                const { data } = response;
                const { lng, lat } = data.location;

                await getGeocodingForUserLocation(lng, lat);
            } else {
                alert(
                    `Error Message: ${response.statusText}  Error: ${response.status}`
                );
            }
        } catch (err) {
            alert("Error with network.");
            console.log(err);
        }
    };

    const getGeocodingForUserLocation = async (lng, lat) => {
        try {
            const response = await axios.post(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
            );

            // console.log(response);
            if (response.status === 200) {
                const { data } = response;

                if (data.results.length > 0) {
                    let country;
                    let state;
                    let suburb;
                    let city;

                    data.results[0].address_components.forEach((row) => {
                        if (row.types.includes("country")) {
                            country = row.long_name;
                        } else if (
                            row.types.includes("administrative_area_level_1")
                        ) {
                            state = row.long_name;
                        } else if (
                            row.types.includes("administrative_area_level_2")
                        ) {
                            suburb = row.short_name;
                        }
                    });

                    data.results.forEach((result) => {
                        if (result.types.includes("colloquial_area")) {
                            result.address_components.forEach((add) => {
                                if (add.types.includes("colloquial_area")) {
                                    city = add.long_name;
                                }
                            });
                        }
                    });

                    setCoordinates({
                        country,
                        state,
                        suburb,
                        city,
                    });
                } else {
                    alert("Could not find geolocation.");
                }
            } else {
                alert(
                    `Error Message: ${response.statusText} Error: ${response.status}`
                );
            }
        } catch (err) {
            alert("Error with network.");
            console.log(err);
        }
    };

    useEffect(() => {
        getGeolocationOfUser();
    }, []);

    return (
        <LocationContext.Provider value={{ coordinates }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationCTX = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error(
            "useLocationCTX must be used within a LocationProvider"
        );
    }
    return context;
};
