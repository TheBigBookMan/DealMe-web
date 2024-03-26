import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utils/api";
import { ProgressBar } from "react-loader-spinner";
import { IoLocation } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import PARMI from "../../../public/parmi.png";

const VenueBio = () => {
    const [venueInfo, setVenueInfo] = useState();
    const { pathname } = useLocation();

    const getVenueInfo = async () => {
        try {
            const venueId = pathname.split("/")[2];

            if (venueId) {
                const response = await api.get(`/api/businesses/${venueId}`);

                if (response.status === 200) {
                    const { data } = response;

                    // setVenueInfo(data);
                    await getGooglePlaceInfo(
                        data,
                        data.name,
                        data.latitude,
                        data.longitude
                    );
                } else {
                    alert(
                        `Error: ${response.status} Text: ${response.statusText}`
                    );
                }
            }
        } catch (err) {
            console.log(err);
            alert("Network error");
        }
    };

    const getGooglePlaceInfo = async (venueData, inputText, lat, lng) => {
        try {
            const response = await api.get(
                `/api/apis/findPlace?query=${inputText}&lat=${lat}&lng=${lng}`
            );

            if (response.status === 200) {
                const { data } = response;
                setVenueInfo({
                    ...venueData,
                    address: data.formatted_address,
                    phone: data.formatted_phone_number,
                    rating: data.rating,
                    website: data.website,
                    overview: data.editorial_summary.overview,
                    reviews: data.reviews,
                    openingHours: data.opening_hours.weekday_text,
                    placeId: data.place_id,
                });
            } else {
                alert(`Error: ${response.status} Text: ${response.statusText}`);
            }
        } catch (err) {
            alert("Network Error");
            console.log(err);
        }
    };

    useEffect(() => {
        if (pathname) {
            getVenueInfo();
        }
    }, [pathname]);
    console.log(venueInfo);

    return (
        <div className="flex flex-col h-[520px] overflow-y-auto w-full">
            {venueInfo ? (
                <div className="flex flex-col h-full w-full p-1 gap-1">
                    <Link
                        to={`/map/${venueInfo.id}`}
                        className="flex justify-between items-center px-2 border rounded-xl border-red-500"
                    >
                        <div className="flex flex-col">
                            <p className="text-red-500 truncate text-xl w-full pr-4 font-bold">
                                {venueInfo.name}
                            </p>
                            <p className="text-red-500 text-sm">
                                View on Google Maps
                            </p>
                        </div>
                        <IoLocation className="w-[40px] h-[40px] text-4xl text-red-500 border border-white p-1 rounded-xl bg-white" />
                    </Link>
                    <div className="flex flex-col gap-2">
                        <p className="text-white">{venueInfo.address}</p>
                        <p className="text-white">{venueInfo.phone}</p>
                        <div className="flex items-center justify-between">
                            <a
                                className="text-blue-500"
                                href={venueInfo.website}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Website
                            </a>
                            <div className="flex items-center gap-2">
                                <FaStar className="text-yellow-500 text-2xl" />
                                <p className="text-red-500 text-xl">
                                    {venueInfo.rating}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-red-500 text-sm">Current Deals</p>
                        <ul className="flex gap-1 overflow-x-auto h-[180px]">
                            {venueInfo.deals.map((deal) => (
                                <li key={deal.id} className="flex flex-col">
                                    <img src={PARMI} className="w-20" />
                                    <p className="text-red-500 text-sm">
                                        ${deal.price}
                                    </p>
                                    <p className="text-red-500 text-sm">
                                        {deal.title}
                                    </p>
                                    <p className="text-red-500 text-sm">
                                        {deal.date}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-red-500">Opening Hours:</p>
                        <ul className="flex flex-col">
                            {venueInfo.openingHours.map((time) => (
                                <li key={time}>
                                    <p className="text-white text-sm">{time}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-red-500 text-sm">Reviews</p>
                        <ul className="flex flex-col gap-1">
                            {venueInfo.reviews.map((review) => (
                                <a
                                    href={review.author_url}
                                    className="flex justify-between"
                                    key={review.time}
                                >
                                    <div className="flex flex-col">
                                        <p>{review.author_name}</p>
                                        <p>{review.text}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaStar className="text-yellow-500 text-2xl" />
                                        <p>{review.rating}</p>
                                    </div>
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>
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
    );
};

export default VenueBio;
