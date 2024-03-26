import DealPopup from "./DealPopup";
import Deal from "./Deal";
import { useState, useEffect } from "react";

const DealsList = ({ typeFilter, locationFilter, deals }) => {
    const [selectedSpecial, setSelectedSpecial] = useState();
    const [isDealOpen, setIsDealOpen] = useState(false);
    const [filteredDeals, setFilteredDeals] = useState();

    const manageSpecialSelection = (special) => {
        setSelectedSpecial(special);
        setIsDealOpen(true);
    };

    const checkFilters = async () => {
        if (typeFilter === "None" && locationFilter === "None") {
            setFilteredDeals(deals);
            return;
        } else {
            if (typeFilter !== "None" && locationFilter === "None") {
                const filteredByType = deals.filter((deal) => {
                    if (deal.dealType === typeFilter) {
                        return deal;
                    }
                });
                setFilteredDeals(filteredByType);
            } else if (typeFilter === "None" && locationFilter !== "None") {
                // TODO maybe have the locationpopup set "City- cityname" for any that are specific general cities, rather than a specific suburb

                const filteredByLocation = deals.filter((deal) => {
                    if (deal.business.suburb === locationFilter) {
                        return deal;
                    }
                });
                setFilteredDeals(filteredByLocation);
            } else if (typeFilter !== "None" && locationFilter !== "None") {
                const filteredByLocationAndType = deals.filter((deal) => {
                    if (
                        deal.business.suburb === locationFilter &&
                        deal.dealType === typeFilter
                    ) {
                        return deal;
                    }
                });

                setFilteredDeals(filteredByLocationAndType);
            }
        }
    };

    useEffect(() => {
        if (deals) {
            checkFilters();
        }
    }, [typeFilter, locationFilter, deals]);

    return (
        <ul className="h-full w-full overflow-y-auto">
            {selectedSpecial && (
                <DealPopup
                    isOpen={isDealOpen}
                    closeModal={() => setIsDealOpen(!isDealOpen)}
                    data={selectedSpecial}
                />
            )}

            {filteredDeals &&
                (filteredDeals.length === 0 ? (
                    <p className="text-red-500 text-lg font-bold">
                        No Deals in this category
                    </p>
                ) : (
                    filteredDeals.map((deal) => (
                        <Deal
                            key={deal.id}
                            data={deal}
                            onClick={manageSpecialSelection}
                        />
                    ))
                ))}
        </ul>
    );
};

export default DealsList;
