import Popup from "../../common/Elements/Popup";
import Scale from "../../common/Elements/Scale";
import { useState } from "react";

const LocationPopup = ({ isOpen, closeModal }) => {
    const [distance, setDistance] = useState(0);

    return (
        <Popup isOpen={isOpen} closeModal={closeModal}>
            <p className="text-white">Adjust Location Distance</p>
            <div className="flex flex-col items-center  h-full gap-4 p-2">
                <p className="text-slate-300">
                    Adjust the scale to increase the distance for the map to
                    automatically find deals for you.
                </p>
                <Scale
                    value={distance}
                    handleChange={(e) => setDistance(e.target.value)}
                    scale={"km"}
                    min={0}
                    max={200}
                />
            </div>
        </Popup>
    );
};

export default LocationPopup;
