import { api } from "../../../utils/api";
import { useState, useEffect } from "react";
import PARMI from "../../../../../public/parmi.png";
import { ProgressBar } from "react-loader-spinner";
import DealPopup from "../Deals/DealPopup";

// TODO this is just temp stuff on the specials page, will need to figure out how to classify a deal as special (preferably paid by the business)

const Specials = () => {
    const [specialItems, setSpecialItems] = useState();
    const [isDealOpen, setIsDealOpen] = useState(false);
    const [selectedSpecial, setSelectedSpecial] = useState();

    const getSpecialItems = async () => {
        try {
            const response = await api.get("/api/deals/specials");

            if (response.status === 200) {
                const { data } = response;

                let testData = data.concat(data);
                testData = testData.concat(testData);
                setSpecialItems(testData);
            } else {
                alert(
                    `Error retrieving data: ${response.status}. Error: ${response.statusText}`
                );
            }
        } catch (err) {
            alert("Network error, refresh the page and try again.");
        }
    };

    const manageSpecialSelection = (special) => {
        setSelectedSpecial(special);
        setIsDealOpen(true);
    };

    useEffect(() => {
        getSpecialItems();
    }, []);

    return (
        <div className="h-full w-full flex flex-col gap-2 p-2">
            {selectedSpecial && (
                <DealPopup
                    isOpen={isDealOpen}
                    closeModal={() => setIsDealOpen(!isDealOpen)}
                    data={selectedSpecial}
                />
            )}
            <p className="text-white">Specials</p>
            <ul className="flex flex-col gap-2 w-full h-[260px] overflow-y-auto">
                {specialItems ? (
                    specialItems.map((special, idx) => (
                        <li
                            onClick={() => manageSpecialSelection(special)}
                            key={special.title + idx}
                            className="flex justify-between w-full h-[80px] p-1 pr-3 items-center"
                        >
                            <div className="flex gap-2 ">
                                <img
                                    src={PARMI}
                                    className="w-[60px] rounded-lg"
                                />
                                <div className="flex flex-col">
                                    <p className="text-white text-xs  max-w-[180px] truncate">
                                        {special.title}
                                    </p>
                                    <div className="flex flex-col">
                                        <p className="text-slate-300 text-xs max-w-[180px] truncate">
                                            {special.business.name}
                                        </p>
                                        <p className="text-slate-300 text-xs max-w-[180px] truncate">
                                            {special.business.suburb}
                                        </p>
                                    </div>
                                    <p className="text-slate-300 text-xs">
                                        {special.date}
                                    </p>
                                </div>
                            </div>
                            <p className="text-md text-red-500">
                                {special.price === 0
                                    ? "FREE"
                                    : `$${special.price}`}
                            </p>
                        </li>
                    ))
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
            </ul>
        </div>
    );
};

export default Specials;
